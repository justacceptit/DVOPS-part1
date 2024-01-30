const { app } = require('../index');
const { Builder, By, until } = require('selenium-webdriver');
const { describe, it, before, after } = require('mocha');
const { expect } = require('chai'); // Make sure to include the 'expect' assertion library
const fs = require('fs').promises;

const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless');
const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

var server;
var counter = 0;

before(async function () {
    server = await new Promise((resolve) => {
        server = app.listen(0, 'localhost', () => {
            resolve(server);
        });
    });
});

describe('Testing Login UI', function () {

    it('Should have the correct title', async function () {
        const baseUrl = 'http://localhost:5050/instrumented/index.html';
        this.timeout(900000);
        await driver.get(baseUrl);
        const title = await driver.getTitle();
        expect(title).to.equal('Log In Page');
    });

    it('Should show error message - All fields required', async function () {
        const baseUrl = 'http://localhost:5050/instrumented/index.html';
        this.timeout(900000);
        await driver.get(baseUrl);

        const nameElement = await driver.findElement(By.id('name'));
        await nameElement.click();
        await nameElement.sendKeys('John Tan');

        const loginButton = await driver.findElement(By.xpath('//button[text()="Login"]'));
        await loginButton.click();

        const errorMessage = await driver.findElement(By.id('error')).getText();
        expect(errorMessage).to.equal('All fields are required!');
    });

    it('Should show error message - Invalid credentials', async function () {
        const baseUrl = 'http://localhost:5050/instrumented/index.html';
        this.timeout(900000);
        await driver.get(baseUrl);

        const nameElement = await driver.findElement(By.id('name'));
        await nameElement.click();
        await nameElement.sendKeys('AJ');

        const passwordElement = await driver.findElement(By.id('password'));
        await passwordElement.click();
        await passwordElement.sendKeys('12345678');

        const loginButton = await driver.findElement(By.xpath('//button[text()="Login"]'));
        await loginButton.click();

        const errorMessage = await driver.findElement(By.id('error')).getText();
        const errorStyle = await driver.findElement(By.id('error')).getAttribute('class');

        expect(errorMessage).to.equal('Invalid credentials!');
        expect(errorStyle).to.equal('text-danger');
    });

    it('Should show error message - Incorrect password', async function () {
        const baseUrl = 'http://localhost:5050/instrumented/index.html';
        this.timeout(900000);
        await driver.get(baseUrl);

        const nameElement = await driver.findElement(By.id('name'));
        await nameElement.sendKeys('Jason Tan');

        const passwordElement = await driver.findElement(By.id('password'));
        await passwordElement.sendKeys('1234'); 

        const loginButton = await driver.findElement(By.xpath('//button[text()="Login"]'));
        await loginButton.click();

        const errorMessage = await driver.findElement(By.id('error')).getText();
        const errorStyle = await driver.findElement(By.id('error')).getAttribute('class');

        expect(errorMessage).to.equal('Invalid credentials!');
        expect(errorStyle).to.equal('text-danger');
    });

    it('Should successfully log in with correct credentials', async function () {
        const baseUrl = 'http://localhost:5050/instrumented/index.html';
        this.timeout(9000000000000);
        await driver.get(baseUrl);

        const nameElement = await driver.findElement(By.id('name'));
        await nameElement.click();
        await nameElement.sendKeys('Jason Tan');

        const passwordElement = await driver.findElement(By.id('password'));
        await passwordElement.click();
        await passwordElement.sendKeys('12345678'); 

        const loginButton = await driver.findElement(By.xpath('//button[text()="Login"]'));
        await loginButton.click();

        await driver.sleep(10000);

        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal('http://localhost:5050/home.html');
    });

});

describe('Testing Register UI', function () {

    it('Should have the correct title', async function () {
        const baseUrl = 'http://localhost:5050/instrumented/register.html';
        this.timeout(900000);
        await driver.get(baseUrl);
        const title = await driver.getTitle();
        expect(title).to.equal('Register Page');
    });

    it('Should show error message - All fields required during registration', async function () {
        const baseUrl = 'http://localhost:5050/instrumented/register.html';
        this.timeout(900000);
        await driver.get(baseUrl);

        const registerButton = await driver.findElement(By.xpath('//button[text()="Register"]'));
        await registerButton.click();

        const errorMessage = await driver.findElement(By.id('error')).getText();
        expect(errorMessage).to.equal('All fields are required!');
    });

    it('Should show error message - Password is less than 6 characters during registration', async function () {
        const baseUrl = 'http://localhost:5050/instrumented/register.html';
        this.timeout(9000000000000);
        await driver.get(baseUrl);

        const nameElement = await driver.findElement(By.id('name'));
        await nameElement.sendKeys('Jane Doe');

        const passwordElement = await driver.findElement(By.id('password'));
        await passwordElement.sendKeys('12345'); 

        const levelElement = await driver.findElement(By.id('level'));
        await levelElement.sendKeys('2');

        const registerButton = await driver.findElement(By.xpath('//button[text()="Register"]'));
        await registerButton.click();

        const errorMessage = await driver.findElement(By.id('error')).getText();
        expect(errorMessage).to.equal('Password must be at least 6 characters!');
    });

    it('Should show error message - Level must be a number during registration', async function () {
        const baseUrl = 'http://localhost:5050/instrumented/register.html';
        this.timeout(9000000000000);
        await driver.get(baseUrl);

        const nameElement = await driver.findElement(By.id('name'));
        await nameElement.sendKeys('Nathan Goh');

        const passwordElement = await driver.findElement(By.id('password'));
        await passwordElement.sendKeys('12345678');

        const levelElement = await driver.findElement(By.id('level'));
        await levelElement.sendKeys('One');  

        const registerButton = await driver.findElement(By.xpath('//button[text()="Register"]'));
        await registerButton.click();

        const errorMessage = await driver.findElement(By.id('error')).getText();
        expect(errorMessage).to.equal('Level must be a number!');
    });

    it('Should successfully register a user with valid credentials', async function () {
        const baseUrl = 'http://localhost:5050/instrumented/register.html';
        this.timeout(9000000000000);
        await driver.get(baseUrl);

        const nameElement = await driver.findElement(By.id('name'));
        await nameElement.sendKeys('Peter Parker');

        const passwordElement = await driver.findElement(By.id('password'));
        await passwordElement.sendKeys('12345678');

        const levelElement = await driver.findElement(By.id('level'));
        await levelElement.sendKeys('2');

        const registerButton = await driver.findElement(By.xpath('//button[text()="Register"]'));
        await registerButton.click();

        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal('http://localhost:5050/index.html');
    });

});

afterEach(async function () {
    await driver.executeScript('return window._coverage_;').then(async (coverageData) => {
       if (coverageData) {
            await fs.writeFile('coverage-frontend/coverageLoginRegister' + counter++ + '.json',
                JSON.stringify(coverageData), (err) => {
                   if (err) {
                    console.error('Error writing coverage data:', err);
                   } else {
                     console.log('Coverage data written to coverage.json');
                   }
                 });
            }
        });
    });

after(async function () {
    await driver.quit();
    await server.close();
    process.exit(0);
});
