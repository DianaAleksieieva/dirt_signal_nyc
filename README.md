# DirtSignal
New York is an incredibly beautiful place. But every visitor and local can agree that cleanliness problems are one of the most visible in the city. An analysis of the tonnage of garbage for 2024 shows that 8,147 garbage are collected from residential buildings every day. To better understand why problems with street cleanliness are still present despite the huge work that the DSNY does. To understand this, we decided to analyze 311 complaints related to cleanliness.

Live page: https://dirtsignalnyc.vercel.app/

## Table of Contents

- [DirtSignal](#dirtsignal)
- [Live Page](#live-page)
- [Data Sources](#data-sources)
- [Libraries Used](#libraries-used)
- [Project Components](#project-components)
- [Methodology](#methodology)
- [Key Findings](#key-findings)
- [Our Solutions](#our-solutions)
- [About Us](#about-us)


## Data Sources:
__New York City Population by Community Districts__

Provides population estimates by community district.\
https://data.cityofnewyork.us/City-Government/New-York-City-Population-By-Community-Districts/xi7c-iiu2


__DSNY Monthly Tonnage Data__

Contains monthly records of waste collected by the Department of Sanitation.\
https://data.cityofnewyork.us/City-Government/DSNY-Monthly-Tonnage-Data/ebb7-mvp5/about_data


__DSNY Litter Basket Locations__

Dataset of public litter basket locations.\
https://data.cityofnewyork.us/Environment/DSNY-Litter-Basket-Map-/d6m8-cwh9


__NYC 311 Trash Reports__

Records of sanitation-related complaints submitted through the 311 system.\
https://data.cityofnewyork.us/Social-Services/311-trash-reports/h2g7-xbpj/about_data


__Bi-Annual Pedestrian Counts__

Measures pedestrian foot traffic at selected locations across NYC.\
https://data.cityofnewyork.us/Transportation/Bi-Annual-Pedestrian-Counts/2de2-6x2h

__OpenStreetMap (OSM)__

Provides NYC census tract and neighborhood boundary data, used for spatial aggregation, geographic joins, and map visualization.


## Libraries Used: 

***Next.js.*** A React-based framework for building web applications

***Vercel.*** Deployment and hosting platform for continuous integration and production delivery

***Leaflet.*** An interactive mapping library used for rendering spatial layers and geographic overlays

***React-Leaflet.*** React bindings for Leaflet, enabling modular and component-based map layers

***Recharts.*** Charting library used for interactive data visualizations, including line charts, bar charts, and trend analysis


## Project Components: 
### 1. Analysis Dashboard
The Analysis section provides exploratory data analysis and summary insights before users interact with the map. The section includes:

__DSNY Tonnage Analysis.__

This component analyzes waste collection volumes in New York City boroughs.
Annual DSNY waste tonnage by community borough
Waste volume comparisons between boroughs and districts
Tonnage trends over time

__311 Sanitation Complaints Analysis__

This component examines sanitation issues reported by residents.
Total number of complaints and number of complaints by category (collection, sweeping, trash removal)
Temporal trends and seasonality of sanitation complaints
Comparison of complaint intensity across boroughs
Identification of high-complaint areas and dominant complaint categories

__Analysis of Top Cleanliness Issues__
This component identifies the most common sanitation issues faced by each borough.
Analyzing how pedestrian traffic affects litter complaints

### 2. ​​Interactive Map 

The Map section is the project’s primary research tool. It uses multi-layered geospatial visualizations to explore sanitation status at the neighborhood and census tract levels. Users can toggle between multiple map layers, adjust time ranges, and explore different cleanliness metrics.

__DSNY Monthly Waste Data Layer__

Visualizes the distribution of waste tonnage across New York City’s public neighborhoods.
Monthly and annual total waste collections
Relative differences in waste volumes across neighborhoods
Identifies high-waste neighborhoods

__311 Sanitation Complaints Layer__

Represents sanitation issues reported by residents as an indicator of perceived street cleanliness. 
Complaints Density by Census Tract
Filters by complaint type (collection, sweeping, basket issues)
Time period: 2010-2025

__Top Sanitation Issues Layer (“Common Issues”)__

Identifies the dominant sanitation issue in each borough.
Winner-take-all classification of the most common complaint types by borough
Color-coded categories (missed collection, overflow, street cleaning)

__DSNY Trash Can Layer__

Shows the spatial distribution of public trash cans throughout New York City.
Location of DSNY-operated trash cans


## Methodology

CleanSight NYC uses several public datasets, such as NYC 311 sanitation complaints, monthly DSNY waste tonnage records, trash can locations, and pedestrian traffic, to investigate the problems and extent of New York City’s trash situation.

The 311 trash-related complaints dataset contains over 1.7 million requests. We used reports submitted between January 2010 and December 2025 to analize complaint types and density by neighborhood. Complaints were categorized into major issue types, including trash collection, litter baskets, and street sweeping, to allow comparison across different kinds of sanitation problems.

For spatial analysis and visualization, individual complaints were aggregated at the New York City census tract level

Monthly DSNY tonnage data is also included to better understand the extent of cleanup. This dataset captures the amount of waste collected each month, by waste category, and by community area. Tonnage values ​​were analyzed both overall and normalized by population.

Geographic boundaries were obtained from census tracts and OpenStreetMap neighborhood shapefiles.

To assess sanitation infrastructure, DSNY trash can location data was overlaid on complaint and problem layers. In addition, pedestrian counts were used as an indicator of human activity and foot traffic, which helps analyze sanitation problems driven by pedestrian volume.

Analytics have been added to the "analysis" dashboard. Spatial analysis is presented using several interactive map layers. These include complaint density maps, waste tonnage maps, and a dominant problem layer that assigns the most frequently reported sanitation problem to each neighborhood.


## Key Findings

__Volume of Household Waste__

The analysis shows that boroughs such as Queens, Staten Island, and Brooklyn have higher per capita waste tonnage than Manhattan. The reasons for this may be the type of housing. In private homes, there is more space for garbage collection, so people buy more and end up throwing away more. In areas with high population density, people have less space per capita, so they accumulate less garbage, and the tonnage of waste is lower.

__311 Patterns of Sanitation Complaints__

Littering problems dominate the complaint data compared to complaints about street cleaning and problems with trash cans. This does not mean that there are fewer problems with street litter. People simply do not complain about problems in their neighborhood, while problems with litter near their own homes are the subject of many complaints. In some neighborhoods, an entire year may include only a few complaints about cleaning, even if the neighborhood actually has significant street litter problems.

__Neighborhood-specific sanitation issues__

Most often, residents of the districts report complaints that garbage is not collected. Therefore, the problem of uncollected garbage is predominant over the problems of the layer map. Some neighborhoods have problems with complaints about garbage cans. After analyzing the density of garbage cans in these districts, it can be said that the presence of one can may not be enough in some areas because they still suffer from overflow.


## Our Solutions

Make sanitation data visible. The platform allows residents to investigate sanitation complaints in their own neighborhoods. By comparing the complaints registered with the daily conditions on the streets, users can conclude that the sanitation department is not receiving enough reports to influence improvements.

Encourage more people to report sanitation issues. Adding complaints to the 311 database allows for documentation of residents’ dissatisfaction with the cleanliness of the streets. Without adding complaints, these issues will not be addressed.

Promote the sanitation features of the 311 service. Advertising and showcasing the features for reporting street sweeping, street litter, and overflowing bins will help engage more people in monitoring the cleanliness status.

By analyzing the data visualization in their own neighborhood, the project shows the need for greater involvement of residents. In the future, volunteer initiatives can be provided to increase cleanliness reports.

Pointing out issues to the Sanitation Department and neighborhood policymakers. The interactive platform allows you to analyze problems in the New York City census tract, showing where infrastructure problems exist, what complaints are most common, and where household waste levels are highest. By identifying areas with consistently high complaint rates or high volumes of waste, the project helps determine where DSNY needs to allocate more resources to combat litter.

The platform also aims to create programs to reduce household waste. By visualizing how much household waste is collected in each neighborhood, we motivate residents to reconsider their habits of accumulating unnecessary things and then throwing them away. Local organizations can use this data to plan education campaigns aimed at reducing waste in areas with high trash tonnage.


## About Us:

CleanSight NYC is a data-driven student project developed as part of a data visualization course. The project aims to show neighborhood cleanliness and litter collection issues in order to engage the community in solving litter problems. The research results can be used to inform policy decisions, analyze neighborhood complaint rates, and encourage people to complain more to improve neighborhood conditions. Our team: https://dirtsignalnyc.vercel.app/team
