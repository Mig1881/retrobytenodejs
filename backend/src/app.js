//***CARGO DE LIBRERIAS */
const express = require('express');
const cors = require('cors');
const multer = require('multer');
//rutas
const products = require('./route/products');
const suppliers = require('./route/suppliers');
const users = require('./route/users');
const { config } = require('./config/configuration');
const promClient = require('prom-client');
const { httpRequestDurationSeconds, httpRequestsTotal, inFlightRequests } = require('./config/metrics');

//*** INICIO DE LA APLICACION */
const IMAGES_PATH = './images/';
const app = express();
app.use(cors());
app.use(express.json());
// La carpeta de las imágenes se sirve estáticamente (http://localhost:8081/xxxxxxxx.jpg)
app.use(express.static(IMAGES_PATH))

// Recoge métricas por defecto
promClient.collectDefaultMetrics();
// Recoger las métricas configuradas en config/metrics
app.use((req, res, next) => {
    // Anota la request en vuelo
    inFlightRequests.inc();

    // Inicia un timer para comenzar a calcular la duración de la request
    const end = httpRequestDurationSeconds.startTimer();

    const method = req.method;
    const path = req.route ? req.route.path : req.path; 

    // Cada vez que una request termina, se recogen las métricas configuradas
    res.on('finish', () => {
        const statusCode = res.statusCode;

        // Captura la duración de la petición
        end({ method, path, code: statusCode }); 
        // Incrementa el contador de peticiones HTTP
        httpRequestsTotal.inc({
            code: statusCode,
            method: method.toLowerCase(),
            path: path
        });

        // Decrementa el contador de peticiones en vuelo
        inFlightRequests.dec();
    });

    next();
});

// Define el endpoint que usará prometheus para recoger las métricas
app.get('/metrics', async(req, res) => {
    try {
        res.set('Content-Type', promClient.register.contentType);
        res.end(await promClient.register.metrics());
    } catch (error) {
        res.status(500).end(error);
    }
});

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