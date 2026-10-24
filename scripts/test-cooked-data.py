import copy
import json
from pathlib import Path
import runpy
import subprocess
import sys
import unittest
ROOT=Path(__file__).resolve().parent.parent
EXAMPLE=ROOT/'examples/cooked-data'
cook=runpy.run_path(str(EXAMPLE/'cook.py'))['cook']
AS_OF='2026-10-18T13:00:00Z'

class CookedData(unittest.TestCase):
    def setUp(self): self.raw=json.loads((EXAMPLE/'observations.json').read_text())

    def test_comparison_and_missing_are_not_safe_verdicts(self):
        a,b=[f['properties'] for f in cook(self.raw,AS_OF)['features']]
        self.assertEqual((a['delta_m'],a['intervalHours'],a['comparison']),(0.3,6,'rising'))
        self.assertEqual(b['comparison'],'insufficient-data');self.assertIsNone(b['delta_m'])
        self.assertEqual(b['rain24h_mm'],0);self.assertEqual(a['source']['tier'],'synthetic')
        self.assertEqual(a['oldestInputAgeMinutes'],420)

    def test_stale_and_empty(self):
        self.assertTrue(all(f['properties']['stale'] for f in cook(self.raw,'2026-10-24T00:00:00Z')['features']))
        self.raw['observations']=[]
        self.assertTrue(all(f['properties']['delta_m'] is None for f in cook(self.raw,AS_OF)['features']))

    def test_invalid_inputs_fail_closed(self):
        changes=[lambda d:d.update(schema_version=True),
            lambda d:d['places'][0].update(coordinates=[13,100]),lambda d:d['places'].append(d['places'][0]),
            lambda d:d['observations'][0].update(place_id='another-geography'),
            lambda d:d['observations'][0].update(at='2026-10-18T06:00:00'),
            lambda d:d['observations'][0].update(at='2027-01-01T00:00:00Z'),
            lambda d:d['observations'][0].update(water_level_m=float('nan')),
            lambda d:d['observations'][0].update(rain_24h_mm=True),
            lambda d:d['observations'][0].update(rain_24h_mm=-1),
            lambda d:d['observations'][0].pop('water_level_m'),lambda d:d['observations'].append(d['observations'][0]),
            lambda d:d['source'].update(tier='live'),lambda d:d['source'].update(tier='observed',url=None)]
        for change in changes:
            with self.subTest(change=change):
                data=copy.deepcopy(self.raw);change(data)
                with self.assertRaises(ValueError): cook(data,AS_OF)

    def test_long_interval_not_comparable(self):
        self.raw['observations'][0]['at']='2026-10-16T06:00:00Z'
        self.assertEqual(cook(self.raw,AS_OF)['features'][0]['properties']['comparison'],'insufficient-data')

    def test_cli_receipt(self):
        command=[sys.executable,str(EXAMPLE/'cook.py'),str(EXAMPLE/'observations.json'),'--as-of',AS_OF]
        result=json.loads(subprocess.check_output(command,text=True))
        self.assertEqual(len(result['meta']['rawSha256']),64)
        failed=subprocess.run(command[:-1]+['bad'],capture_output=True,text=True)
        self.assertNotEqual(failed.returncode,0);self.assertEqual(failed.stdout,'')

if __name__=='__main__': unittest.main()
