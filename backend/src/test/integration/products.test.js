const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../app').app;

chai.use(chaiHttp);
chai.should();

describe('products', () => {
    describe('GET /products', () => {
        it('should get all products', (done) => {
            chai.request(app)
                .get('/products')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    expect(response.body[0]).to.have.property('product_name');
                    expect(response.body[0]).to.have.property('description');
                    expect(response.body[0]).to.have.property('sale_price');
                    expect(response.body[0]).to.have.property('stock_units');
                    expect(response.body[0]).to.have.property('image');
                    expect(response.body[0]).to.have.property('release_date');
                    expect(response.body[0]).to.have.property('product_status');
                    expect(response.body[0]).to.have.property('id_supplier');
                    expect(response.body[0].product_name).to.equal('Commodore 64');
                    expect(response.body[1].product_name).to.equal('Spectrum');
                    done();
                });
        });
    });

    describe('GET /products/:id_product', () => {
        it('should get one product with id_product = 1', (done) => {
          chai.request(app)
            .get('/products/1') 
            .end((error, response) => {
              response.should.have.status(200);
              expect(response.body.product_name).to.equal('Commodore 64');
              done();
            });
        });
    
      
         it('validation should fail because this product is not found', (done) => {
             chai.request(app)
                 .get('/products/999998')
                 .end((error, response) => {
                     response.should.have.status(404);
                     expect(response.body.status).to.equal('not-found');
                     expect(response.body.message).to.equal('Product not found');
                     done();
                 });
         });
     });

    describe('POST /products', () => {
         it('should register a new product', (done) => {
             chai.request(app)
                 .post('/products')
                 .send({
                     product_name: 'Commodore Amiga 3000',
                     description: 'Propuesta seria de Amiga profesional',
                     sale_price: 299,
                     stock_units: 1,
                     image: 'no_image.jpg',
                     release_date: '1990-10-10',
                     product_status: 'Impecable',
                     id_supplier: 1
                 })
                 .end((error, response) => {
                     response.should.have.status(201);
                     expect(response.body).to.have.property('id_product');
                     expect(response.body).to.have.property('product_name');
                     expect(response.body).to.have.property('description');
                     expect(response.body).to.have.property('sale_price');
                     expect(response.body).to.have.property('stock_units');
                     expect(response.body).to.have.property('image');
                     expect(response.body).to.have.property('release_date');
                     expect(response.body).to.have.property('product_status');
                     expect(response.body).to.have.property('id_supplier');
                    
                     done();
                 });
         });

        it('validation should fail because product_name is mandatory', (done) => {
            chai.request(app)
                .post('/products')
                .send({
                    description: 'Propuesta seria de Amiga profesional',
                    sale_price: 299.99,
                    stock_units: 1,
                    image: 'no_image.jpg',
                    release_date: '1990-10-10',
                    product_status: 'Impecable',
                    id_supplier: 1
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body.status).to.equal('bad-request');
                    expect(response.body.message).to.equal('product_name field is mandatory');
                    done();
                });
        });

        it('validation should fail because sale_price must be greater than 0', (done) => {
            chai.request(app)
                .post('/products')
                .send({
                    product_name: 'Commodore Amiga 3000',
                    description: 'Propuesta seria de Amiga profesional',
                    sale_price: 0,
                    stock_units: 1,
                    image: 'no_image.jpg',
                    release_date: '1990-10-10',
                    product_status: 'Impecable',
                    id_supplier: 1
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body.status).to.equal('bad-request');
                    expect(response.body.message).to.equal('sale_price must be greater than 0');
                    done();
                });
        });
    });

    describe('PUT/products/:id_product', () => {
        it('should modify a product', (done) => {
            chai.request(app)
                .put('/products/2')
                .send({
                    id_product: 2,
                    product_name: 'Spectrum',
                    description: 'Mejora del teclado gomoso',
                    sale_price: 199,
                    stock_units: 1,
                    image: 'no_image.jpg',
                    release_date: '1985-10-10',
                    product_status: 'sin rozaduras',
                    id_supplier: 2
                })
                .end((error, response) => {
                    response.should.have.status(204);
                   
                    done();
                });
        });

       it('validation should fail because stock_units must not be smaller than 0', (done) => {
           chai.request(app)
               .put('/products/2')
               .send({
                    id_product: 2,
                    product_name: 'Spectrum',
                    description: 'Mejora del teclado gomoso',
                    sale_price: 199,
                    stock_units: -1,
                    image: 'no_image.jpg',
                    release_date: '1985-10-10',
                    product_status: 'sin rozaduras',
                    id_supplier: 2
               })
               .end((error, response) => {
                   response.should.have.status(400);
                   expect(response.body.status).to.equal('bad-request');
                   expect(response.body.message).to.equal('stock_units must not be smaller than 0');
                   done();
               });
       });
   });

   describe('DELETE/products/:id_product', () => {
    
     it('should delete product with id_product = 4', (done) => {
       chai.request(app)
         .delete('/products/4') 
         .end((error, response) => {
           response.should.have.status(204);
           done();
         });
     });

  
      it('validation should fail because this product is not a valid number', (done) => {
          chai.request(app)
              .delete('/products/hgdfhdg')
              .end((error, response) => {
                response.should.have.status(400);
                expect(response.body.status).to.equal('bad-request');
                expect(response.body.message).to.equal('ProductId is not a valid number');
                done();
              });
      });

      it('validation should fail because this product not found', (done) => {
        chai.request(app)
            .delete('/products/989898')
            .end((error, response) => {
              response.should.have.status(404);
              expect(response.body.status).to.equal('not-found');
              expect(response.body.message).to.equal('product not found');
              done();
            });
        });
 });

});

