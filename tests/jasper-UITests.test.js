const { app } = require('../index');
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

describe('Frontend GetProfile', function () {
    it('Should be able to get profiles', async function () {

        const baseUrl = 'http://localhost:' + server.address().port;
        await driver.get(baseUrl + '/index.html');

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
        let name = await driver.executeScript("return sessionStorage.getItem('name');");

        // Make sure that 'name' is not null or undefined
        expect(name).to.not.be.oneOf([null, undefined], 'The name should be present in session storage.');

        // Search the DOM for an element that contains the "name" text
        let elementsWithName = await driver.findElements(By.xpath(`//*[contains(text(), '${name}')]`));

        // Check if the "name" is present on the page
        expect(elementsWithName).to.be.an('array').that.is.not.empty;
        // await driver.manage().setTimeouts({ implicit: 5000 });


    });
});


describe('Frontend EditProfile', function () {
   // let tempProfileId;
    it('Should be able to edit resource', async function () {

        const baseUrl = 'http://localhost:' + server.address().port ;
        await driver.get(baseUrl + '/index.html');

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
        const divBefore = await driver.findElement(By.className('navbar-links')); // Locate the div containing the links
        const registerLink = await divBefore.findElement(By.linkText('Register')); // Find the "Register" link within the div
        await registerLink.click();
     //   expect(currenttUrl).to.equal('http://localhost:' + server.address().port + '/register.html');
        const nameresElement = await driver.findElement(By.id('name'));
        await nameresElement.click(); // Click on the element
        await nameresElement.sendKeys('testing');
        this.timeout(100000);
        // Locate and interact with the password field
        const passwordregElement = await driver.findElement(By.id('password'));
        await passwordregElement.click(); // Click on the element
        await passwordregElement.sendKeys('12345678');
        this.timeout(100000);

        const levelElement = await driver.findElement(By.id('level'));
        await levelElement.click(); // Click on the element
        await levelElement.sendKeys('1');

        this.timeout(100000);
        const registerButton = await driver.findElement(By.xpath('//button[text()="Register"]'));
        await registerButton.click();
        // Wait for the page to be redirected
        await driver.wait(until.urlIs(baseUrl + '/index.html'), 10000);

        const nameaElement = await driver.findElement(By.id('name'));
        await nameaElement.click(); // Click on the element
        await nameaElement.sendKeys('testing');
        // Locate and interact with the password field

        const passwordaElement = await driver.findElement(By.id('password'));
        await passwordaElement.click(); // Click on the element
        await passwordaElement.sendKeys('12345678');

        // Locate and interact with the password field

        // Locate and interact with the Login button
        const loginaButton = await driver.findElement(By.xpath('//button[text()="Login"]'));
        await loginaButton.click();

        await driver.wait(until.urlIs(baseUrl + '/home.html'), 10000);

        const diBefore = await driver.findElement(By.className('navbar-links')); // Locate the div containing the links
        const edLink = await diBefore.findElement(By.linkText('Edit/Delete')); // Find the "Register" link within the div
        await edLink.click();

        await driver.wait(until.urlIs(baseUrl + '/edit.html'), 10000);

       
        this.timeout(1000000);
        await driver.wait(until.elementLocated(By.css('table.table')));

        // Find the row with the user 'Edward' and click the 'Delete' button in that row
        const userRow = await driver.findElement(By.xpath("//tr[td[contains(text(), 'testing')]]"));
        const editbutt = await userRow.findElement(By.xpath(".//button[contains(text(), 'Edit')]"));
        await editbutt.click();
        //await driver.wait(until.urlIs(baseUrl + '/edit.html'), 10000);
        //const currenttUrl = await driver.getCurrentUrl();
        //await driver.findElement(By.id('editProfileModal'));

        // Wait for the modal to be visible
        await driver.wait(until.elementLocated(By.id('editProfileModal')), 10000);
        const editProfileModal = await driver.findElement(By.id('editProfileModal'));
        await driver.wait(until.elementIsVisible(editProfileModal), 10000);
        
        this.timeout(10000);

        const editnameElement = await driver.findElement(By.id('editName'));
        await editnameElement.click(); // Click on the element
        await editnameElement.sendKeys('');

        const editpasswordElement = await driver.findElement(By.id('editPassword'));
        await editpasswordElement.click(); // Click on the element
        await editpasswordElement.sendKeys('9');

        const editlevelElement = await driver.findElement(By.id('editLevel'));
        await editlevelElement.click(); // Click on the element
        await editlevelElement.sendKeys(Key.BACK_SPACE);
        await editlevelElement.sendKeys('2');

        const editdateElement = await driver.findElement(By.id('editDate'));
        await editdateElement.click(); // Click on the element
        await editdateElement.sendKeys('12012024');
        const edittimeElement = await driver.findElement(By.id('editTime_In'));
        await edittimeElement.click(); // Click on the element
        await edittimeElement.sendKeys('1111am');
        const upButton = await driver.wait(until.elementLocated(By.xpath('//button[text()="Update Resource"]')), 10000);
        await driver.wait(until.elementIsEnabled(upButton));
        await upButton.click();
       
        // Wait for the page to be redirected
       // await driver.wait(until.urlIs(baseUrl + '/edit.html'), 10000);


        // Assert that the updated information is displayed in the table
        await driver.wait(until.elementLocated(By.id('editMessage')),10000);
        const editMessageElement = await driver.findElement(By.id('editMessage'));
        
        // Get the innerHTML of the element
        const editMessage = await editMessageElement.getAttribute('innerHTML');
        
        // Assert that the innerHTML matches the expected value
        expect(editMessage).to.equal('Edited Profile: testing!');
        

    });
    it('Should not be able to edit resource (missing password)', async function () {

        const baseUrl = 'http://localhost:' + server.address().port ;
        await driver.get(baseUrl + '/index.html');

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
        
       

        const diBefore = await driver.findElement(By.className('navbar-links')); // Locate the div containing the links
        const edLink = await diBefore.findElement(By.linkText('Edit/Delete')); // Find the "Register" link within the div
        await edLink.click();

        await driver.wait(until.urlIs(baseUrl + '/edit.html'), 10000);

       
        this.timeout(1000000);
        await driver.wait(until.elementLocated(By.css('table.table')));

        // Find the row with the user 'Edward' and click the 'Delete' button in that row
        const userRow = await driver.findElement(By.xpath("//tr[td[contains(text(), 'testing')]]"));
        const editbutt = await userRow.findElement(By.xpath(".//button[contains(text(), 'Edit')]"));
        await editbutt.click();
        //await driver.wait(until.urlIs(baseUrl + '/edit.html'), 10000);
        //const currenttUrl = await driver.getCurrentUrl();
        //await driver.findElement(By.id('editProfileModal'));

        // Wait for the modal to be visible
        await driver.wait(until.elementLocated(By.id('editProfileModal')), 10000);
        const editProfileModal = await driver.findElement(By.id('editProfileModal'));
        await driver.wait(until.elementIsVisible(editProfileModal), 10000);
        
        this.timeout(10000);

        const editnameElement = await driver.findElement(By.id('editName'));
        await editnameElement.click(); // Click on the element
        await editnameElement.sendKeys('');

        const editpasswordElement = await driver.findElement(By.id('editPassword'));
        await editpasswordElement.click(); // Click on the element
        await editpasswordElement.sendKeys(Key.BACK_SPACE);
        await editpasswordElement.sendKeys(Key.BACK_SPACE);
        await editpasswordElement.sendKeys(Key.BACK_SPACE);
        await editpasswordElement.sendKeys(Key.BACK_SPACE);
        await editpasswordElement.sendKeys(Key.BACK_SPACE);
        await editpasswordElement.sendKeys(Key.BACK_SPACE);
        await editpasswordElement.sendKeys(Key.BACK_SPACE);
        await editpasswordElement.sendKeys(Key.BACK_SPACE);
        await editpasswordElement.sendKeys(Key.BACK_SPACE);

        const editlevelElement = await driver.findElement(By.id('editLevel'));
        await editlevelElement.click(); // Click on the element
        await editlevelElement.sendKeys(Key.BACK_SPACE);
        await editlevelElement.sendKeys('2');
        

        const editdateElement = await driver.findElement(By.id('editDate'));
        await editdateElement.click(); // Click on the element
        await editdateElement.sendKeys('12012024');
        const edittimeElement = await driver.findElement(By.id('editTime_In'));
        await edittimeElement.click(); // Click on the element
        await edittimeElement.sendKeys('1111am');
        const upButton = await driver.wait(until.elementLocated(By.xpath('//button[text()="Update Resource"]')), 10000);
        await driver.wait(until.elementIsEnabled(upButton));
        await upButton.click();
       
        // Wait for the page to be redirected
       // await driver.wait(until.urlIs(baseUrl + '/edit.html'), 10000);


        // Assert that the updated information is displayed in the table
        await driver.wait(until.elementLocated(By.id('editMessage')),10000);
        const editMessageElement = await driver.findElement(By.id('editMessage'));
        
        // Get the innerHTML of the element
        const editMessage = await editMessageElement.getAttribute('innerHTML');
        
        // Assert that the innerHTML matches the expected value
        expect(editMessage).to.equal('Please Input Password!');
        

    });
    
    it('Should not be able to edit resource (missing level)', async function () {

        const baseUrl = 'http://localhost:' + server.address().port ;
        await driver.get(baseUrl + '/index.html');

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
        
       

        const diBefore = await driver.findElement(By.className('navbar-links')); // Locate the div containing the links
        const edLink = await diBefore.findElement(By.linkText('Edit/Delete')); // Find the "Register" link within the div
        await edLink.click();

        await driver.wait(until.urlIs(baseUrl + '/edit.html'), 10000);

       
        this.timeout(1000000);
        await driver.wait(until.elementLocated(By.css('table.table')));

        // Find the row with the user 'Edward' and click the 'Delete' button in that row
        const userRow = await driver.findElement(By.xpath("//tr[td[contains(text(), 'testing')]]"));
        const editbutt = await userRow.findElement(By.xpath(".//button[contains(text(), 'Edit')]"));
        await editbutt.click();
        //await driver.wait(until.urlIs(baseUrl + '/edit.html'), 10000);
        //const currenttUrl = await driver.getCurrentUrl();
        //await driver.findElement(By.id('editProfileModal'));

        // Wait for the modal to be visible
        await driver.wait(until.elementLocated(By.id('editProfileModal')), 10000);
        const editProfileModal = await driver.findElement(By.id('editProfileModal'));
        await driver.wait(until.elementIsVisible(editProfileModal), 10000);
        
        this.timeout(10000);

        const editnameElement = await driver.findElement(By.id('editName'));
        await editnameElement.click(); // Click on the element
        await editnameElement.sendKeys('');

        const editpasswordElement = await driver.findElement(By.id('editPassword'));
        await editpasswordElement.click(); // Click on the element
        await editpasswordElement.sendKeys('9');

        const editlevelElement = await driver.findElement(By.id('editLevel'));
        await editlevelElement.click(); // Click on the element
        await editlevelElement.sendKeys(Key.BACK_SPACE);
        

        const editdateElement = await driver.findElement(By.id('editDate'));
        await editdateElement.click(); // Click on the element
        await editdateElement.sendKeys('12012024');
        const edittimeElement = await driver.findElement(By.id('editTime_In'));
        await edittimeElement.click(); // Click on the element
        await edittimeElement.sendKeys('1111am');
        const upButton = await driver.wait(until.elementLocated(By.xpath('//button[text()="Update Resource"]')), 10000);
        await driver.wait(until.elementIsEnabled(upButton));
        await upButton.click();
       
        // Wait for the page to be redirected
       // await driver.wait(until.urlIs(baseUrl + '/edit.html'), 10000);


        // Assert that the updated information is displayed in the table
        await driver.wait(until.elementLocated(By.id('editMessage')),10000);
        const editMessageElement = await driver.findElement(By.id('editMessage'));
        
        // Get the innerHTML of the element
        const editMessage = await editMessageElement.getAttribute('innerHTML');
        
        // Assert that the innerHTML matches the expected value
        expect(editMessage).to.equal('Please Input a proper Level!');
        

    });
    
    it('Should not be able to edit resource (missing date)', async function () {

        const baseUrl = 'http://localhost:' + server.address().port ;
        await driver.get(baseUrl + '/index.html');

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
        
       

        const diBefore = await driver.findElement(By.className('navbar-links')); // Locate the div containing the links
        const edLink = await diBefore.findElement(By.linkText('Edit/Delete')); // Find the "Register" link within the div
        await edLink.click();

        await driver.wait(until.urlIs(baseUrl + '/edit.html'), 10000);

       
        this.timeout(1000000);
        await driver.wait(until.elementLocated(By.css('table.table')));

        // Find the row with the user 'Edward' and click the 'Delete' button in that row
        const userRow = await driver.findElement(By.xpath("//tr[td[contains(text(), 'testing')]]"));
        const editbutt = await userRow.findElement(By.xpath(".//button[contains(text(), 'Edit')]"));
        await editbutt.click();
        //await driver.wait(until.urlIs(baseUrl + '/edit.html'), 10000);
        //const currenttUrl = await driver.getCurrentUrl();
        //await driver.findElement(By.id('editProfileModal'));

        // Wait for the modal to be visible
        await driver.wait(until.elementLocated(By.id('editProfileModal')), 10000);
        const editProfileModal = await driver.findElement(By.id('editProfileModal'));
        await driver.wait(until.elementIsVisible(editProfileModal), 10000);
        
        this.timeout(10000);

        const editnameElement = await driver.findElement(By.id('editName'));
        await editnameElement.click(); // Click on the element
        await editnameElement.sendKeys('');

        const editpasswordElement = await driver.findElement(By.id('editPassword'));
        await editpasswordElement.click(); // Click on the element
        await editpasswordElement.sendKeys('9');

        const editlevelElement = await driver.findElement(By.id('editLevel'));
        await editlevelElement.click(); // Click on the element
        await editlevelElement.sendKeys(Key.BACK_SPACE);
        await editlevelElement.sendKeys('1');
             

        const editdateElement = await driver.findElement(By.id('editDate'));
        await editdateElement.click(); // Click on the element
        await editdateElement.sendKeys(Key.BACK_SPACE);
        await editdateElement.sendKeys(Key.ARROW_RIGHT);
        await editdateElement.sendKeys(Key.BACK_SPACE);
        await editdateElement.sendKeys(Key.ARROW_RIGHT);
        await editdateElement.sendKeys(Key.BACK_SPACE);
        await editdateElement.sendKeys(Key.ARROW_RIGHT);  
    
        const edittimeElement = await driver.findElement(By.id('editTime_In'));
        await edittimeElement.click(); // Click on the element
        await edittimeElement.sendKeys('1111am');
        const upButton = await driver.wait(until.elementLocated(By.xpath('//button[text()="Update Resource"]')), 10000);
        await driver.wait(until.elementIsEnabled(upButton));
        await upButton.click();
       
        // Wait for the page to be redirected
       // await driver.wait(until.urlIs(baseUrl + '/edit.html'), 10000);


        // Assert that the updated information is displayed in the table
        await driver.wait(until.elementLocated(By.id('editMessage')),10000);
        const editMessageElement = await driver.findElement(By.id('editMessage'));
        
        // Get the innerHTML of the element
        const editMessage = await editMessageElement.getAttribute('innerHTML');
        
        // Assert that the innerHTML matches the expected value
        expect(editMessage).to.equal('Please Input a proper Date!');
        

    });
    
});

/*
afterEach(async function () {
    await driver.executeScript('return window.__coverage__;').then(async (coverageData) => {
    if (coverageData) {
    // Save coverage data to a file
    await fs.writeFile('coverage-frontend/coverage'+ counter++ + '.json',
    JSON.stringify(coverageData), (err) => {
    if (err) {
    console.error('Error writing coverage data:', err);
    } else {
    console.log('Coverage data written to coverage.json');
    }
    });
    }
    });
    });*/
after(async function () {
    await driver.quit();
    await server.close();
    process.exit(0);
});