const { describe, it } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;
const { EndOfDay } = require('../utils/EndOfDay');
const sinon = require('sinon');

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
  
  
   
    it('should handle error when writing to eod.json fails', async () => {
      // Stub fs.writeFile to simulate an error
      const writeFileStub = sinon.stub(fs, 'writeFile').throws(new Error('Write error'));

      const req = {
          body: {
              // ... your request body for the test case ...
          },
      };
      const res = {
          status: function (code) {
              expect(code).to.equal(500);
              return this;
          },
          json: function (data) {
              expect(data).to.eql({ message: 'Write error' });
          },
      };

      try {
          await EndOfDay(req, res);
      } catch (error) {
          // Handle the error, if needed
      } finally {
          // Restore the original fs.writeFile function
          writeFileStub.restore();
      }
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
                //  expect(data.message).to.not.equal(undefined);
                  expect(data).to.eql({message:"no on has timed in"});
              },
          };
          await EndOfDay(req, res);
      });
  
});
