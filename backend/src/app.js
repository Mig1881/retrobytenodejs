//***CARGO DE LIBRERIAS */
const express = require('express');
const cors = require('cors');
const knex = require('knex');

//*** INICIO DE LA APLICACION */
const app = express();
app.use(cors());
app.use(express.json());

//*** INICIO DE LA BASE DE DATOS */
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'retrocomputers.db'
    },
    useNullAsDefault: true
});


//*******DEFINICION DE OPERACIONES DE LA BD CRUD*********** 
//*
// Campos de la tabla products
//  id_product int PRIMARY KEY AUTO_INCREMENT,
// 	product_name varchar(50),
// 	description varchar(150),
// 	sale_price decimal(9,2),
// 	stock_units int default 1,
// 	image varchar(40),
// 	release_date date,
// 	product_status varchar(100),
// 	id_supplier int
//*
// atencion, siempre todas los registros van por defecto, lo que no va por defecto son los campos
//si pongo * van todos los campos de cada registro
app.get('/products', async (req, res) => {
    const products = await db('products').select('*');
    res.status(200).json(products);
//esto ultimo devuelve una doble informacion al mismo tiempo, por un lado
//el status 200, es decir todo correcto y por otro el fichero jason con todos los datos    
});
//Nota con el first, lo que me aseguro es que devuelve un listado con una peli unicamente

// Productos CRUD
app.get('/products/:id_product', async (req, res) => {
    const product = await db('products').select('*').where({ id_product: req.params.id_product }).first();
    res.status(200).json(product);
});

app.post('/products', async (req, res) => {
    await db('products').insert({
        product_name: req.body.product_name,
        description: req.body.description,
        sale_price: req.body.sale_price,
        stock_units: req.body.stock_units,
        image : req.body.image,
        release_date: req.body.release_date,
        product_status: req.body.product_status,
        id_supplier: req.body.id_supplier
    });

    res.status(201).json({});
});
// ojo, no pongo el id_product para modificar, es la clave
app.put('/products/:id_product', async (req, res) => {
     await db('products').where({ id_product: req.params.id_product }).update({
        product_name: req.body.product_name,
        description: req.body.description,
        sale_price: req.body.sale_price,
        stock_units: req.body.stock_units,
        image : req.body.image,
        release_date: req.body.release_date,
        product_status: req.body.product_status,
        id_supplier: req.body.id_supplier
     });

     res.status(204).json({});
});

//NO ENTIENDO PORQUE AQUI HAY QUE DEFINIR UNA CONSTANTE, PREGUNTAR SANTI SI NO LO EXPLICA EL
//Creo que daria exactamente lo mismo
app.delete('/products/:id_product', async (req, res) => {

        const idProduct = req.params.id_product;
        await db('products').del().where({id_product: idProduct});

        res.status(204).json({})
});


//Proveedores CRUD
app.get('/suppliers', async (req, res) => {
    const suppliers = await db('suppliers').select('*');
    res.status(200).json(suppliers);
//esto ultimo devuelve una doble informacion al mismo tiempo, por un lado
//el status 200, es decir todo correcto y por otro el fichero jason con todos los datos    
});

app.get('/suppliers/:id_supplier', async (req, res) => {
    const supplier = await db('suppliers').select('*').where({ id_supplier: req.params.id_supplier }).first();
    res.status(200).json(supplier);
});

app.delete('/suppliers/:id_supplier', async (req, res) => {

    const idSupplier = req.params.id_supplier;
    await db('suppliers').del().where({id_supplier: idSupplier});

    res.status(204).json({})
});

app.post('/suppliers', async (req, res) => {
    await db('suppliers').insert({
        name: req.body.name,
        tel: req.body.tel,
        address: req.body.address,
        zip_code: req.body.zip_code,
        city : req.body.city,
        country: req.body.country,
        website: req.body.website,
        email: req.body.email
    });

    res.status(201).json({});
});

app.put('/suppliers/:id_supplier', async (req, res) => {
    await db('suppliers').where({ id_supplier: req.params.id_supplier }).update({
        name: req.body.name,
        tel: req.body.tel,
        address: req.body.address,
        zip_code: req.body.zip_code,
        city : req.body.city,
        country: req.body.country,
        website: req.body.website,
        email: req.body.email
    });

    res.status(204).json({});
});

app.listen(8081, () => {
    console.log('El backend ha iniciado en el puerto 8081');
});