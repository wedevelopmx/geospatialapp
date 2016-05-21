#GeoJSON State generation & database import

##How to create the geoJSON maps for each state:

```
mkdir geo
cd geo
curl -o estados.zip http://mapserver.inegi.org.mx/MGN/mge2010v5_0.zip
curl -o  municipios.zip http://mapserver.inegi.org.mx/MGN/mgm2010v5_0.zip
unzip estados.zip 
unzip municipios.zip
ogr2ogr states.shp Entidades_2010_5.shp -t_srs "+proj=longlat +ellps=WGS84 +no_defs +towgs84=0,0,0"
ogr2ogr geo/municipalities.shp geo/Municipios_2010_5.shp -t_srs "+proj=longlat +ellps=WGS84 +no_defs +towgs84=0,0,0"

 ogr2ogr -f GeoJSON -t_srs crs:84 states.geojson states.shp
 ogr2ogr -f GeoJSON -t_srs crs:84 municipalities.geojson municipalities.shp

```

Once you generate GeoJSON you can run geojson app in bin folder in order to import municipalities and generate JSON files for each state

```
mkdir states
sudo node bin/geojson
```


Based on the process describer on: [Projected Topojson of Mexican Municipalities](https://gist.github.com/diegovalle/5129746?short_path=f13ad2a)
