const httpMocks = require('node-mocks-http');
const { describe, it, expect, afterEach } = require('@jest/globals');

jest.mock('../../service/suppliers');

const supplierController = require('../../controller/suppliers');

const supplierService = require('../../service/suppliers');
const mockedFindSuppliers = jest.spyOn(supplierService, 'findSuppliers');
const mockedFindSupplier = jest.spyOn(supplierService, 'findSupplier');
const mockedRegisterSupplier = jest.spyOn(supplierService, 'registerSupplier');
const mockedModifySupplier = jest.spyOn(supplierService, 'modifySupplier');
const mockedRemoveSupplier = jest.spyOn(supplierService, 'removeSupplier');

const { mockSupplierArray, mockSupplierResponse, mockSupplierToRegister,mockSupplierToUpdate, mockSupplierOneSingleSupplierResponse,mockSupplierResponseDelete } = require('./mocks/suppliers');

afterEach(() => {
    jest.clearAllMocks();
});

describe('suppliers', () => {
    it('GET /suppliers should get a supplier list', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/suppliers';

        const mockedSupplierList = jest.fn(async () => {
            return mockSupplierArray;
        });
        mockedFindSuppliers.mockImplementation(mockedSupplierList);

        await supplierController.getSuppliers(request, response);
        expect(mockedFindSuppliers).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(200);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().length).toEqual(5);
    });

     it('GET /suppliers should get a single supplier', async () => {
         const response = httpMocks.createResponse();
        //  const request = httpMocks.createRequest(); No sirve en esta peticion
         const request = httpMocks.createRequest({
            method: 'GET',
            url: '/suppliers/1', // Simula la petición con un ID
            params: { id_supplier: '1' }, // Simula el parámetro de la ruta
          });
         request.app = {};
         request.app.conf = {};
         request.path = '/suppliers/:id_supplier';

         const mockedOneSupplier = jest.fn(async () => {
             return mockSupplierOneSingleSupplierResponse;
         });
         mockedFindSupplier.mockImplementation(mockedOneSupplier);

         await supplierController.getSupplier(request, response);
         expect(mockedFindSupplier).toHaveBeenCalledTimes(1);
         expect(response.statusCode).toEqual(200);
         expect(response._isEndCalled()).toBeTruthy();
         expect(response._getJSONData().name).toEqual('RetroPC');
     });

   
    it('POST /suppliers should register a new supplier', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/suppliers';
        request.body = mockSupplierToRegister;

        const mockedRegisterSupplierResponse = jest.fn(async () => {
            return mockSupplierResponse;
        });
        mockedRegisterSupplier.mockImplementation(mockedRegisterSupplierResponse);

        await supplierController.postSupplier(request, response);
        expect(mockedRegisterSupplier).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(201);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().name).toEqual('Retro8bits');
        expect(response._getJSONData().tel).toEqual('+34123456789');
        expect(response._getJSONData().address).toEqual('Calle Mayor, 18');
        expect(response._getJSONData().zip_code).toEqual('22700');
        expect(response._getJSONData().city).toEqual('Jaca');
        expect(response._getJSONData().country).toEqual('España');
        expect(response._getJSONData().website).toEqual('retro8bits.es');
        expect(response._getJSONData().email).toEqual('retro8bits@gmail.com');
        
    });
    
    it('PUT /suppliers should modify a supplier', async () => {
        const response = httpMocks.createResponse();
        // const request = httpMocks.createRequest();
        const request = httpMocks.createRequest({
            method: 'PUT',
            url: '/suppliers/1', 
            params: { id_supplier: '1' },
          });
        request.app = {};
        request.app.conf = {};
        request.path = '/suppliers/:id_supplier';
        request.body = mockSupplierToUpdate;

        const mockedRegisterSupplierResponse = jest.fn(async () => {
            return mockSupplierResponse;
        });
        mockedModifySupplier.mockImplementation(mockedRegisterSupplierResponse);

        await supplierController.putSupplier(request, response);
        expect(mockedModifySupplier).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(204);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().name).toEqual('Retro8bits');
        expect(response._getJSONData().tel).toEqual('+34123456789');
        expect(response._getJSONData().address).toEqual('Calle Mayor, 18');
        expect(response._getJSONData().zip_code).toEqual('22700');
        expect(response._getJSONData().city).toEqual('Jaca');
        expect(response._getJSONData().country).toEqual('España');
        expect(response._getJSONData().website).toEqual('retro8bits.es');
        expect(response._getJSONData().email).toEqual('retro8bits@gmail.com');
    });

    it('DELETE /supplier should delete a single supplier', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest({
           method: 'DELETE',
           url: '/suppliers/1', 
           params: { id_supplier: '1' }, 
         });
        request.app = {};
        request.app.conf = {};
        request.path = '/suppliers/:id_supplier';

        const mockedOneSupplier = jest.fn(async () => {
             return mockSupplierResponseDelete;
         });
        mockedRemoveSupplier.mockImplementation(mockedOneSupplier);

        await supplierController.deleteSupplier(request, response);
        expect(mockedRemoveSupplier).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(204);
        expect(response._isEndCalled()).toBeTruthy();

    });

});