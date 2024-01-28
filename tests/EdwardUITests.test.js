const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it } = require('mocha');
const { expect } = require('chai');

const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless');
const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

var server;
before(async function () {
    server = await new Promise((resolve) => {
        server = app.listen(0, 'localhost', () => {
            resolve(server);
        });
    })
});

describe('Testing Login UI', function () {

    it('Should have the correct title', async function () {
        
        const baseUrl = 'http://localhost:5050/index.html';
        this.timeout(100000);
        await driver.get(baseUrl);
        const title = await driver.getTitle();
        expect(title).to.equal('Log In Page');
    });


    it('Should show error message - All fields required', async function () {
            const baseUrl = 'http://localhost:5050/index.html';
            this.timeout(100000);
            await driver.get(baseUrl);
            const nameElement = await driver.findElement(By.id('name'));
            await nameElement.click(); // Click on the element
            await nameElement.sendKeys('John Tan');
        
            // Locate and interact with the Login button without filling in the required fields
            const loginButton = await driver.findElement(By.xpath('//button[text()="Login"]'));
            await loginButton.click();
        
            // Locate the error element and retrieve its text
            const errorMessage = await driver.findElement(By.id('error')).getText();
        
            // Assert that the error message contains the expected text
            expect(errorMessage).to.equal('All fields are required!');
        });
    
    it('Should show error message - Invalid credentials', async function () {

            const baseUrl = 'http://localhost:5050/index.html';
            this.timeout(100000);
            await driver.get(baseUrl);

            // Locate and interact with the email field

            const nameElement = await driver.findElement(By.id('name'));
            await nameElement.click(); // Click on the element
            await nameElement.sendKeys('John Tan');

            // Locate and interact with the password field
            const passwordElement = await driver.findElement(By.id('password'));
            await passwordElement.click(); // Click on the element
            await passwordElement.sendKeys('12345678');

            // Locate and interact with the Login button
            const loginButton = await driver.findElement(By.xpath('//button[text()="Login"]'));
            await loginButton.click();

            // Locate the error element and retrieve its text
            const errorMessage = await driver.findElement(By.id('error')).getText();
            const errorStyle = await driver.findElement(By.id('error')).getAttribute('class');

            // Assert that the error message contains the expected text and style
            expect(errorMessage).to.equal('Invalid credentials!');
            expect(errorStyle).to.equal('text-danger');
            });
        
        
});


after(async function () {
    await driver.quit();
    await server.close();
    process.exit(0);
});