const knex = require('knex');

// importanmos esta nueva libreria para tener las configuraciones mecanizadas
// AQUI poner esto linea cuando este mecanizado
// const { config } = require('../config/configuration');
//hasta AQUI



// Configuración de la base de datos: tipo, ubicación y otros parámetros
//EL SERVICE ES EL UNICO QUE TIENE ACCESO A LA BASE DE DATOS
/*  
Esta seria la configuracion de SQLite, habria que poner su correspondiente
dependencia en package.json====>   "sqlite3": "^5.1.7",
*/
 const db = knex({
     client: 'sqlite3',
     connection: {
         filename: 'retrocomputers.db'
     },
     useNullAsDefault: true
 });

// esta segunda parte era cuando conectabamos con un contenedor en pruebas con mariaDb

// const db = knex({
//     client: 'mysql',
//     connection: {
//         host: 'localhost',
//         port: 3306,
//         user: 'user',
//         password: 'password',
//         database: 'cities'
//     },
//     useNullAsDefault: true
// });

// Esta tercera es cuando lo mecanizamos todo, esta es la que se quedara

// const db = knex({
//     client: 'mysql',
//     connection: {
//         host: config.db.host,
//         port: config.db.port,
//         user: config.db.user,
//         password: config.db.password,
//         database: config.db.database
//     },
//     useNullAsDefault: true
// });

// ESTA CAPA YA ES LA DE COMUNICACION CON LA BASE DE DATOS
const findProducts = (async () => {
    const result = await db('products').select('*');

    return result;
});


//Products por su id_product
const findProduct = (async (id_product) => {
    const result = await db('products').select('*').where({id_product: id_product}).first();

    return result;
});



const registerProduct = (async (product_name, description, sale_price, stock_units, image, release_date, product_status,id_supplier) => {


    const returning = await db('products').insert({
        product_name: product_name,
        description: description,
        sale_price: sale_price,
        stock_units: stock_units,
        image : image,
        release_date: release_date,
        product_status: product_status,
        id_supplier: id_supplier
    });
    //OJO quita el punto y coma de aqui arriba cuando todo funcione
    // .then(async (ids) => {
    //     productId = ids[0];
    // });

    // const result = {
    //     id: productId,
    // };
    
    // return result;
});

const modifyProduct = (async (id_product, product_name, description, sale_price, stock_units, image, release_date, product_status,id_supplier) => {
    // 
    await db('products').where({ id_product: id_product }).update({
        product_name: product_name,
        description: description,
        sale_price: sale_price,
        stock_units: stock_units,
        image : image,
        release_date: release_date,
        product_status: product_status,
        id_supplier: id_supplier
    });
});

const removeProduct = (async (id_product) => {
    await db('products').del().where({id_product: id_product});
});

module.exports = {
    findProducts,
    findProduct,
    registerProduct,
    modifyProduct,
    removeProduct
};
