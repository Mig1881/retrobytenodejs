const httpMocks = require('node-mocks-http');
const { describe, it, expect, afterEach } = require('@jest/globals');

jest.mock('../../service/users');

const userController = require('../../controller/users');

const userService = require('../../service/users');
const mockedFindUsers = jest.spyOn(userService, 'findUsers');
const mockedFindUser = jest.spyOn(userService, 'findUser');
const mockedRegisterUser = jest.spyOn(userService, 'registerUser');
const mockedModifyUser = jest.spyOn(userService, 'modifyUser');
const mockedRemoveUser = jest.spyOn(userService, 'removeUser');

const { mockUserArray, mockUserResponse, mockUserToRegister,mockUserToUpdate, mockUserOneSingleUserResponse,mockUserResponseDelete } = require('./mocks/users');

afterEach(() => {
    jest.clearAllMocks();
});

describe('users', () => {
    it('GET /users should get a user list', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/users';

        const mockedUserList = jest.fn(async () => {
            return mockUserArray;
        });
        mockedFindUsers.mockImplementation(mockedUserList);

        await userController.getUsers(request, response);
        expect(mockedFindUsers).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(200);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().length).toEqual(5);
    });

     it('GET /users should get a single user by username', async () => {
         const response = httpMocks.createResponse();
        //  const request = httpMocks.createRequest(); No sirve en esta peticion
         const request = httpMocks.createRequest({
            method: 'GET',
            url: '/users/mig1881', // Simula la petición con username que es UNIQUE
            params: { username: 'mig1881' }, // Simula el parámetro de la ruta
          });
         request.app = {};
         request.app.conf = {};
         request.path = '/users/:username';

         const mockedOneUser = jest.fn(async () => {
             return mockUserOneSingleUserResponse;
         });
         mockedFindUser.mockImplementation(mockedOneUser);

         await userController.getUser(request, response);
         expect(mockedFindUser).toHaveBeenCalledTimes(1);
         expect(response.statusCode).toEqual(200);
         expect(response._isEndCalled()).toBeTruthy();
         expect(response._getJSONData().name).toEqual('Miguel Angel');
     });

   
    it('POST /users should register a new user', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/users';
        request.body = mockUserToRegister;

        const mockedRegisterUserResponse = jest.fn(async () => {
            return mockUserResponse;
        });
        mockedRegisterUser.mockImplementation(mockedRegisterUserResponse);

        await userController.postUser(request, response);
        expect(mockedRegisterUser).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(201);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().name).toEqual('Montse');
        expect(response._getJSONData().username).toEqual('montse28');
        expect(response._getJSONData().password).toEqual('m');
        expect(response._getJSONData().role).toEqual('admin');
        expect(response._getJSONData().tel).toEqual('+34607607628');
        expect(response._getJSONData().address).toEqual('Calle Tar, 28');
        expect(response._getJSONData().zip_code).toEqual('50500');
        expect(response._getJSONData().city).toEqual('Tarazona');
        expect(response._getJSONData().country).toEqual('España');
        
    });
    
    it('PUT /users should modify a user', async () => {
        const response = httpMocks.createResponse();
        // const request = httpMocks.createRequest();
        const request = httpMocks.createRequest({
            method: 'PUT',
            url: '/users/1', 
            params: { id_user: '1' },
          });
        request.app = {};
        request.app.conf = {};
        request.path = '/users/:id_user';
        request.body = mockUserToUpdate;

        const mockedRegisterUserResponse = jest.fn(async () => {
            return mockUserResponse;
        });
        mockedModifyUser.mockImplementation(mockedRegisterUserResponse);

        await userController.putUser(request, response);
        expect(mockedModifyUser).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(204);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().name).toEqual('Montse');
        expect(response._getJSONData().password).toEqual('m');
        expect(response._getJSONData().role).toEqual('admin');
        expect(response._getJSONData().tel).toEqual('+34607607628');
        expect(response._getJSONData().address).toEqual('Calle Tar, 28');
        expect(response._getJSONData().zip_code).toEqual('50500');
        expect(response._getJSONData().city).toEqual('Tarazona');
        expect(response._getJSONData().country).toEqual('España');
    });

    it('DELETE /user should delete a single user', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest({
           method: 'DELETE',
           url: '/users/1', 
           params: { id_user: '1' }, 
         });
        request.app = {};
        request.app.conf = {};
        request.path = '/users/:id_user';

        const mockedOneUser = jest.fn(async () => {
             return mockUserResponseDelete;
         });
        mockedRemoveUser.mockImplementation(mockedOneUser);

        await userController.deleteUser(request, response);
        expect(mockedRemoveUser).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(204);
        expect(response._isEndCalled()).toBeTruthy();

    });

});