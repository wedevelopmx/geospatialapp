#Geospatial

Geospatial App es un prototipo para un portal de apoyo para el mapeo de asentamientos urbanos irregulares. A través de la aplicación organizaciones civiles pueden generar un nuevo proyecto de mapeo, crear encuestas, geolocalizar puntos de interés como: servicios de salud, focos de violencia, etc. Dicha información puede ser actualizada via aplicación móvil.

##Origen

Geospatial fue creado para el reto [Co-Mapp](https://codeandomexico.org/retos/150-reto-co-mapp) creado por [TECHO](https://www.facebook.com/TECHOmexico/) y [Observatorio de vivienda](https://www.facebook.com/observatoriodelderechoalavivienda/) bajo la direccion de [Codeando Mexico](https://codeandomexico.org).

El proyecto fue desarrollado en un periodo de tiempo de 1 mes presentándose al jurado en Junio de 2016, como parte de los 5 finalistas.  

##Technology Stack

A continuación se lista las tecnologías utilizadas para crear este prototipo:

1. NodeJS + Express + AngularJS
2. SQLite3 + Sequelizer
3. OpenLayers3 + AngularOpenLayersDirective
4. Angular NDV3 Directive
5. Bootstrap

##Instalacion

###Prerequisitos

Para poder instalar el ambiente local de este proyecto sera necesario instalar:

1. Git
2. NodeJS
3. NPM
4. Bower 


###Instalacion

1. Bajar el código

```
git clone https://github.com/wedevelopmx/geospatialapp.git
```

2. Bajar dependencias

```
cd geospatial
npm install
bower install
```

3. Inicialización de datos

Para poder utilizar OpenStreetMaps será necesario procesar y generar archivos GeoJSON que contengan las representaciones gráficas de cada estado de la república. El proceso de generación de dichos archivos esta descrito en:  

>geospatialapp/private/data_init/


4. Levantar la aplicación

```
sudo node bin/www
```

5. Acceder a la aplicación a través de localhost:3000

##Contacto

Para obtener más información acerca del prototipo asi como recibir un demo, puedes contactarnos a través de nuestro correo electrónico: contacto@wedevelop.mx.

##Licencia

Copyright (c) 2016 [WeDevelop](http://wedevelop.mx/ "WeDevelop")

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.