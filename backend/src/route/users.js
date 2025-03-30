/*
Route USERS
*/
const express = require('express');
const { getUsers, getUser, postUser, putUser, deleteUser } = require('../controller/users');
const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:username', getUser);
router.post('/users', postUser);
router.put('/users/:id_user', putUser);
router.delete('/users/:id_user', deleteUser);

module.exports = router;