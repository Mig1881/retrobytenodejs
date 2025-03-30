/*
Route lo utilizamos para definir..¿QUE OPERACIONES HAY EN MI API?
Const Router me va a permitir realizar las operaciones por separado 
*/
const express = require('express');
const { getProducts, getProduct, postProduct, putProduct, deleteProduct } = require('../controller/products');
const router = express.Router();

router.get('/products', getProducts);
//   OPERACION      , FUNCION
//
//esto se va rellenando en un tercer paso, primero se definen aqui las operaciones,
//segundo se definen las funciones en el controller, una vez definidas se vuelve
//aqui y se le asigna a cada operacion su funcion, el visual code automaticamente
//genera esta linea segun se les va asignando..
//const { getCities, getCity, postCity, putCity, deleteCity } = require('../controller/cities');

router.get('/products/:id_product', getProduct);
router.post('/products', postProduct);
router.put('/products/:id_product', putProduct);
router.delete('/products/:id_product', deleteProduct);

module.exports = router;
//los exportamos para poder utilizarlo desde fuera