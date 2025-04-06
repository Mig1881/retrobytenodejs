const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../app').app;

chai.use(chaiHttp);
chai.should();

describe('products', () => {
    describe('GET /suppliers', () => {
        it('should get all suppliers', (done) => {
            chai.request(app)
                .get('/suppliers')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    expect(response.body[0]).to.have.property('name');
                    expect(response.body[0]).to.have.property('tel');
                    expect(response.body[0]).to.have.property('address');
                    expect(response.body[0]).to.have.property('zip_code');
                    expect(response.body[0]).to.have.property('city');
                    expect(response.body[0]).to.have.property('country');
                    expect(response.body[0]).to.have.property('website');
                    expect(response.body[0]).to.have.property('email');
                    expect(response.body[0].name).to.equal('RetroPC');
                    done();
                });
        });
    });

    describe('GET /suppliers/:id_supplier', () => {
        it('should get one supplier with id_supplier = 1', (done) => {
          chai.request(app)
            .get('/suppliers/1') 
            .end((error, response) => {
              response.should.have.status(200);
              expect(response.body.name).to.equal('RetroPC');
              done();
            });
        });
    
      
         it('validation should fail because this product is not found', (done) => {
             chai.request(app)
                 .get('/suppliers/999998')
                 .end((error, response) => {
                     response.should.have.status(404);
                     expect(response.body.status).to.equal('not-found');
                     expect(response.body.message).to.equal('Supplier not found');
                     done();
                 });
         });
     });

    describe('POST /suppliers', () => {
         it('should register a new supplier', (done) => {
             chai.request(app)
                 .post('/suppliers')
                 .send({
                     name: 'Retro20bits',
                     tel: '888888888',
                     address: 'Calle de la Union Jaquesa 8',
                     zip_code: "22700",
                     city: 'Jaca',
                     country: 'España',
                     website: '8bit.com',
                     email: 'retro8bits@mail.es'
                 })
                 .end((error, response) => {
                     response.should.have.status(201);
                     expect(response.body).to.have.property('id_supplier');
                     expect(response.body).to.have.property('name');
                     expect(response.body).to.have.property('tel');
                     expect(response.body).to.have.property('address');
                     expect(response.body).to.have.property('zip_code');
                     expect(response.body).to.have.property('city');
                     expect(response.body).to.have.property('country');
                     expect(response.body).to.have.property('website');
                     expect(response.body).to.have.property('email');
                    
                     done();
                 });
         });

        it('validation should fail because name is mandatory', (done) => {
            chai.request(app)
                .post('/suppliers')
                .send({
                     tel: '888888888',
                     address: 'Calle de la Union Jaquesa 8',
                     zip_code: "22700",
                     city: 'Jaca',
                     country: 'España',
                     website: '8bit.com',
                     email: 'retro8bits@mail.es'
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body.status).to.equal('bad-request');
                    expect(response.body.message).to.equal('name field is mandatory');
                    done();
                });
        });
    });

    describe('PUT/suppliers/:id_supplier', () => {
        it('should modify a supplier', (done) => {
            chai.request(app)
                .put('/suppliers/2')
                .send({
                    id_supplier: 2,
                    name: 'Retro14Hidalgo',
                    tel: '22222222',
                    address: 'Calle de la Union Jaquesa 2',
                    zip_code: "22700",
                    city: 'Jaca',
                    country: 'España',
                    website: 'Hidalgo8.com',
                    email: 'retro8bitsHidalgo@mail.es'
                })
                .end((error, response) => {
                    response.should.have.status(204);
                   
                    done();
                });
        });

       it('validation should fail because email is mandatory', (done) => {
           chai.request(app)
               .put('/suppliers/2')
               .send({
                    id_supplier: 2,
                    name: 'Retro15Hidalgo',
                    tel: '22222222',
                    address: 'Calle de la Union Jaquesa 2',
                    zip_code: "22700",
                    city: 'Jaca',
                    country: 'España',
                    website: 'Hidalgo8.com'
               })
               .end((error, response) => {
                   response.should.have.status(400);
                   expect(response.body.status).to.equal('bad-request');
                   expect(response.body.message).to.equal('email is an obliglatory field');
                   done();
               });
       });
   });

   describe('DELETE/suppliers/:id_supplier=9', () => {
    // AQUI Descomentar 
    // it('should delete supplier with id_supplier = 4', (done) => {
    //   chai.request(app)
    //     .delete('/suppliers/4') // Modificamos la ruta para incluir el id_product
    //     .end((error, response) => {
    //       response.should.have.status(204);
    //       done();
    //     });
    // });

  
      it('validation should fail because this supplier is not a valid number', (done) => {
          chai.request(app)
              .delete('/suppliers/hgdfhdg')
              .end((error, response) => {
                response.should.have.status(400);
                expect(response.body.status).to.equal('bad-request');
                expect(response.body.message).to.equal('SupplierId is not a valid number');
                done();
              });
      });

      it('validation should fail because this supplier is not found', (done) => {
        chai.request(app)
            .delete('/suppliers/989898')
            .end((error, response) => {
              response.should.have.status(404);
              expect(response.body.status).to.equal('not-found');
              expect(response.body.message).to.equal('supplier not found');
              done();
            });
    });
 });

});