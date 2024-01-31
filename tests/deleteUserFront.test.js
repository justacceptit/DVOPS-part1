const { Builder, By, until, Key, Alert } = require('selenium-webdriver');
const { expect } = require('chai');
const fs = require('fs');
const path = require('path'); // Import path module here
var counter = 0

describe('Delete User Tests', function () {
    this.timeout(30000);
    let driver;
    let url = 'http://localhost:5050/instrumented/edit.html'; 

    before(async function () {


        driver = await new Builder().forBrowser('firefox').build();
        await driver.get(url);
    });

    it('should find and delete user Edward and verify deletion', async function () {
        // Wait for the table to load
        await driver.wait(until.elementLocated(By.css('table.table')));

        // Find the row with the user 'Edward' and click the 'Delete' button in that row
        const userRow = await driver.findElement(By.xpath("//tr[td[contains(text(), 'edward')]]"));
        const deleteButton = await userRow.findElement(By.xpath(".//button[contains(text(), 'Delete')]"));
        await deleteButton.click();

        // Handle the confirmation dialog
        const alert = await driver.switchTo().alert();
        await alert.accept();

        // Wait for the alert to show up after the XMLHttpRequest call has been completed
        await driver.wait(until.alertIsPresent());
        const successAlert = await driver.switchTo().alert();
        const alertText = await successAlert.getText();
        await successAlert.accept(); // Close the success alert

        // Verify the alert text to confirm successful deletion
        expect(alertText).to.include('User deleted successfully'); // Replace with the actual success message

        await driver.navigate().refresh();

        // Wait for the table to load again
        await driver.wait(until.elementLocated(By.css('table.table')));



        // Verify the user 'Edward' is no longer in the table
        const userRowsAfterDeletion = await driver.findElements(By.xpath("//tr[td[contains(text(), 'edward')]]"));
        expect(userRowsAfterDeletion.length).to.equal(0, 'User Edward should be deleted from the table.');

        // Optionally, you may need to wait for any asynchronous updates that occur after deletion
    });

    afterEach(async function () {
        await driver.executeScript('return window.__coverage__;').then(async (coverageData) => {
        if (coverageData) {
        // Save coverage data to a file
        await fs.writeFile('coverage-frontend/coveragedelete'+ counter++ + '.json',
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



    after(() => driver && driver.quit());
});
