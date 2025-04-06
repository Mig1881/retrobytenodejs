const expect = require('chai').expect;
const { getProducts,getProduct,postProduct,putProduct,deleteProduct} = require('../../controller/products');
// ruta, subo dos niveles y entro en la capa controller/products
// userController.test.js

// describe('products', () => {
//   it('debería devolver un productos', () => {
//     const proReq = { id: 1, name: 'John Doe' };
//     const proRes = {
//       json: jest.fn(),
//     };

//     getProducts(proReq, proRes);

//     expect(proRes.json).toHaveBeenCalledWith([
//       { id: 1, name: 'John Doe' }
//     ]);
//   });
// });