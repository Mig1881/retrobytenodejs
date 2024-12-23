Retobyte - Aplicacion Web -

Retrobye es la primera version de una pagina funcional de compra - venta - reparaciones de ordenadores y microordenadores retro, aceptando articulos de todas 
las epocas.
En la version 1.0 solo esta implementado el control de usuarios y la lista de productos a 
la venta, asi como el accesso al administrador de la pagina para que pueda tener acceso al 
CRUD completo de las tres tablas implementadas hasta el momento( USERS, SUPPLIERS, PRODUCTS)
Para ello se ha cosnstruido la base de datos con SQLite. Y se ha dejado la BD inicial alojada en
el mismo espacio físico del BACKEND(en la segunda version, que coincidira con la segunda evaluacion
se desplegará en otra ubicación mucho mas lógica).

INSTALACION DE LA APLICACION
============================


Se realiza un git Clone https://github.com/Mig1881/retrobytenodejs 
Se accede a la carpeta recien creada
cd retrobytenodejs

La base de datos hay que crearla y alojarla fisicamente en el Backend de la carpeta del proyecto retrobytenodejs, se tiene que llamar:

retrocomputers.db

Recomendamos el uso de DB Browser for SQLite para crear y manipular la base de datos.
Las tablas tienen esta estructura en SQlite, se va a la pestaña EjecutarSQL de DB Browser for SQLite y se ejecuta..

CREATE TABLE "users" (
	"id_user"	INTEGER,
	"name"	TEXT,
	"username"	TEXT NOT NULL UNIQUE,
	"password"	TEXT NOT NULL,
	"role"	TEXT DEFAULT 'user',
	"tel"	TEXT,
	"address"	TEXT,
	"zip_code"	TEXT,
	"city"	TEXT,
	"country"	TEXT,
	PRIMARY KEY("id_user" AUTOINCREMENT)
);



CREATE TABLE "suppliers" (
	"id_supplier"	INTEGER,
	"name"	TEXT NOT NULL UNIQUE,
	"tel"	TEXT,
	"address"	TEXT,
	"zip_code"	TEXT,
	"city"	TEXT,
	"country"	TEXT,
	"website"	TEXT,
	"email"	TEXT,
	PRIMARY KEY("id_supplier" AUTOINCREMENT)
);

CREATE TABLE "products" (
	"id_product"	INTEGER,
	"product_name"	TEXT,
	"description"	TEXT,
	"sale_price"	REAL,
	"stock_units"	INTEGER,
	"image"	TEXT,
	"release_date"	INTEGER,
	"product_status"	TEXT,
	"id_supplier"	INTEGER,
	PRIMARY KEY("id_product" AUTOINCREMENT),
	FOREIGN KEY("id_supplier") REFERENCES "suppliers"("id_supplier")
);

Recordar que lo primero que se tiene quedar de alta son los usuarios, despues proveedores y despues los productos.
El orden es fundamental, tal como esta especificado.

Dejamos unos registros iniciales para que se puedan empezar a operar.

/ Inserts de la tabla USERS:

	INSERT INTO USERS(name,username,password,role,tel,address,zip_code,city,country)
	VALUES('Miguel Angel','miguel81',miguel,'admin','+34667818818','Calle Mur,1','50004','Zaragoza','España');

	INSERT INTO USERS(name,username,password,role,tel,address,zip_code,city,country)
    	VALUES('Juan','juan12',juan,'admin','+34605788521','Calle Nor,2','50012','Zaragoza','España');

	INSERT INTO USERS(name,username,password,role,tel,address,zip_code,city,country)
    	VALUES('David','david21',david,'admin','+34605736125','Calle Sur,23','50011','Zaragoza','España');

	INSERT INTO USERS(name,username,password,role,tel,address,zip_code,city,country)
    	VALUES('roberto','roberto',r,'user','+34604642564','Calle Jesus,18','50001','Zaragoza','España');

// Inserts tabla SUPPLIERS

    INSERT INTO SUPPLIERS(name,tel,address,zip_code,city,country,website,email)
    VALUES('RetroPC','+34607658712','Calle Tar,4','50500','Tarazona','España','retropc.es','retropc@gmail.com');
	
    INSERT INTO SUPPLIERS(name,tel,address,zip_code,city,country,website,email)
	VALUES('Manuel Hidalgo Saavedra','+34605787214','Calle Sev,5','41012','Sevilla','España','segundavidaPc.es','mhidalgo@gmail.com');
	
    INSERT INTO SUPPLIERS(name,tel,address,zip_code,city,country,website,email)
	VALUES('CentroMail calle Cadiz','+34976521697','Calle Cadiz,12','50004','Zaragoza','España','game.es','gameZcadiz@game.com');

    INSERT INTO SUPPLIERS(name,tel,address,zip_code,city,country,website,email)
	VALUES('Star Games','+34978881697','Centro Independencia,21','50004','Zaragoza','España','stargames.es','stargames@star.com');

    INSERT INTO SUPPLIERS(name,tel,address,zip_code,city,country,website,email)
	VALUES('Retro Games','+34976882296','poligono Centrovia,21','50250','La Muela','España','retrogames.es','retrogames@games.com');

    INSERT INTO SUPPLIERS(name,tel,address,zip_code,city,country,website,email)
	VALUES('CEX','+34976111699','Calle Dr Val-Carreres,1','50004','Zaragoza','España','cex.com','cexzar@cex.com');	

    INSERT INTO SUPPLIERS(name,tel,address,zip_code,city,country,website,email)
	VALUES('Old School','+34979221688','Calle Bilbao,9','50004','Zaragoza','España','oldschool.com','oldschoolzgz@retropc.com');	

    INSERT INTO SUPPLIERS(name,tel,address,zip_code,city,country,website,email)
	VALUES('RetroMaC','+3497674767','Calle San Juan Bosco,8','50010','Zaragoza','España','retromac.com','retromaczgz@retromac.com');
	

// Inserts de la tabla Products
// Nota el formato de fecha date standard pasa de '01/02/1982' de Oracle a '1982-02-01' en mysql

INSERT INTO PRODUCTS(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier)
    VALUES('Commodore 64','Micrordenador de 8 bits de los 80, el micrordenado mas vendido en el mundo',180.50,1,'no_image.jpg',   
            '1982-01-02','Bueno con roces en la entrada de cartuchos',1);	
    INSERT INTO PRODUCTS(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier)
    VALUES('Spectrum','Micrordenador de 8 bits de los 80, con mucho exito en Europa, Britanico',120.80,1,'no_image.jpg',   
            '1982-01-03','Decente, las letras de las teclas no se ven bien',1);
    INSERT INTO PRODUCTS(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier)
    VALUES('Amstrad CPC464','Micrordenador de 8 bits de los 80, con mucho exito en España, muy buen Basic',150,1,'no_image.jpg',   
            '1985-01-05','Buena, El cassete integrado falla a veces al leer',2);
    INSERT INTO PRODUCTS(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier)
    VALUES('Sony MSX','Micrordenador de 8 bits de los 80, con mucho exito en Japon',198.80,1,'no_image.jpg',   
            '1984-01-04','Bueno, no se aprecian defectos',2);
    INSERT INTO PRODUCTS(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier)
    VALUES('Commodore Amiga 500','Micrordenador de 16 bits de los 80, ordenador con sistema de ventanas',201,1,'no_image.jpg',   
            '1985-06-01','Buena, la disquetera muestra algun error de lectura',2);
    INSERT INTO PRODUCTS(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier)
    VALUES('PC 286 sin coprocesador matemático','Pc de 16 bits de finales de los 80, con 20MB de disco duro',129.99,1,'no_image.jpg',   
            '1988-05-15','Decente, el monitor de fosforo verde tarda encender',3);


IMPORTANTE:
==========
las imagenes hay que crear una carpeta /IMAGES en el backend, para recoger las fotos subidas al servidor
        

Se ha utilizado como base para el servidor NodeJS y Express, luego hemos ido implementado unas librerias
muy conocidas como son cors, multer, sqlite3, knex en el backend y axios toastify-js en el frontend.
El aplicativo tiene un total de XX htmls, los cuales vienen referenciadas en el fichero pacjage.json del
frontend.

Para iniciar la aplicacion, una vez creada la BD y rellenada con la muestra de registros, hay que instalar la librerias tanto en el backend
como en el frontend.
Iniciamosu terminal, como por ejemplo el terminal de Visual Studio Code
Nos ponemos en el Backend de nuestro proyecto..
cd backend
Instalamos las librerias..
npm install
Iniciamos el Backend
npm start
A continuacion nos sale un mensaje en el terminal que el puero 8081 esta escuchando.., todo va bien¡¡

Recomendamos el uso de nodemon si se va a seguir desarrollando, para no tener que estar iniciando todo el rato el backend

En el lado cliente nos vamos a su directorio..
cd..
cd frontend
Instalamos la librerias necesarias..
npm install
E iniciamos..
npm start

Nos vamos a un navegador y ponemos la direccion..
http://localhost:1234/

Es aqui donde se visualiza nuestro aplicativo en el frontend, y donde ya podemos empezar a operar.
Recordar que ya teneis 4 usuarios dados de alta y una lista minima de proveedores y productos.
