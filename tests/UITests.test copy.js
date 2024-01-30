/*const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;

const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome.Options();
//chromeOptions.addArguments('--headless');
const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
var server;
var counter = 0;
before(async function () {
    server = await new Promise((resolve) => {
        server = app.listen(0, 'localhost', () => {
            resolve(server);
        });
    })
});
describe('Testing Login UI', function () {
   

    it('Should have the correct title', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/home.html';
        this.timeout(100000);
        await driver.get(baseUrl);
        const title = await driver.getTitle();
        expect(title).to.equal('Home Page');
    });
    
});

describe('Testing Resource UI', function () {
    it('Should be able to add and display new resource', async function () {
     
        const baseUrl = 'http://localhost:' + server.address().port  ;
        await driver.get(baseUrl+'/index.html');
      
        const nameElement = await driver.findElement(By.id('name'));
        await nameElement.click(); // Click on the element
        await nameElement.sendKeys('testone');
        // Locate and interact with the password field
       
        const passwordElement = await driver.findElement(By.id('password'));
        await passwordElement.click(); // Click on the element
        await passwordElement.sendKeys('12345678');
       
          // Locate and interact with the password field
       
        // Locate and interact with the Login button
        const loginButton = await driver.findElement(By.xpath('//button[text()="Login"]'));
        await loginButton.click();
       
        // Wait for the page to be redirected
        await driver.wait(until.urlIs(baseUrl + '/home.html'), 10000);
       
        // Assert that the URL matches the expected URL
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal('http://localhost:' + server.address().port + '/home.html');
        let name = await driver.executeScript("return sessionStorage.getItem('name')");
       

        const tableBefore = await driver.findElement(By.css('table')); // Replace with the actual ID of your table
        const rowsBefore = await tableBefore.findElements(By.css('tr'));
        const beforeCount = rowsBefore.length
      
        const divBefore = await driver.findElement(By.className('navbar-links')); // Locate the div containing the links
        const registerLink = await divBefore.findElement(By.linkText('Register')); // Find the "Register" link within the div
        await registerLink.click();
        await driver.wait(until.urlIs(baseUrl + '/register.html'), 10000);
        const currenttUrl = await driver.getCurrentUrl();
        expect(currenttUrl).to.equal('http://localhost:' + server.address().port + '/register.html');
        const nameresElement = await driver.findElement(By.id('name'));
        await nameresElement.click(); // Click on the element
        await nameresElement.sendKeys('testing');
       
        // Locate and interact with the password field
        const passwordregElement = await driver.findElement(By.id('password'));
        await passwordregElement.click(); // Click on the element
        await passwordregElement.sendKeys('12345678');

       
        const levelElement = await driver.findElement(By.id('level'));
        await levelElement.click(); // Click on the element
        await levelElement.sendKeys('1');
      
      
        const registerButton = await driver.findElement(By.xpath('//button[text()="Register"]'));
        await registerButton.click();

       
       // expect(currentUrl).to.equal('http://localhost:' + server.address().port + '/home.html');
       const nameagElement = await driver.findElement(By.id('name'));
        await nameagElement.click(); // Click on the element
        await nameagElement.sendKeys('testone');
        // Locate and interact with the password field
       
        const passwordagElement = await driver.findElement(By.id('password'));
        await passwordagElement.click(); // Click on the element
        await passwordagElement.sendKeys('1234555');
       
          // Locate and interact with the password field
       
        // Locate and interact with the Login button
        const loginagButton = await driver.findElement(By.xpath('//button[text()="Login"]'));
        await loginagButton.click();
       
        const tableUpdated = await driver.findElement(By.css('table'));
        const rowsUpdated = await tableUpdated.findElements(By.css('tr'));
       // const beforeCount = rowsBefore.length
       expect(rowsUpdated.length).to.not.equal(beforeCount + 1);

       // await driver.manage().setTimeouts({ implicit: 5000 });
        
      
    });
});



/*afterEach(async function () {
    await driver.executeScript('return window.__coverage__;').then(async (coverageData) => {
        if (coverageData) {
            // Save coverage data to a file
            await fs.writeFile('coverage-frontend/coverage' + counter++ + '.json',
                JSON.stringify(coverageData), (err) => {
                    if (err) {
                        console.error('Error writing coverage data:', err);
                    } else {
                        console.log('Coverage data written to coverage.json');
                    }
                });
        }
    });
});*//*
after(async function () {
    await driver.quit();
    await server.close();
    process.exit(0);
});*/