const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../app').app;

chai.use(chaiHttp);
chai.should();

describe('users', () => {
    describe('GET /users', () => {
        it('should get all users', (done) => {
            chai.request(app)
                .get('/users')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    expect(response.body[0]).to.have.property('name');
                    expect(response.body[0]).to.have.property('username');
                    expect(response.body[0]).to.have.property('password');
                    expect(response.body[0]).to.have.property('role');
                    expect(response.body[0]).to.have.property('tel');
                    expect(response.body[0]).to.have.property('address');
                    expect(response.body[0]).to.have.property('zip_code');
                    expect(response.body[0]).to.have.property('city');
                    expect(response.body[0]).to.have.property('country');
                    expect(response.body[0].username).to.equal('mig1881');
                    done();
                });
        });
    });

    describe('GET /users/:username', () => {
        it('should get one supplier with username = mig1881', (done) => {
          chai.request(app)
            .get('/users/mig1881') 
            .end((error, response) => {
              response.should.have.status(200);
              expect(response.body.name).to.equal('Miguel Angel');
              done();
            });
        });
    
      
         it('validation should fail because this username is not found', (done) => {
             chai.request(app)
                 .get('/users/mig1882')
                 .end((error, response) => {
                     response.should.have.status(404);
                     expect(response.body.status).to.equal('not-found');
                     expect(response.body.message).to.equal('User not found');
                     done();
                 });
         });
     });

    describe('POST /users', () => {
         it('should register a new user', (done) => {
             chai.request(app)
                 .post('/users')
                 .send({
                     name: 'pepe',
                     username: 'pepe24',   
                     password :'p',
                     role: 'user',
                     tel: '13131313',
                     address: 'Calle de la pineda 13',
                     zip_code: "13700",
                     city: 'Tarragona',
                     country: 'España'
                 })
                 .end((error, response) => {
                     response.should.have.status(201);
                     expect(response.body).to.have.property('id_user');
                     expect(response.body).to.have.property('name');
                     expect(response.body).to.have.property('username');
                     expect(response.body).to.have.property('password');
                     expect(response.body).to.have.property('role');
                     expect(response.body).to.have.property('tel');
                     expect(response.body).to.have.property('address');
                     expect(response.body).to.have.property('zip_code');
                     expect(response.body).to.have.property('city');
                     expect(response.body).to.have.property('country');
                     
                     done();
                 });
         });

        it('validation should fail because name is mandatory', (done) => {
            chai.request(app)
                .post('/users')
                .send({
                    username: 'pepe25',   
                    password :'p',
                    role: 'user',
                    tel: '155555555',
                    address: 'Calle de la pineda 13',
                    zip_code: "13700",
                    city: 'Tarragona',
                    country: 'España'
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body.status).to.equal('bad-request');
                    expect(response.body.message).to.equal('name field is mandatory');
                    done();
                });
        });
    });

    describe('PUT/users/:id_user', () => {
        it('should modify a user', (done) => {
            chai.request(app)
                .put('/users/6')
                .send({
                    name: 'Juan R',   
                    password :'j',
                    role: 'admin',
                    tel: '18181818',
                    address: 'Calle de la Ilustracion 18',
                    zip_code: "50012",
                    city: 'Zaragoza',
                    country: 'España'
                })
                .end((error, response) => {
                    response.should.have.status(204);
                   
                    done();
                });
        });

       it('validation should fail because city is mandatory', (done) => {
           chai.request(app)
               .put('/users/2')
               .send({
                    name: 'Juan R',   
                    password :'j',
                    role: 'admin',
                    tel: '18181818',
                    address: 'Calle de la Ilustracion 18',
                    zip_code: "50012",
                    country: 'España'
               })
               .end((error, response) => {
                   response.should.have.status(400);
                   expect(response.body.status).to.equal('bad-request');
                   expect(response.body.message).to.equal('city field is mandatory');
                   done();
               });
       });
   });

   describe('DELETE/users/:id_user=9', () => {
    // AQUI Descomentar 
    //  it('should delete user with id_user = 3', (done) => {
    //    chai.request(app)
    //      .delete('/users/12') 
    //      .end((error, response) => {
    //        response.should.have.status(204);
    //        done();
    //      });
    //  });

  
      it('validation should fail because this user is not a valid number', (done) => {
          chai.request(app)
              .delete('/users/hgdfhdg')
              .end((error, response) => {
                response.should.have.status(400);
                expect(response.body.status).to.equal('bad-request');
                expect(response.body.message).to.equal('UserId is not a valid number');
                done();
              });
      });
      it('validation should fail because this user is not found', (done) => {
        chai.request(app)
            .delete('/users/989898')
            .end((error, response) => {
              response.should.have.status(404);
              expect(response.body.status).to.equal('not-found');
              expect(response.body.message).to.equal('user not found');
              done();
            });
    });
 });

});