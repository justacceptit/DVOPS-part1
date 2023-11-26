const { describe, it } = require('mocha');
const { expect } = require('chai');

const fs = require('fs').promises;
const { register, login } = require('../utils/UserUtil')

describe('Testing Register Function', () => {
   const usersFilePath = 'utils/users.json';
   var orgContent = "";

   beforeEach(async () => {
      orgContent = await fs.readFile(usersFilePath, 'utf8');
      orgContent = JSON.parse(orgContent);
});

it('Should register a new user successfully', async () => {
    const req = {
    body: {
    name: 'John Tan',
    password: '234567',
    },
    };
    const res = {
    status: function (code) {
    expect(code).to.equal(201);
    return this;
    },
    json: function (data) {
    expect(data).to.have.lengthOf(orgContent.length + 1);
    expect(data[orgContent.length].name).to.equal(req.body.name);
    expect(data[orgContent.length].password).to.equal(req.body.password);
    },
    };
    await register(req, res);
    });
   afterEach(async () => {
await fs.writeFile(usersFilePath, JSON.stringify(orgContent), 'utf8');
});

it('Should shows validation error due to name length', async () => {
    const req = {
    body: {
    name: 'AJ',
    password: '123456',
    },
    };
    const res = {
    status: function (code) {
    expect(code).to.equal(500);
    return this;
    },
    json: function (data) {
    expect(data.message).to.equal('Validation error');
    },
    };
    await register(req, res);
    });

it('Should shows validation error due to password length', async () => {
        const req = {
        body: {
        name: 'Jane Doe',
        password: '123',
        },
        };
        const res = {
        status: function (code) {
        expect(code).to.equal(500);
        return this;
        },
        json: function (data) {
        expect(data.message).to.equal('Validation error');
        },
        };
        await register(req, res);
        });
        it('Should shows validation error due to name and password length', async () => {
            const req = {
            body: {
            name: 'TP',
            password: '123',
            },
            };
            const res = {
            status: function (code) {
            expect(code).to.equal(500);
            return this;
            },
            json: function (data) {
            expect(data.message).to.equal('Validation error');
            },
            };
            await register(req, res);
            });
        
        it('Should show validation error for registering with invalid characters ', async () => {
                const req = {
                body: {
                name: 'D@niel',
                password: '123456',
                },
                };
                const res = {
                status: function (code) {
                expect(code).to.equal(500);
                return this;
                },
                json: function (data) {
                expect(data.message).to.equal('Validation error');
                },
                };
                await register(req, res);
                });
        
});


describe('Testing Login Function', () => {
const usersFilePath = 'utils/users.json';
var orgContent = "";
beforeEach(async () => {
orgContent = await fs.readFile(usersFilePath, 'utf8');
orgContent = JSON.parse(orgContent);
});

it('Should login successfully', async () => {
    const req = {
    body: {
    name: orgContent[0].name,
    password: orgContent[0].password,
    },
    };
    const res = {
    status: function (code) {
    expect(code).to.equal(201);
    return this;
    },
    json: function (data) {
    expect(data.message).to.equal('Login successful!');
    },
    };
    await login(req, res);
    });

it('Should show invalid credentials, wrong name given', async () => {
        const req = {
        body: {
        name: 'john',
        password: orgContent[0].password,
        },
        };
        const res = {
        status: function (code) {
        expect(code).to.equal(500);
        return this;
        },
        json: function (data) {
        expect(data.message).to.equal('Invalid credentials!');
        },
        };
        await login(req, res);
        });

it('Should show invalid credentials, wrong password given', async () => {
            const req = {
            body: {
            name: orgContent[0].name,
            password: '123456',
            },
            };
            const res = {
            status: function (code) {
            expect(code).to.equal(500);
            return this;
            },
            json: function (data) {
            expect(data.message).to.equal('Invalid credentials!');
            },
            };
            await login(req, res);
            });  
            
it('Should show invalid credentials, wrong name and wrong password given', async () => {
                const req = {
                body: {
                name: 'Jack Tan',
                password: '123456',
                },
                };
                const res = {
                status: function (code) {
                expect(code).to.equal(500);
                return this;
                },
                json: function (data) {
                expect(data.message).to.equal('Invalid credentials!');
                },
                };
                await login(req, res);
                });  
});