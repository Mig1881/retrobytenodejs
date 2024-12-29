//***CARGO DE LIBRERIAS */
const express = require('express');
const cors = require('cors');
const knex = require('knex');
const multer = require('multer');

//*** INICIO DE LA APLICACION */
const IMAGES_PATH = './images/';
const app = express();
app.use(cors());
app.use(express.json());
// La carpeta de las imágenes se sirve estáticamente (http://localhost:8081/xxxxxxxx.jpg)
app.use(express.static(IMAGES_PATH))

//*** INICIO DE LA BASE DE DATOS */
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'retrocomputers.db'
    },
    useNullAsDefault: true
});
// defininimos un nombre del fichero unico para guardarlo en images, para evitar conflictos
// entre las imagenes que puedan subir lo s usuarios 
const multerStorage = multer.diskStorage({
    destination: IMAGES_PATH,
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1000);
        const extension = file.mimetype.slice(file.mimetype.indexOf('/') + 1);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
    }
});
const upload = multer({storage: multerStorage});

// Productos CRUD
//*
// atencion, siempre todas los registros van por defecto, lo que no va por defecto son los campos
//si pongo * van todos los campos de cada registro
app.get('/products', async (req, res) => {
    const products = await db('products').select('*');
    res.status(200).json(products);
//esto ultimo devuelve una doble informacion al mismo tiempo, por un lado
//el status 200, es decir todo correcto y por otro el fichero jason con todos los datos    
});


app.get('/products/:id_product', async (req, res) => {
    const product = await db('products').select('*').where({ id_product: req.params.id_product }).first();
    res.status(200).json(product);
//Nota con el first, lo que me aseguro es que devuelve un listado con un producto unicamente
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
    res.status(201).json();
});
// Atencion, no pongo el id_product para modificar, es la clave
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


//Delete
app.delete('/products/:id_product', async (req, res) => {

        const idProduct = req.params.id_product;
        await db('products').del().where({id_product: idProduct});

        res.status(204).json({})
});

// Subida al servidor de las imagenes
app.post('/images', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: 'No image provided'
        });
    }
    let nombreFicheroAux = req.file.filename;
    return res.json(nombreFicheroAux);
});

//Proveedores CRUD
app.get('/suppliers', async (req, res) => {
    const suppliers = await db('suppliers').select('*');
    res.status(200).json(suppliers);    
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

//Users CRUD
app.get('/users', async (req, res) => {
    const users = await db('users').select('*');
    res.status(200).json(users);    
});

app.get('/users/:username', async (req, res) => {
    const user = await db('users').select('*').where({ username: req.params.username }).first();
    res.status(200).json(user);
});


app.delete('/users/:id_user', async (req, res) => {

    const idUser = req.params.id_user;
    await db('users').del().where({id_user: idUser});

    res.status(204).json({})
});

app.post('/users', async (req, res) => {
    await db('users').insert({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        tel: req.body.tel,
        address: req.body.address,
        zip_code: req.body.zip_code,
        city: req.body.city,
        country: req.body.country
    });

    res.status(201).json({});
});

app.put('/users/:id_user', async (req, res) => {
    await db('users').where({ id_user: req.params.id_user }).update({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        tel: req.body.tel,
        address: req.body.address,
        zip_code: req.body.zip_code,
        city: req.body.city,
        country: req.body.country
    });

    res.status(204).json({});
});

// Mensaje de inicio del Backend
app.listen(8081, () => {
    console.log('El backend ha iniciado en el puerto 8081');
});