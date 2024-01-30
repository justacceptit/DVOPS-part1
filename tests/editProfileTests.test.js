const { describe, it } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;

const { editProfile } = require('../utils/EditProfile');


describe('Testing Edit features', () => {
    const resourcesFilePath = 'utils/users.json';
    var orgContent = "";
    beforeEach(async () => {
        orgContent = await fs.readFile(resourcesFilePath, 'utf8');
        orgContent = JSON.parse(orgContent);
        
    });
    afterEach(async () => {
      
        await fs.writeFile(resourcesFilePath, JSON.stringify(orgContent), 'utf8');
    });
  
  
  
            it('Should edit profile successfully', async () => {
                const req = {
                body: {
                    name:"testone",
                    password:"112345",
                    level:"1",
                    time_in:"",
                    date:"27/11/2023"
                }
                };
               
                const res = {
                    status: (code) => ({
                      json: (data) => {
                        expect(code).to.equal(201);
                        expect(data).to.eql({ message: 'Profile modified successfully!' });
                      },
                    }),
                  };
                await editProfile(req, res);
            });
            
            it('Password length too short ', async () => {
                const req = {
                body: {
                    name:"testone",
                    password:"123",
                    level:"1",
                    time_in:"",
                    date:"27/11/2023"
                }
                };
               
                const res = {
                    status: (code) => ({
                      json: (data) => {
                        expect(code).to.equal(500);
                        expect(data).to.eql({ message: 'Password legth too short' });
                      },
                    }),
                  };
                await editProfile(req, res);
                });
                
                it('Missing name ', async () => {
                    const req = {
                    body: {
                        name:"dont t",
                        password:"123",
                        level:"1",
                        time_in:"",
                        date:"27/11/2023"
                    }
                    };
                   
                    const res = {
                        status: (code) => ({
                          json: (data) => {
                            expect(code).to.equal(500);
                          
                          },
                        }),
                      };
                    await editProfile(req, res);
                    }); 


});