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
const findUsers = (async () => {
    const result = await db('users').select('*');

    return result;
});


//Users por su username
const findUser = (async (username) => {
    const result = await db('users').select('*').where({username: username}).first();

    return result;
});



const registerUser = (async (name, username, password, role, tel, address, zip_code, city, country) => {


    const returning = await db('users').insert({
        name: name,
        username: username,
        password: password,
        role: role,
        tel: tel,
        address: address,
        zip_code: zip_code,
        city : city,
        country: country
    })
    .then(async (ids) => {
         userId = ids[0];
     });

     const result = {
         id: userId,
     };
    
     return result;
});

const modifyUser = (async (id_user, name, password, role, tel, address, zip_code, city, country) => {
    //
    return await db('users').where({ id_user: id_user }).update({
        name: name,
        password: password,
        role: role,
        tel: tel,
        address: address,
        zip_code: zip_code,
        city : city,
        country: country
    });
});

const removeUser = (async (id_user) => {
    return await db('users').del().where({id_user: id_user});
});

module.exports = {
    findUsers,
    findUser,
    registerUser,
    modifyUser,
    removeUser
};