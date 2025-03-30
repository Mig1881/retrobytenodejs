const { findUsers, findUser, registerUser, modifyUser, removeUser } = require("../service/users");


const getUsers = (async (req, res) => {
    const UserList = await findUsers();

    res.status(200).json(UserList);
});

const getUser = (async (req, res) => {
    const user = await findUser(req.params.username);

    if (user === undefined) {
        res.status(404).json({
            status: 'not-found',
            message: 'User not found'
        });
        return;
    }

    res.status(200).json(user);
});

const postUser = (async (req, res) => {
    //VALIDACIONES
    if (req.body.name === undefined || req.body.name === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'User name field is mandatory'
        });
        return;
    }

    if (req.body.username === undefined || req.body.username === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'username field is mandatory'
        });
        return;
    }

    if (req.body.password === undefined || req.body.password === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'password field is mandatory'
        });
        return;
    }

    if (req.body.role === undefined || req.body.role === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'role field is mandatory'
        });
        return;
    }


    if (req.body.tel === undefined || req.body.tel === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'tel field is mandatory'
        });
        return;
    }

    if (req.body.address === undefined || req.body.address === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'address field is mandatory'
        });
        return;
    }

    if (req.body.zip_code === undefined || req.body.zip_code === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'zip_code field is mandatory'
        });
        return;
    }

    if (req.body.city === undefined || req.body.city === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'city field is mandatory'
        });
        return;
    }
   
    if  (req.body.country === undefined || req.body.country === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'country is an obliglatory field'
        });
        return;
    }

    const result = await registerUser(req.body.name, req.body.username, req.body.password, req.body.role, req.body.tel,req.body.address,req.body.zip_code,req.body.city,req.body.country);
       
    res.status(201).json({
        // id: req.body.id_supplier,
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
});

const putUser = (async (req, res) => {
    await modifyUser(req.params.id_user,req.body.name, req.body.password, req.body.role, req.body.tel,req.body.address,req.body.zip_code,req.body.city,req.body.country);

    res.status(204).json({});
});

const deleteUser = (async (req, res) => {
    
    await removeUser(req.params.id_user);
    
    res.status(204).json({})
});

module.exports = {
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser
};
