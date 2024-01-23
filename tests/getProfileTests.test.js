const { describe, it } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;
const { getProfile,getProfileby } = require('../utils/GetProfile');


describe('Testing GET features', () => {
    const resourcesFilePath = 'utils/users.json';
    var orgContent = "";
    beforeEach(async () => {
        orgContent = await fs.readFile(resourcesFilePath, 'utf8');
        orgContent = JSON.parse(orgContent);
    });
    afterEach(async () => {
        await fs.writeFile(resourcesFilePath, JSON.stringify(orgContent), 'utf8');
    });
  
  
   

    it('Should return an array when Getting profiles', async () => {
        const req = {};
        const res = {
            status: function (code) {
                expect(code).to.equal(201);
                return this;
            },
            json: function (data) {
                expect(Array.isArray(data)).to.be.true;
            },
        };
        await getProfile(req, res);
    });
    
    it('Should return a profile when Getting profile by id', async () => {
        const testUserId = '1';
        const req = {
            params: {
                id: testUserId,
            },
        };
        const res = {
            status: function (code) {
                // Adjust the expected status code based on the actual behavior
                if (code === 201 || code === 200) { // Assuming a successful response returns 201 or 200
                    return this;
                } else {
                    throw new Error(`Unexpected status code: ${code}`);
                }
            },
            json: function (data) {
                // Add assertions for the response data if needed
                expect(data.id).to.equal(testUserId); // Assuming a property named 'id' in the response
            },
        };
    
        await getProfileby(req, res);
    });
       
    });
