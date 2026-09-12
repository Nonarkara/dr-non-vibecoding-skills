# Public Datasets Reference

A curated catalog of verified, high-value open public datasets for vibecoding dashboards, civic analytics, machine learning prototypes, and intelligence systems. Sourced and vetted from [`awesome-public-datasets`](https://github.com/awesomedata/awesome-public-datasets) and global open-data repositories.

Every dataset listed here is evaluated for **zero-cost accessibility**, **operational reliability**, and **machine-readable formats** (GeoJSON, Parquet, CSV, REST JSON).

---

## At a Glance: Dataset Selection Matrix

| Domain | Primary Sources | Formats | Auth? | Query Latency |
|---|---|---|---|---|
| **Earth & Climate** | USGS, Open-Meteo, NOAA, Copernicus | GeoJSON, NetCDF, CSV, REST | None / Free Key | Sub-second to batch |
| **Economics & Trade** | World Bank, IMF, FRED, UN Comtrade | JSON, CSV, REST | None / Free Key | < 500ms |
| **Demographics & Health** | UN DESA, WHO GHO, HDX, OpenSanctions | JSON, CSV, Parquet | None / Free Key | < 800ms |
| **Urban & Transport** | OpenStreetMap, OpenDataSoft, OpenSky | GeoJSON, REST, PBF | None / Free Reg | Real-time to static |
| **Science & Research** | arXiv, OpenAlex, PubMed Central | JSON, XML, Parquet | None | < 400ms |
| **ML & Web Commons** | Hugging Face Datasets, Common Crawl | Parquet, Arrow, WARC | None | Batch / S3 open |

---

## 1. Climate, Earth Observation & Geospatial

### USGS Earthquake Hazards Program
- **What it provides**: Real-time and historical global seismic data updated every minute.
- **Format**: GeoJSON, CSV, Quakeml.
- **Auth**: None (completely open public domain).
- **Endpoint**: `https://earthquake.usgs.gov/fdsnws/event/1/`
- **Probe**:
  ```bash
  # All M4.5+ earthquakes in the last 24 hours
  curl -s "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=4.5" | jq '.features[0].properties'
  ```

### Copernicus Climate Change Service (ERA5) & Open-Meteo Historical
- **What it provides**: ECMWF ERA5 global atmospheric reanalysis (1940 to present), surface temperature, precipitation, solar radiation.
- **Format**: REST JSON (via Open-Meteo archive proxy) or GRIB/NetCDF (via Copernicus CDS).
- **Auth**: None via Open-Meteo; free account via Copernicus CDS API.
- **Probe**:
  ```bash
  # Daily max temperature for Bangkok across January 2024
  curl -s "https://archive-api.open-meteo.com/v1/archive?latitude=13.75&longitude=100.51&start_date=2024-01-01&end_date=2024-01-31&daily=temperature_2m_max&timezone=Asia%2FBangkok"
  ```

### OpenStreetMap (Overpass API & Planet Dumps)
- **What it provides**: Complete global crowdsourced geospatial database: roads, buildings, transit, healthcare, amenities.
- **Format**: GeoJSON, OSM XML, Protocol Buffers (`.osm.pbf`).
- **Auth**: None (rate-limited fair use).
- **Probe**:
  ```bash
  # Query hospitals within bounding box (Phuket: 7.8,98.2 to 8.0,98.5)
  curl -s "https://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%3Bnode%5B%22amenity%22%3D%22hospital%22%5D(7.8%2C98.2%2C8.0%2C98.5)%3Bout%3B" | jq '.elements | length'
  ```

### NOAA Global Historical Climatology Network (GHCN)
- **What it provides**: Land surface observations from over 100,000 stations in 180 countries and territories.
- **Format**: CSV, REST API.
- **Auth**: Free API token required for CDO Web Services; raw CSVs hosted freely on AWS Open Data / NOAA S3.
- **URL**: `https://www.ncei.noaa.gov/products/land-based-station/global-historical-climatology-network-daily`

---

## 2. Economics, Trade & Financial Indicators

### World Bank Open Data Indicators
- **What it provides**: 16,000+ time-series development indicators for 217 economies over 60 years (GDP, poverty, inflation, literacy, CO2).
- **Format**: REST JSON, XML, CSV.
- **Auth**: None (CC-BY 4.0).
- **Endpoint**: `https://api.worldbank.org/v2/`
- **Probe**:
  ```bash
  # Last 5 years of GDP (current USD) for Thailand (THA)
  curl -s "https://api.worldbank.org/v2/country/THA/indicator/NY.GDP.MKTP.CD?format=json&mrv=5" | jq '.[1][0]'
  ```

### IMF (International Monetary Fund) Data
- **What it provides**: Balance of payments, International Financial Statistics (IFS), World Economic Outlook (WEO), directional trade.
- **Format**: REST JSON, SDMX.
- **Auth**: None.
- **Endpoint**: `https://www.imf.org/external/datamapper/api/v1/`
- **Probe**:
  ```bash
  # Real GDP growth projections
  curl -s "https://www.imf.org/external/datamapper/api/v1/NGDP_RPCH" | jq '.values.NGDP_RPCH.THA'
  ```

### European Central Bank FX via Frankfurter
- **What it provides**: Daily reference currency rates published by the European Central Bank, historical tracking back to 1999.
- **Format**: REST JSON.
- **Auth**: None (CORS open).
- **Endpoint**: `https://api.frankfurter.app/`
- **Probe**:
  ```bash
  # Current rates from USD to THB, EUR, JPY, GBP
  curl -s "https://api.frankfurter.app/latest?from=USD&to=THB,EUR,JPY,GBP" | jq '.rates'
  ```

---

## 3. Demographics, Civic Analytics & Global Health

### UN DESA Population Division
- **What it provides**: Official United Nations global demographic estimates and probabilistic projections (1950–2100).
- **Format**: REST JSON, CSV.
- **Auth**: None.
- **Endpoint**: `https://population.un.org/dataportalapi/api/v1/`
- **Probe**:
  ```bash
  # List demographic indicator series
  curl -s "https://population.un.org/dataportalapi/api/v1/indicators/?format=json" | jq '.data[:3]'
  ```

### Humanitarian Data Exchange (HDX / OCHA)
- **What it provides**: 19,000+ crisis and humanitarian datasets covering conflict displacement, food security, flood risk, and border points.
- **Format**: CKAN REST API, CSV, GeoJSON, Excel.
- **Auth**: None for read access.
- **Endpoint**: `https://data.humdata.org/api/3/action/package_search`
- **Probe**:
  ```bash
  # Search humanitarian datasets for Thailand
  curl -s "https://data.humdata.org/api/3/action/package_search?q=thailand&rows=3" | jq '.result.results[].title'
  ```

### OpenSanctions
- **What it provides**: Consolidated open database of international sanctions, politically exposed persons (PEPs), and denied entities (OFAC, EU, UN).
- **Format**: JSON, CSV, Line-delimited JSON (FollowTheMoney format).
- **Auth**: Free for non-commercial / open-source; API token for bulk queries.
- **URL**: `https://www.opensanctions.org/`

---

## 4. Urban Mobility, Infrastructure & Open Data Portals

### OpenDataSoft Data Network
- **What it provides**: Unified directory of over 100,000 open datasets from cities, governments, and utility providers worldwide.
- **Format**: REST JSON, GeoJSON, CSV.
- **Auth**: None.
- **Endpoint**: `https://data.opendatasoft.com/api/v2/`
- **Probe**:
  ```bash
  # Query datasets in OpenDataSoft network
  curl -s "https://data.opendatasoft.com/api/v2/catalog/datasets?limit=3" | jq '.datasets[].dataset.dataset_id'
  ```

### OpenSky Network Live ADS-B Tracking
- **What it provides**: Crowdsourced aircraft transponder data (position, altitude, callsign, velocity) globally.
- **Format**: REST JSON.
- **Auth**: None for rate-limited public queries; free registered account for higher credits.
- **Endpoint**: `https://opensky-network.org/api/`
- **Probe**:
  ```bash
  # Live flights in Southeast Asia bounding box
  curl -s "https://opensky-network.org/api/states/all?lamin=5.0&lomin=95.0&lamax=21.0&lomax=106.0" | jq '.states[:2]'
  ```

---

## 5. Scholarly Research, Literature & ML Commons

### OpenAlex Scholarly Knowledge Graph
- **What it provides**: 250M+ scientific works, 90M+ authors, 100K+ institutions, citation graph, open-access status.
- **Format**: REST JSON, bulk AWS S3 snapshots.
- **Auth**: None (add `mailto=you@example.com` to query parameter for fast-track polite pool).
- **Endpoint**: `https://api.openalex.org/`
- **Probe**:
  ```bash
  # Search publications on urban heat islands
  curl -s "https://api.openalex.org/works?search=urban+heat+island&per-page=2" | jq '.results[].title'
  ```

### arXiv API
- **What it provides**: 2.4M+ preprints in physics, computer science, mathematics, quantitative biology, and statistics.
- **Format**: Atom XML / OAI-PMH.
- **Auth**: None (max 1 req per 3 sec).
- **Endpoint**: `https://export.arxiv.org/api/query`
- **Probe**:
  ```bash
  # Query recent LLM agent papers
  curl -s "https://export.arxiv.org/api/query?search_query=all:autonomous+agents&max_results=2" | grep -E '<title>|<summary>'
  ```

### Hugging Face Datasets & Common Crawl
- **What it provides**: Curated ML corpora, benchmarks, instruct tuning sets (Hugging Face) and petabyte-scale web crawl archives (Common Crawl).
- **Format**: Parquet, Arrow, WARC.
- **Auth**: Free Hugging Face token for gated models; public HTTPS / S3 bucket for Common Crawl.
- **Endpoints**:
  - `https://huggingface.co/docs/datasets/`
  - `https://commoncrawl.org/the-data/get-started/`

---

## Operational Guidelines for Public Datasets

1. **Prefer Flat Parquet or GeoJSON over Custom Scraping**: When a clean dataset exists, do not write scrapers. Flat files on Cloudflare R2 or S3 are orders of magnitude faster and never fail on DOM changes.
2. **Implement Stale-While-Revalidate (SWR)**: Public data rarely needs second-by-second updates. Cache dataset responses in `localStorage` or memory with a 1-hour to 24-hour TTL.
3. **Respect Fair Use**: Keep request rates <= 1 req/sec for government and research servers. Always specify an honest `User-Agent` header.
4. **Dual-Write / Fallback**: Never let your dashboard break if a single public dataset endpoint experiences downtime. Always vendor a fallback JSON snapshot in `assets/data/` or provide a clear degraded UI notice.
