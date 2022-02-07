# Banco API 💰

### Heroku

<img align="left" alt="Mongo" wdnith="22px" src="https://imgr.search.brave.com/LQX0cwX7D_PUqrL82ylNVYwCWHvzxskM8YliBOdoqmA/fit/300/300/ce/1/aHR0cHM6Ly9odW1h/bmNvZGVycy1mb3Jt/YXRpb25zLnMzLmFt/YXpvbmF3cy5jb20v/dXBsb2Fkcy9jb3Vy/c2UvbG9nby8yMi9m/b3JtYXRpb24tbW9u/Z29kYi5wbmc" />
<img align="left" alt="TypeScript" wdnith="22px" src="https://imgr.search.brave.com/ehh7zpP11ttmGQytg8jzQ6TeWHqVIQI0lPnRsq5B7HU/fit/180/200/ce/1/aHR0cHM6Ly93d3cu/bm9kZWpzLXR5cGVz/Y3JpcHQtYXBpLmNv/bS9jdXJzby1ncmF0/aXMvdHMucG5n" />
<img align="left" alt="node js" wdnith="22px" src="https://imgr.search.brave.com/-QVTmC4wnNZXNLetXKutpva-0J2HgnxRCmUHdAlCZuk/fit/1200/1200/ce/1/aHR0cHM6Ly9jZG4u/ZnJlZWJpZXN1cHBs/eS5jb20vbG9nb3Mv/bGFyZ2UvMngvbm9k/ZWpzLWljb24tbG9n/by1wbmctdHJhbnNw/YXJlbnQucG5n" />
<img align="left" alt="npm" wdnith="22px" src="https://imgr.search.brave.com/v_yppNScztECFB2gfyE0oGRgPmZdH-RCcqK4yqBGNpo/fit/150/150/ce/1/aHR0cDovL2Jsb2dq/cy5naXRodWIuaW8v/cHVibGljL25wbS1s/b2dvLnBuZw" />
<img align="left" alt="heroku" wdnith="22px" src="https://imgr.search.brave.com/2inKREeOyiaH0J_g3-LqHLu37Zys5wNhiVcAHMmrZq8/fit/300/300/ce/1/aHR0cHM6Ly9pbWFn/ZXMuY3RmYXNzZXRz/Lm5ldC85bnhnemE5/dmxyM2IvNGlNTnpx/NGxyMjR5T0VFRUFv/a1VjWS84ZGFmYmE4/MTkwMjA2YmYwNThl/NjY3ZTdkOGU1YmQ1/My9IZXJva3VfbG9n/by5wbmc_dz0zMDAm/aD0zMDAmZm09cG5n/JnE9ODAmZml0PXBh/ZA" />

‎

API de la gestión de clientes y empleados de un banco. Este proyecto está basado en un extracto de lo que sería una base de datos mayor, aquí tan solo usaremos unos pocos datos representativos de toda la base de datos.

‎

# Código 🔎

En la carpeta src encontraremos **server.ts**, que permitirá las conexiones de la base de datos y de la API con un entorno web.

Dentro de esta misma carpeta encontraremos todo el código necesario para el funcionamiento de este proyecto.
Contamos con la carpeta de **classes** donde tendremos las dos clases de nuestro proyecto: _[clientes](https://github.com/SanchezGarciaEmilio/220110_api-rest-banco/tree/main/src/classes/clientes)_ y _[empleados](https://github.com/SanchezGarciaEmilio/220110_api-rest-banco/tree/main/src/classes/empleados)_. Cuentan con las respectivas clases padre e hijo:

#### Empleados

```
Empleado (padre)
Directivo
Limpiador
Comercial
```

#### Clientes

```
Cliente (padre)
Persona
Empresa
```

Tenemos luego la carpeta de **database**, con el código necesario para conectarse a la base de datos.
En la carpeta **model** encontramos las estructuras (esquemas y tipos) necesarios para subir nuestros datos a MongoDB.
Finalmente en la carpeta **routes** encontramos las rutas de web de nuestra API para su correcto funcionamiento.

Dentro de las funciones encontramos las siguientes:

```
buscarComercial
crearCliente
actualizarCliente
borrarCliente
calcularSalario
calcularRenta
mediaGanancia
crearPrestamo
```

‎

# Documentación 📝

En la carpeta de **documentacion** hemos includnio las nociones teóricas necesarias para este proyecto y una explicación del funcionamiento y uso de cada ruta.

‎

# Fuentes 📋

Algunos de los datos generados de prueba han sdnio mediante la página web de _[mockaroo](https://mockaroo.com/)_.
‎

> Emilio Sánchez García
