const knex = require('knex');

//  const db = knex({
//      client: 'sqlite3',
//      connection: {
//          filename: 'retrocomputers.db'
//      },
//      useNullAsDefault: true
//  });

 const db = knex({
      client: 'mysql',
      connection: {
          host: '127.0.0.1',
          port: 3306,
          user: 'mrubio9',
          password: 'mrubio9',
          database: 'tiendaonlineretrov5'
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
const findSuppliers = (async () => {
    const result = await db('suppliers').select('*');

    return result;
});


//Suppliers por su id_supplier
const findSupplier = (async (id_supplier) => {
    const result = await db('suppliers').select('*').where({id_supplier: id_supplier}).first();

    return result;
});



const registerSupplier = (async (name, tel, address, zip_code, city, country, website,email) => {


    const returning = await db('suppliers').insert({
        name: name,
        tel: tel,
        address: address,
        zip_code: zip_code,
        city : city,
        country: country,
        website: website,
        email: email
    })
     .then(async (ids) => {
         supplierId = ids[0];
     });

     const result = {
         id: supplierId,
     };
    
     return result;
});

const modifySupplier = (async (id_supplier, name, tel, address, zip_code, city, country, website,email) => {
    // 
    return await db('suppliers').where({ id_supplier: id_supplier }).update({
        name: name,
        tel: tel,
        address: address,
        zip_code: zip_code,
        city : city,
        country: country,
        website: website,
        email: email
    });
});

const removeSupplier = (async (id_supplier) => {
    return await db('suppliers').del().where({id_supplier: id_supplier});
});

module.exports = {
    findSuppliers,
    findSupplier,
    registerSupplier,
    modifySupplier,
    removeSupplier
};
