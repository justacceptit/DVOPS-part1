const { describe, it } = require('mocha');
const { expect } = require('chai');
const {readJSON}=require('../utils/UserUtil')
const fs = require('fs').promises;
const { getProfile} = require('../utils/GetProfile');


describe('Testing GET features', () => {
    const resourcesFilePath = 'utils/users.json';
    var orgContent = "";
    beforeEach(async () => {
        orgContent = await fs.readFile(resourcesFilePath, 'utf8');
        orgContent = JSON.parse(orgContent);
    });
    afterEach(async () => {
        try {
            // Revert the profiles to their original state
            await fs.writeFile(resourcesFilePath, JSON.stringify(orgContent), 'utf8');
        } catch (error) {
            console.error('Error in "after each" hook:', error);
        }
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
    
   
    });
