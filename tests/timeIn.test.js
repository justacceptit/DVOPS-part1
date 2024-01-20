const fs = require('fs').promises;
const { updateUserTime, readJSON } = require('../utils/UserUtil'); // Adjust the path as needed
const { expect } = require('chai');

describe('Testing Time in function', function () {
    // Create a temporary copy of the users.json file for testing
    const testUsersFilePath = 'utils/test-users.json';
  
    before(async function () {
      // Copy the contents of users.json to test-users.json for testing
      const usersData = await fs.readFile('utils/users.json', 'utf8');
      await fs.writeFile(testUsersFilePath, usersData, 'utf8');
    });
  
    after(async function () {
      // Clean up: restore the original users.json file
      const testUsersData = await fs.readFile(testUsersFilePath, 'utf8');
      await fs.writeFile('utils/users.json', testUsersData, 'utf8');
      // Delete the temporary test-users.json file
      await fs.unlink(testUsersFilePath);
    });
  
    it('should successfully update the user time on time in', async function () {
        const testUserId = '69'; // Replace with an actual user ID for your test
    
        // Mock the request and response objects
        const req = {
          params: { id: testUserId },
        };
        const res = {
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.responseData = data;
          },
        };
    
        // Read the content of users.json before the time in operation
        const usersBeforeTimeIn = await readJSON('utils/users.json');
    
        // Call the updateUserTime function
        await updateUserTime(req, res);
    
        // Check the response status code and message
        expect(res.statusCode).to.equal(200);
        expect(res.responseData.message).to.equal('User time updated successfully!');
    
        // Read the content of users.json after the time in operation
        const usersAfterTimeIn = await readJSON('utils/users.json');
    
        // Find the user in the updated data
        const userAfterTimeIn = usersAfterTimeIn.find(user => user.id === testUserId);
    
        // Check that the user's time_in property has been updated
        expect(userAfterTimeIn.time_in).to.exist;
      });
      it('should handle duplicate "time in" operation', async function () {
        const testUserId = '303'; // Replace with an actual user ID for your test
    
        // Mock the request and response objects for the first time in operation
        const firstTimeInReq = {
          params: { id: testUserId },
        };
        const firstTimeInRes = {
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.responseData = data;
          },
        };
    
        // Mock the request and response objects for the second time in operation
        const secondTimeInReq = {
          params: { id: testUserId },
        };
        const secondTimeInRes = {
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.responseData = data;
          },
        };
    
        // Call the updateUserTime function for the first time in operation
        await updateUserTime(firstTimeInReq, firstTimeInRes);
    
        // Check the response status code and message for the first time in operation
        expect(firstTimeInRes.statusCode).to.equal(200);
        expect(firstTimeInRes.responseData.message).to.equal('User time updated successfully!');
    
        // Call the updateUserTime function for the second time in operation
        await updateUserTime(secondTimeInReq, secondTimeInRes);
    
        // Check the response status code and message for the second time in operation
        expect(secondTimeInRes.statusCode).to.equal(400);
        expect(secondTimeInRes.responseData.message).to.equal('User already timed in!');
      });

      it('should record the correct time when user times in', async function () {
        const testUserId = '70'; // Replace with an actual user ID for your test
    
        // Mock the request and response objects
        const req = {
          params: { id: testUserId },
        };
        const res = {
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.responseData = data;
          },
        };
    
        // Record the current time before the time in operation
        const currentTimeBeforeTimeIn = new Date().toLocaleTimeString();
    
        // Call the updateUserTime function
        await updateUserTime(req, res);
    
        // Check the response status code and message
        expect(res.statusCode).to.equal(200);
        expect(res.responseData.message).to.equal('User time updated successfully!');
    
        // Read the content of users.json after the time in operation
        const usersAfterTimeIn = await readJSON('utils/users.json');
    
        // Find the user in the updated data
        const userAfterTimeIn = usersAfterTimeIn.find(user => user.id === testUserId);
    
        // Check that the user's time_in property matches the current time before the time in operation
        expect(userAfterTimeIn.time_in).to.equal(currentTimeBeforeTimeIn);
      });

      it('should record time within normal time clock range on "time in"', async function () {
        const testUserId = '2'; // Replace with an actual user ID for your test
    
        // Mock the request and response objects
        const req = {
          params: { id: testUserId },
        };
        const res = {
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.responseData = data;
          },
        };
    
        // Call the updateUserTime function
        await updateUserTime(req, res);
    
        // Check the response status code and message
        expect(res.statusCode).to.equal(200);
        expect(res.responseData.message).to.equal('User time updated successfully!');
    
        // Read the content of users.json after the time in operation
        const usersAfterTimeIn = await readJSON('utils/users.json');
    
        // Find the user in the updated data
        const userAfterTimeIn = usersAfterTimeIn.find(user => user.id === testUserId);
    
        // Check that the user's time_in property exists
        expect(userAfterTimeIn.time_in).to.exist;
    
        // Validate that the recorded time is within the normal time clock range (e.g., between 00:00 and 23:59)
        const recordedTime = userAfterTimeIn.time_in.split(':');
        const hours = parseInt(recordedTime[0], 10);
        const minutes = parseInt(recordedTime[1], 10);
    
        expect(hours).to.be.at.least(0).and.at.most(23);
        expect(minutes).to.be.at.least(0).and.at.most(59);
      });

      
      it('should handle updating time for a non-existent user', async function () {
        const invalidUserId = '253235'; // Replace with a non-existent user ID
    
        // Mock the request and response objects
        const req = {
          params: { id: invalidUserId },
        };
        const res = {
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.responseData = data;
          },
        };
    
        // Call the updateUserTime function for a non-existent user
        await updateUserTime(req, res);
    
        // Check the response status code and message
        expect(res.statusCode).to.equal(404);
        expect(res.responseData.message).to.equal('User not found!');
      });

    });

