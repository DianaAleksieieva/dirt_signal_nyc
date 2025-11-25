# NYC Complaints Dataset

## File Descriptions

### Raw Complaint Data
- `nyc_complaints_all.7z` - Complete NYC complaints dataset, downloaded from <https://data.cityofnewyork.us/Social-Services/311-trash-reports/h2g7-xbpj/about_data>
- `nyc_complaints_cleaned.7z` - Cleaned Complaints data with `census_tract_id` and `BoroCd`

### Aggregated Data
- `aggregated_records.csv` - Aggregated on `year_month`,`NTA2020`,`Complaint Type`
- `aggregated_complaint_census_tract.csv` - Aggregated on `year_month`,`census_tract_id`,`Complaint Type`

### Geographical Data
- `nta_boundaries.geojson` - Neighborhood Tabulation Areas boundaries
- `nynta2020_25d.zip` - [Neighborhood Tabulation Areas 2020](https://www.nyc.gov/content/planning/pages/resources/datasets/neighborhood-tabulation).
- `Community_Districts.csv` - [NYC Community Districts information](https://catalog.data.gov/dataset/community-districts-74cf7)
- `aggregated_complaint_census_tract.json` - Aggregated on `year_month`,`census_tract_id`,`Complaint Type`
- `optimized_complaint_census_tract.json`  - Nested Dictionary Structure: Complaint Type -> year_month -> census_tract_id -> complaint_count

### Analysis Files
- `NYC311.ipynb` - NYC 311 EDA
- `311_data_pipeline.ipynb` - NYC 311 data pipeline
