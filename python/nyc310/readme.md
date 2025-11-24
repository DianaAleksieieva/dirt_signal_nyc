# NYC Complaints Dataset

## File Descriptions

### Raw Complaint Data
- `nyc_complaints_all.csv` - Complete NYC complaints dataset, downloaded from <https://data.cityofnewyork.us/Social-Services/311-trash-reports/h2g7-xbpj/about_data>
- `nyc_complaints_census_tract.csv` - Cleaned Complaints data with `census_tract_id`

### Aggregated Data
- `aggregated_records.csv` - Aggregated on `year_month`,`NTA2020`,`Complaint Type`
- `aggregated_complaint_census_tract.csv` - CSV. Aggregated on `year_month`,`census_tract_id`,`Complaint Type`
- `aggregated_complaint_census_tract.json` - JSON. Aggregated on `year_month`,`census_tract_id`,`Complaint Type`

### Geographical Data
- `nta_boundaries.geojson` - Neighborhood Tabulation Areas boundaries
- `nynta2020_25d.zip` - [Neighborhood Tabulation Areas 2020](https://www.nyc.gov/content/planning/pages/resources/datasets/neighborhood-tabulation).
- `Community_Districts.csv` - [NYC Community Districts information](https://catalog.data.gov/dataset/community-districts-74cf7)

### Analysis Files
- `NYC310.ipynb` - Jupyter notebook for NYC 310 Analysis
