const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const mocha = require('mocha');
const fs = require('fs');
const path = require('path'); // Import path module here
var counter = 0;


describe('Time In UI Tests', function () {
    this.timeout(30000);
    let driver;
    let url = 'http://localhost:5050/instrumented/home.html'; 
    

    before(async function () {
        const defaultUsers = [
            {"name":"ryan","password":"12345678","level":"1","date":"26/11/2023","time_in":"3:05:27 pm","id":"1","time_out":""},{"name":"edward","password":"12345678","level":"1","date":"26/11/2023","time_in":"","id":"2"},{"name":"john","password":"12345678","level":"1","date":"26/11/2023","time_in":"","id":"11"},{"name":"num1","password":"1234566","date":"20/01/2024","time_in":"","id":"1"},{"name":"testtwo","password":"12345678","level":"1","date":"26/11/2023","time_in":"","id":"11"},{"name":"dont touch","password":"1234566","level":"1","date":"27/11/2023","time_in":"","id":"113","time_out":""},{"name":"ryan","password":"12345678","level":"1","date":"26/11/2023","time_in":"3:05:27 pm","id":"1","time_out":""},{"name":"edward","password":"12345678","level":"1","date":"26/11/2023","time_in":"","id":"2"},{"name":"john","password":"12345678","level":"1","date":"26/11/2023","time_in":"","id":"11"},{"name":"testone","password":"12345678","level":"1","date":"24/01/2024","time_in":"02:48:00 am","id":"788","time_out":"2:46:57 pm"},{"name":"Jason Tan","password":"12345678","level":"1","date":"22/01/2024","time_in":"","id":"652"},{"name":"Jason TanTan","password":"123456","level":"1","date":"22/01/2024","time_in":"","id":"712"},{"name":"John Doe","password":"12345678","level":"1","date":"26/01/2024","time_in":"","id":"232","time_out":"7:12:20 pm"},{"name":"Test Test","password":"123456","level":"1","date":"22/01/2024","time_in":"","id":"065"},{"name":"ryanlimxy","password":"1234567","level":"2","date":"23/01/2024","time_in":"","id":"423"},{"name":"Testing Today","password":"12345678","level":"1","date":"23/01/2024","time_in":"","id":"028"},{"name":"Testing Today Again","password":"12345678","level":"1","date":"26/01/2024","time_in":"","id":"934","time_out":""},{"name":"Testing Today","password":"12345678","level":"1","date":"23/01/2024","time_in":"","id":"028"},{"name":"RYAN TEST1","password":"12345678","level":"1","date":"26/01/2024","time_in":"","id":"312","time_out":""},{"name":"RYAN TEST2","password":"12345678","level":"1","date":"26/01/2024","time_in":"","id":"313","time_out":""},{"name":"RYAN TEST3","password":"12345678","level":"1","date":"26/01/2024","time_in":"","id":"312","time_out":""},{"name":"RYAN TEST4","password":"12345678","level":"1","date":"26/01/2024","time_in":"","id":"314","time_out":""},{"name":"RYAN TEST5","password":"12345678","level":"1","date":"26/01/2024","time_in":"","id":"315","time_out":""},{"name":"RYAN TEST5","password":"12345678","level":"1","date":"26/01/2024","time_in":"6:25:23 pm","id":"316","time_out":""},{"name":"RYAN TEST5","password":"12345678","level":"1","date":"26/01/2024","time_in":"","id":"315","time_out":""},{"name":"RYAN TEST5","password":"12345678","level":"1","date":"26/01/2024","time_in":"6:25:23 pm","id":"317","time_out":""}
        ];
        fs.writeFileSync(path.join(__dirname, '..', 'utils','users.json'), JSON.stringify(defaultUsers), 'utf8');
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('should find the Time In and Time Out buttons', async function () {
        await driver.get(url);

        const timeInBtn = await driver.findElement(By.id('timeInBtn'));
        const timeOutBtn = await driver.findElement(By.id('timeOutBtn'));

        expect(timeInBtn).to.exist;
        expect(timeOutBtn).to.exist;
    });

    it('User first time in - should show success message', async function () {
        await driver.get(url);

        // Set session storage for a user who has not timed in yet
        await driver.executeScript("sessionStorage.setItem('id', '232');");

        // Click the "Time In" button
        const timeInBtn = await driver.findElement(By.id('timeInBtn'));
        await timeInBtn.click();

        // Wait for the message to appear
        await driver.wait(until.elementLocated(By.id('message')));
        const message = await driver.findElement(By.id('message')).getText();

        expect(message).to.include('User time updated successfully!');
    });

    it('User tries to time in again - should show already timed in message', async function () {
        await driver.get(url);

        // Set session storage for a user who is already timed in
        await driver.executeScript("sessionStorage.setItem('id', '232');");

        // Click the "Time In" button for the first time
        let timeInBtn = await driver.findElement(By.id('timeInBtn'));
        await timeInBtn.click();

        // Wait for some time or perform some operation to ensure time in is processed

        // Click the "Time In" button for the second time
        timeInBtn = await driver.findElement(By.id('timeInBtn'));
        await timeInBtn.click();

        // Wait for the message to appear
        await driver.wait(until.elementLocated(By.id('message')));
        const message = await driver.findElement(By.id('message')).getText();

        expect(message).to.include('User already timed in!');
    });

    it('User tries to time in with invalid session storage - should show error message', async function () {
        await driver.get(url);

        // Set invalid session storage
        await driver.executeScript("sessionStorage.setItem('id', 'invalid');");

        // Click the "Time In" button
        const timeInBtn = await driver.findElement(By.id('timeInBtn'));
        await timeInBtn.click();

        // Wait for the message to appear
        await driver.wait(until.elementLocated(By.id('message')));
        const message = await driver.findElement(By.id('message')).getText();

        expect(message).to.include('User not found!');
    });

    it('should display an error if no user ID in session', async function () {
        await driver.get(url);
    
        // Clear session storage to simulate no 'id'
        await driver.executeScript("sessionStorage.clear();");
    
        // Click the "Time In" button
        const timeInBtn = await driver.findElement(By.id('timeInBtn'));
        await timeInBtn.click();
    
        // Wait for the message to appear
        const message = await driver.findElement(By.id('message')).getText();
    
        expect(message).to.include('No user ID found in session.');
    });
    


    
    
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
        });


    // Additional test cases would follow a similar pattern

    after(() => driver && driver.quit());
});


