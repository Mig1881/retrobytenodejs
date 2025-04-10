CREATE DATABASE retrostore;

GRANT ALL PRIVILEGES ON retrostore.* TO user;

USE retrostore;


CREATE TABLE users (
	id_user int PRIMARY KEY AUTO_INCREMENT,
	name varchar(50),
	username varchar(50) unique not null,
	password varchar(40) not null,
	role varchar(25) default 'user',
	tel  varchar(18),
	address varchar(50),
	zip_code varchar(5),
	city varchar(50),
	country varchar(50)
);


CREATE TABLE suppliers (
	id_supplier int PRIMARY KEY AUTO_INCREMENT,
	name varchar(50) unique not null,
	tel  varchar(18),
	address varchar(50),
	zip_code varchar(5),
	city varchar(50),
	country varchar(50),
	website varchar(50),
	email varchar(50)
);

CREATE TABLE products (
	id_product int PRIMARY KEY AUTO_INCREMENT,
	product_name varchar(50),
	description varchar(150),
	sale_price decimal(9,2),
	stock_units int default 1,
	image varchar(40),
	release_date date,
	product_status varchar(100),
	id_supplier int,
	constraint products_fk_id_supplier foreign key (id_supplier) references suppliers(id_supplier)
);

-- Insert USERS

INSERT INTO users(name,username,password,role,tel,address,zip_code,city,country) VALUES('Miguel Angel','mig1881','m','admin','+34667818818','Calle Mur,1','50004','Zaragoza','España');
INSERT INTO users(name,username,password,role,tel,address,zip_code,city,country) VALUES('Juan','juan12','j','admin','+34605788521','Calle Nor,2','50012','Zaragoza','España');
INSERT INTO users(name,username,password,role,tel,address,zip_code,city,country) VALUES('David','david21','d','admin','+34605736125','Calle Sur,23','50011','Zaragoza','España');
INSERT INTO users(name,username,password,role,tel,address,zip_code,city,country) VALUES('roberto','roberto','r','user','+34604642564','Calle Jesus,18','50001','Zaragoza','España');

-- Insert Suppliers

INSERT INTO suppliers(name,tel,address,zip_code,city,country,website,email) VALUES('RetroPC','+34607658712','Calle Tar,4','50500','Tarazona','España','retropc.es','retropc@gmail.com');
INSERT INTO suppliers(name,tel,address,zip_code,city,country,website,email) VALUES('Manuel Hidalgo Saavedra','+34605787214','Calle Sev,5','41012','Sevilla','España','segundavidaPc.es','mhidalgo@gmail.com');
INSERT INTO suppliers(name,tel,address,zip_code,city,country,website,email) VALUES('CentroMail calle Cadiz','+34976521697','Calle Cadiz,12','50004','Zaragoza','España','game.es','gameZcadiz@game.com');
INSERT INTO suppliers(name,tel,address,zip_code,city,country,website,email) VALUES('Star Games','+34978881697','Centro Independencia,21','50004','Zaragoza','España','stargames.es','stargames@star.com');
INSERT INTO suppliers(name,tel,address,zip_code,city,country,website,email) VALUES('Retro Games','+34976882296','poligono Centrovia,21','50250','La Muela','España','retrogames.es','retrogames@games.com');
INSERT INTO suppliers(name,tel,address,zip_code,city,country,website,email) VALUES('CEX','+34976111699','Calle Dr Val-Carreres,1','50004','Zaragoza','España','cex.com','cexzar@cex.com');	
INSERT INTO suppliers(name,tel,address,zip_code,city,country,website,email) VALUES('Old School','+34979221688','Calle Bilbao,9','50004','Zaragoza','España','oldschool.com','oldschoolzgz@retropc.com');	
INSERT INTO suppliers(name,tel,address,zip_code,city,country,website,email) VALUES('RetroMaC','+3497674767','Calle San Juan Bosco,8','50010','Zaragoza','España','retromac.com','retromaczgz@retromac.com');

 -- Insert Products  

INSERT INTO products(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier) VALUES('Commodore 64','Micrordenador de 8 bits de los 80, el micrordenado mas vendido en el mundo',180.50,1,'no_image.jpg','1982-01-02','Bueno con roces en la entrada de cartuchos',1);
INSERT INTO products(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier) VALUES('Spectrum','Micrordenador de 8 bits de los 80, con mucho exito en Europa, Britanico',120.80,1,'no_image.jpg','1982-01-03','Decente, las letras de las teclas no se ven bien',1);
INSERT INTO products(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier) VALUES('Amstrad CPC464','Micrordenador de 8 bits de los 80, con mucho exito en España, muy buen Basic',150,1,'no_image.jpg','1985-01-05','Buena, El cassete integrado falla a veces al leer',2);
INSERT INTO products(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier) VALUES('Sony MSX','Micrordenador de 8 bits de los 80, con mucho exito en Japon',198.80,1,'no_image.jpg','1984-01-04','Bueno, no se aprecian defectos',2);
INSERT INTO products(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier) VALUES('Commodore Amiga 500','Micrordenador de 16 bits de los 80, ordenador con sistema de ventanas',201,1,'no_image.jpg','1985-06-01','Buena, la disquetera muestra algun error de lectura',2);
INSERT INTO products(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier) VALUES('PC 286 sin coprocesador matemático','Pc de 16 bits de finales de los 80, con 20MB de disco duro',129.99,1,'no_image.jpg','1988-05-15','Decente, el monitor de fosforo verde tarda encender',3);
INSERT INTO products(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier) VALUES('PC 486 DX50','PC de principios de los 90,lleva coprocesador integrado 40MB de disco duro',139.99,1,'no_image.jpg','1993-01-01','Bueno, la carcasa esta un poco amarillenta',3);
INSERT INTO products(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier) VALUES('PC Pemtium I 133Mhz','Ordenador preparado para Windows 95',149.99,1,'no_image.jpg','1995-11-11','Bueno, no se aprecian defectos',3);
INSERT INTO products(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier) VALUES('PC Pemtium III','Ordenador preparado para Windows XP',159.99,1,'no_image.jpg','2001-12-03','Bueno, el lector CD-ROM da fallos de lectura',4);
INSERT INTO products(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier) VALUES('Portatil ASUS Multimedia','Ordenador portatil para Windows 7, con un i7 de primera generacion',169.99,1,'no_image.jpg','2010-12-03','Bueno, la fuente de alimentacion externa recien cambiada',5);  
INSERT INTO products(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier) VALUES('PC torre Gaming personalizada','Ordenador gaming para Windows 10, con un i5 de octava generacion',269.99,1,'no_image.jpg','2017-11-05','Bueno, tiene 8GB de RAM y una GTX1060 de 6GB ',7);  
INSERT INTO products(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier) VALUES('Portatil Gaming 2018','Ordenador portatil gaming para Windows 10, con un i7 de octava generacion',299.99,1,'no_image.jpg','2018-06-02','Bueno, tiene 12GB de RAM y una GTX1050 de 4GB ',7);
INSERT INTO products(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier) VALUES('Apple I','Primer ordenador de apple',667.00,1,'no_image.jpg','1976-01-02','Muy Bueno, intacto ',8);
INSERT INTO products(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier) VALUES('Apple II','Primer ordenador con exito comercial de apple',1298.00,1,'no_image.jpg','1977-06-01','Muy Buen estado de conservación ',8);
INSERT INTO products(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier) VALUES('Apple III','Primer ordenador de los 80 de apple',1800.00,1,'no_image.jpg','1980-01-02','Bueno ',8);
INSERT INTO products(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier) VALUES('Apple Lisa','Pototipo de apple de sistema de ventanas',1999.99,1,'no_image.jpg','1983-05-03','Muy Bueno ',8);
INSERT INTO products(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier) VALUES('Apple Macintosh','Viene de un grupo de Ordenadores que provienen de la universidad de Zaragoza',599.99,1,'no_image.jpg','1984-07-01','Muy Usado, con muchos roces todas las unidades',8);
INSERT INTO products(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier) VALUES('PowerMac 5200','Orenador de apple muy usado en edicion en los 90',799.99,1,'no_image.jpg','1995-10-05','Muy Bueno ',8);
INSERT INTO products(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier) VALUES('IMac G3','Ordenador con momitor integrado de finales de los 90',999.99,1,'no_image.jpg','1998-12-01','Muy Bueno ',8);
INSERT INTO products(product_name,description,sale_price,stock_units,image,release_date,product_status,id_supplier) VALUES('iMac G4','Potente edicion y buen diseño de principios de los 2000',799.99,1,'no_image.jpg','2002-04-01','Muy Bueno ',8);         