//***CARGO DE LIBRERIAS */
const express = require('express');
const cors = require('cors');
const multer = require('multer');
//rutas
const products = require('./route/products');
const suppliers = require('./route/suppliers');
const users = require('./route/users');

//*** INICIO DE LA APLICACION */
const IMAGES_PATH = './images/';
const app = express();
app.use(cors());
app.use(express.json());
// La carpeta de las imágenes se sirve estáticamente (http://localhost:8081/xxxxxxxx.jpg)
app.use(express.static(IMAGES_PATH))

//USO de todas las operaciones
app.use('/', products);
app.use('/', suppliers);
app.use('/', users);

// Generacion del nombre de fichero para de subida de imagenes 
const multerStorage = multer.diskStorage({
    destination: IMAGES_PATH,
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1000);
        const extension = file.mimetype.slice(file.mimetype.indexOf('/') + 1);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
    }
});
const upload = multer({storage: multerStorage});

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


//Users CRUD
// app.get('/users', async (req, res) => {
//     const users = await db('users').select('*');
//     res.status(200).json(users);    
// });

// app.get('/users/:username', async (req, res) => {
//     const user = await db('users').select('*').where({ username: req.params.username }).first();
//     res.status(200).json(user);
// });


// app.delete('/users/:id_user', async (req, res) => {

//     const idUser = req.params.id_user;
//     await db('users').del().where({id_user: idUser});

//     res.status(204).json({})
// });

// app.post('/users', async (req, res) => {
//     await db('users').insert({
//         name: req.body.name,
//         username: req.body.username,
//         password: req.body.password,
//         role: req.body.role,
//         tel: req.body.tel,
//         address: req.body.address,
//         zip_code: req.body.zip_code,
//         city: req.body.city,
//         country: req.body.country
//     });

//     res.status(201).json({});
// });

// app.put('/users/:id_user', async (req, res) => {
//     await db('users').where({ id_user: req.params.id_user }).update({
//         name: req.body.name,
//         username: req.body.username,
//         password: req.body.password,
//         role: req.body.role,
//         tel: req.body.tel,
//         address: req.body.address,
//         zip_code: req.body.zip_code,
//         city: req.body.city,
//         country: req.body.country
//     });

//     res.status(204).json({});
// });

// Mensaje de inicio del Backend
app.listen(8081, () => {
    console.log('El backend ha iniciado en el puerto 8081');
});
module.exports =  { app };