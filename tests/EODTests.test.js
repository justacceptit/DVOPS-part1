const { describe, it } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;
const { EndOfDay } = require('../utils/EndOfDay');
const { getProfile } = require('../utils/GetProfile');
const { readJSON,writeJSON } = require('../utils/UserUtil');
const { editProfile } = require('../utils/EditProfile');


describe('Testing EOD features', () => {
    const resourcesFilePath = 'utils/users.json';
    var orgContent = "";
    beforeEach(async () => {
        orgContent = await fs.readFile(resourcesFilePath, 'utf8');
        orgContent = JSON.parse(orgContent);
    });
    afterEach(async () => {
        await fs.writeFile(resourcesFilePath, JSON.stringify(orgContent), 'utf8');
    });
  
  
   it('Should not be able to add profile to eod.json due to incorrect date', async () => {
        const req = {
            body: {
                id:"213",
                name: "namee",
                password: "123456",
                level: "1",
                time_in: "8:29:35 pm",
                date: "26/11/2023"
            },
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(500);
                return this;
            },
            json: function (data) {
                expect(data.message).to.not.equal(undefined);
            },
        };
        await EndOfDay(req, res);
    });

 
    
   
      
        it('should write to eod.json if date is equal to today', async () => {
          
          const res = {
            status: (statusCode) => ({
              json: function(data)  {
                expect(statusCode).to.equal(201);
                
              },
            }),
          };
      
          
          await EndOfDay(null, res);
        })
});
