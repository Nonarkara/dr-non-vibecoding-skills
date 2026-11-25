#!/usr/bin/env python3
"""MIT. Offline point comparisons, not a warning system or a forecast."""
import argparse
from datetime import datetime, timezone
import hashlib
import json
import math
from pathlib import Path
import sys
from urllib.parse import urlsplit

MAX_BYTES = 1_000_000

def timestamp(value):
    if not isinstance(value, str):
        raise ValueError('timestamps must be ISO-8601 strings with timezone')
    try:
        result = datetime.fromisoformat(value.replace('Z', '+00:00'))
    except ValueError:
        raise ValueError('invalid observation timestamp') from None
    if result.tzinfo is None:
        raise ValueError('timestamps need an explicit timezone')
    return result.astimezone(timezone.utc)

def numeric(value):
    return type(value) in (int, float) and math.isfinite(value)

def label(value):
    return isinstance(value, str) and 0 < len(value.strip()) <= 160

def cook(raw, as_of):
    """Validate before deriving. Invalid inputs do not produce partial truth."""
    if not isinstance(raw, dict) or type(raw.get('schema_version')) is not int or raw['schema_version'] != 1:
        raise ValueError('unsupported observation schema')
    as_of = timestamp(as_of)
    fetched = timestamp(raw.get('fetched_at'))
    if fetched > as_of:
        raise ValueError('fetch time is later than comparison time')
    source = raw.get('source')
    if not isinstance(source, dict) or not all(label(source.get(k)) for k in ('name', 'license')):
        raise ValueError('source name and license required')
    if source.get('tier') not in ('synthetic', 'observed', 'cache'):
        raise ValueError('source tier must be synthetic, observed or cache')
    url = urlsplit(source.get('url') or '')
    if source['tier'] != 'synthetic' and (url.scheme != 'https' or not url.hostname or url.username or url.password):
        raise ValueError('non-synthetic data requires a public HTTPS source URL')
    places, rows = raw.get('places'), raw.get('observations')
    if not isinstance(places, list) or not isinstance(rows, list) or len(places)>100 or len(rows)>1000:
        raise ValueError('expected at most 100 places and 1000 observations')
    grouped = {}
    for place in places:
        if not isinstance(place, dict) or not label(place.get('id')) or not label(place.get('name')):
            raise ValueError('place id and name required')
        point = place.get('coordinates')
        if not isinstance(point,list) or len(point)!=2 or not all(numeric(n) for n in point):
            raise ValueError('coordinates must be [longitude, latitude]')
        if not (-180<=point[0]<=180 and -90<=point[1]<=90):
            raise ValueError('coordinates outside WGS84 bounds')
        if place['id'] in grouped:
            raise ValueError('duplicate place id')
        grouped[place['id']] = (place,{})
    for row in rows:
        if not isinstance(row,dict) or not isinstance(row.get('place_id'),str) or row['place_id'] not in grouped:
            raise ValueError('observation has unknown place id')
        when = timestamp(row.get('at'))
        if when>fetched:
            raise ValueError('observation is later than fetch time')
        for key in ('water_level_m','rain_24h_mm'):
            if key not in row or (row[key] is not None and not numeric(row[key])):
                raise ValueError('expected metres and 24h millimetres, or explicit null')
        if row['rain_24h_mm'] is not None and row['rain_24h_mm']<0:
            raise ValueError('rain cannot be negative')
        history = grouped[row['place_id']][1]
        if when in history:
            raise ValueError('duplicate place/time observation')
        history[when] = row
    features = []
    for place,history in grouped.values():
        ordered = sorted(history)
        last = history[ordered[-1]] if ordered else None
        previous = history[ordered[-2]] if len(ordered)>1 else None
        gap = (ordered[-1]-ordered[-2]).total_seconds()/3600 if previous else None
        comparable = (last is not None and previous is not None and gap<=24
                      and last['water_level_m'] is not None and previous['water_level_m'] is not None)
        delta = round(last['water_level_m']-previous['water_level_m'],6) if comparable else None
        age = (as_of-ordered[-1]).total_seconds()/60 if ordered else None
        oldest = (as_of-ordered[-2]).total_seconds()/60 if comparable else age
        features.append({'type':'Feature','id':place['id'],
            'geometry':{'type':'Point','coordinates':place['coordinates']},
            'properties':{'name':place['name'],'source':source,'observedAt':last['at'] if last else None,
                'comparedWith':previous['at'] if comparable else None,'ageMinutes':age,
                'oldestInputAgeMinutes':oldest,'stale':age is None or age>360,
                'waterLevel_m':last['water_level_m'] if last else None,
                'rain24h_mm':last['rain_24h_mm'] if last else None,
                'delta_m':delta,'intervalHours':gap if comparable else None,
                'comparison':'insufficient-data' if delta is None else 'rising' if delta>0 else 'falling' if delta<0 else 'unchanged'}})
    return {'type':'FeatureCollection','features':features,'meta':{
        'source':source,'fetchedAt':raw['fetched_at'],'asOf':as_of.isoformat(),
        'method':'Same-place latest two water levels, at most 24h apart. Rain is context, not a cause.',
        'limitations':'No flood threshold, area estimate, forecast or safety verdict. Coordinates are not independently verified.'}}

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('input',type=Path)
    p.add_argument('--as-of',default=datetime.now(timezone.utc).isoformat())
    a = p.parse_args()
    try:
        with a.input.open('rb') as file:
            content = file.read(MAX_BYTES+1)
        if len(content)>MAX_BYTES:
            raise ValueError('input exceeds 1 MB')
        result = cook(json.loads(content),a.as_of)
        result['meta']['rawSha256'] = hashlib.sha256(content).hexdigest()
        print(json.dumps(result,ensure_ascii=False,indent=2,allow_nan=False))
    except (OSError,ValueError,TypeError,OverflowError):
        print('Invalid input: check schema, units, source, coordinates, times and 1 MB limit. No output produced.',file=sys.stderr)
        return 1
    return 0

if __name__=='__main__': sys.exit(main())
