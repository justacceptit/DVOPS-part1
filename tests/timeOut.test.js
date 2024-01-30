/*const fs = require('fs').promises;
const { updateUserTimeOut, readJSON } = require('../utils/UserUtil'); // Adjust the path as needed
const { expect } = require('chai');

describe('Testing Time Out function', function () {
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

  it('should successfully update the user time on time out', async function () {
    const testUserId = '316'; // Replace with an actual user ID for your test

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

    // Read the content of users.json before the time out operation
    const usersBeforeTimeOut = await readJSON('utils/users.json');

    // Call the updateUserTimeOut function
    await updateUserTimeOut(req, res);

    // Check the response status code and message
    expect(res.statusCode).to.equal(200);
    expect(res.responseData.message).to.equal('User time out updated successfully!');

    // Read the content of users.json after the time out operation
    const usersAfterTimeOut = await readJSON('utils/users.json');

    // Find the user in the updated data
    const userAfterTimeOut = usersAfterTimeOut.find(user => user.id === testUserId);

    // Check that the user's time_out property has been updated
    expect(userAfterTimeOut.time_out).to.exist;
  });

  it('should handle duplicate "time out" operation', async function () {
    const testUserId = '317'; // Replace with an actual user ID for your test

    // Mock the request and response objects for the first time out operation
    const firstTimeOutReq = {
      params: { id: testUserId },
    };
    const firstTimeOutRes = {
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.responseData = data;
      },
    };

    // Mock the request and response objects for the second time out operation
    const secondTimeOutReq = {
      params: { id: testUserId },
    };
    const secondTimeOutRes = {
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.responseData = data;
      },
    };

    // Call the updateUserTimeOut function for the first time out operation
    await updateUserTimeOut(firstTimeOutReq, firstTimeOutRes);

    // Check the response status code and message for the first time out operation
    expect(firstTimeOutRes.statusCode).to.equal(200);
    expect(firstTimeOutRes.responseData.message).to.equal('User time out updated successfully!');

    // Call the updateUserTimeOut function for the second time out operation
    await updateUserTimeOut(secondTimeOutReq, secondTimeOutRes);

    // Check the response status code and message for the second time out operation
    expect(secondTimeOutRes.statusCode).to.equal(400);
    expect(secondTimeOutRes.responseData.message).to.equal('User already timed out!');
  });

  it('should record the correct time when user times out', async function () {
    const testUserId = '1'; // Replace with an actual user ID for your test

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

    // Record the current time before the time out operation
    const currentTimeBeforeTimeOut = new Date().toLocaleTimeString();

    // Call the updateUserTimeOut function
    await updateUserTimeOut(req, res);

    // Check the response status code and message
    expect(res.statusCode).to.equal(200);
    expect(res.responseData.message).to.equal('User time out updated successfully!');

    // Read the content of users.json after the time out operation
    const usersAfterTimeOut = await readJSON('utils/users.json');

    // Find the user in the updated data
    const userAfterTimeOut = usersAfterTimeOut.find(user => user.id === testUserId);

    // Check that the user's time_out property matches the current time before the time out operation
    expect(userAfterTimeOut.time_out).to.equal(currentTimeBeforeTimeOut);
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

    // Call the updateUserTimeOut function for a non-existent user
    await updateUserTimeOut(req, res);

    // Check the response status code and message
    expect(res.statusCode).to.equal(404);
    expect(res.responseData.message).to.equal('User not found!');
  });
});
*/