const fs = require('fs').promises;
const { readJSON } = require('../utils/UserUtil'); // Adjust the path as needed
const { deleteUser} = require('../utils/ryanUtil'); // Adjust the path as needed
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

describe('Testing Delete User function', function () {
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

  

  it('should successfully delete a user', async function () {
    const testUserId = '315'; // Replace with an actual user ID for your test

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

    // Call the deleteUser function
    await deleteUser(req, res);


    // Check the response status code
    expect(res.statusCode).to.equal(201);
    expect(res.responseData.message).to.equal('User deleted successfully!');
  });

  it('should handle deletion of a non-existent user without errors', async function () {
    const nonExistentUserId = '1111'; // Replace with a non-existent user ID for your test

    // Mock the request and response objects
    const req = {
      params: { id: nonExistentUserId },
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

    // Call the deleteUser function
    await deleteUser(req, res);

    // Check the response status code
    expect(res.statusCode, 404);
    // Check the response message
    expect(res.responseData.message, 'User not found!');
  });

  it('should handle deletion of a non-existent user and leave JSON unchanged', async function () {
    const nonExistentUserId = 'nonexistent'; // Replace with a non-existent user ID for your test

    // Read the content of users.json before the deletion
    const usersBeforeDeletion = await readJSON('utils/users.json');

    // Mock the request and response objects
    const req = {
      params: { id: nonExistentUserId },
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

    // Call the deleteUser function
    await deleteUser(req, res);

    // Check the response status code
    expect(res.statusCode).to.equal(404);
    // Check the response message
    expect(res.responseData.message).to.equal('User not found!');

    const usersAfterDeletion = await readJSON('utils/users.json');

    // Compare the contents before and after deletion
    expect(usersAfterDeletion).to.deep.equal(usersBeforeDeletion);
  });

  
  

  it('should deny the user of deleting a user if the user being deleted is the only user at level 2', async function () {
    const testUserId = '423'; // Replace with an actual user ID for your test

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

    // Call the deleteUser function
    await deleteUser(req, res);


    // Check the response status code
    expect(res.statusCode).to.equal(400);
    expect(res.responseData.message).to.equal('Cannot delete the last user with level 2!');
  });





});
