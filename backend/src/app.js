//***CARGO DE LIBRERIAS */
const express = require('express');
const cors = require('cors');
const multer = require('multer');
//rutas
const products = require('./route/products');
const suppliers = require('./route/suppliers');
const users = require('./route/users');
const { config } = require('./config/configuration');

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


// Mensaje de inicio del Backend
app.listen(config.service.port, () => {
    console.log('Iniciando el backend en el puerto ' + config.service.port);
});
module.exports =  { app };