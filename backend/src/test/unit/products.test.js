const httpMocks = require('node-mocks-http');
const { describe, it, expect, afterEach } = require('@jest/globals');

jest.mock('../../service/products');

const productController = require('../../controller/products');

const productService = require('../../service/products');
const mockedFindProducts = jest.spyOn(productService, 'findProducts');
const mockedFindProduct = jest.spyOn(productService, 'findProduct');
const mockedRegisterProduct = jest.spyOn(productService, 'registerProduct');
const mockedModifyProduct = jest.spyOn(productService, 'modifyProduct');
const mockedRemoveProduct = jest.spyOn(productService, 'removeProduct');

const { mockProductArray, mockProductResponse, mockProductToRegister,mockProductToUpdate, mockProductOneSingleProductResponse,mockProductResponseDelete } = require('./mocks/products');

afterEach(() => {
    jest.clearAllMocks();
});

describe('products', () => {
    it('GET /products should get a product list', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/products';

        const mockedProductList = jest.fn(async () => {
            return mockProductArray;
        });
        mockedFindProducts.mockImplementation(mockedProductList);

        await productController.getProducts(request, response);
        expect(mockedFindProducts).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(200);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().length).toEqual(5);
    });

     it('GET /products should get a single product', async () => {
         const response = httpMocks.createResponse();
        //  const request = httpMocks.createRequest(); No sirve en esta peticion
         const request = httpMocks.createRequest({
            method: 'GET',
            url: '/products/1', // Simula la petición con un ID
            params: { id_product: '1' }, // Simula el parámetro de la ruta
          });
         request.app = {};
         request.app.conf = {};
         request.path = '/products/:id_product';

         const mockedOneProduct = jest.fn(async () => {
             return mockProductOneSingleProductResponse;
         });
         mockedFindProduct.mockImplementation(mockedOneProduct);

         await productController.getProduct(request, response);
         expect(mockedFindProduct).toHaveBeenCalledTimes(1);
         expect(response.statusCode).toEqual(200);
         expect(response._isEndCalled()).toBeTruthy();
         expect(response._getJSONData().product_name).toEqual('Commodore 64');
     });

   
    it('POST /products should register a new product', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/products';
        request.body = mockProductToRegister;

        const mockedRegisterProductResponse = jest.fn(async () => {
            return mockProductResponse;
        });
        mockedRegisterProduct.mockImplementation(mockedRegisterProductResponse);

        await productController.postProduct(request, response);
        expect(mockedRegisterProduct).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(201);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().product_name).toEqual('Atari ST');
        expect(response._getJSONData().description).toEqual('The second best 16 bit computer');
        expect(response._getJSONData().sale_price).toEqual(89);
        expect(response._getJSONData().stock_units).toEqual(1);
        expect(response._getJSONData().image).toEqual('no_image.jpg');
        expect(response._getJSONData().release_date).toEqual('1988-10-09T22:00:00.000Z');
        expect(response._getJSONData().product_status).toEqual('Impecable');
        expect(response._getJSONData().id_supplier).toEqual(2);
    });
    
    it('PUT /products should modify a product', async () => {
        const response = httpMocks.createResponse();
        // const request = httpMocks.createRequest();
        const request = httpMocks.createRequest({
            method: 'PUT',
            url: '/products/1', 
            params: { id_product: '1' },
          });
        request.app = {};
        request.app.conf = {};
        request.path = '/products/:id_product';
        request.body = mockProductToUpdate;

        const mockedRegisterProductResponse = jest.fn(async () => {
            return mockProductResponse;
        });
        mockedModifyProduct.mockImplementation(mockedRegisterProductResponse);

        await productController.putProduct(request, response);
        expect(mockedModifyProduct).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(204);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().product_name).toEqual('Atari ST');
        expect(response._getJSONData().description).toEqual('The second best 16 bit computer');
        expect(response._getJSONData().sale_price).toEqual(89);
        expect(response._getJSONData().stock_units).toEqual(1);
        expect(response._getJSONData().image).toEqual('no_image.jpg');
        expect(response._getJSONData().release_date).toEqual('1988-10-09T22:00:00.000Z');
        expect(response._getJSONData().product_status).toEqual('Impecable');
        expect(response._getJSONData().id_supplier).toEqual(2);
    });

    it('DELETE /product should delete a single product', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest({
           method: 'DELETE',
           url: '/products/1', 
           params: { id_product: '1' }, 
         });
        request.app = {};
        request.app.conf = {};
        request.path = '/products/:id_product';

        const mockedOneProduct = jest.fn(async () => {
             return mockProductResponseDelete;
         });
        mockedRemoveProduct.mockImplementation(mockedOneProduct);

        await productController.deleteProduct(request, response);
        expect(mockedRemoveProduct).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(204);
        expect(response._isEndCalled()).toBeTruthy();

    });

});