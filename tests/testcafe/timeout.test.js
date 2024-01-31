import { Selector, ClientFunction } from 'testcafe';
import fs from 'fs';
import path from 'path';

const url = 'http://localhost:5050/home.html';
let counter = 0;

fixture`Time Out Button Tests`
    .page(url)
    .beforeEach(async t => {
        const defaultUsers = [
            {"name":"ryan","password":"12345678","level":"1","date":"26/11/2023","time_in":"3:05:27 pm","id":"1","time_out":""},{"name":"edward","password":"12345678","level":"1","date":"26/11/2023","time_in":"","id":"2"},{"name":"john","password":"12345678","level":"1","date":"26/11/2023","time_in":"","id":"11"},{"name":"num1","password":"1234566","date":"20/01/2024","time_in":"","id":"1"},{"name":"testtwo","password":"12345678","level":"1","date":"26/11/2023","time_in":"","id":"11"},{"name":"dont touch","password":"1234566","level":"1","date":"27/11/2023","time_in":"","id":"113","time_out":""},{"name":"ryan","password":"12345678","level":"1","date":"26/11/2023","time_in":"3:05:27 pm","id":"1","time_out":""},{"name":"edward","password":"12345678","level":"1","date":"26/11/2023","time_in":"","id":"2"},{"name":"john","password":"12345678","level":"1","date":"26/11/2023","time_in":"","id":"11"},{"name":"testone","password":"12345678","level":"1","date":"24/01/2024","time_in":"02:48:00 am","id":"788","time_out":"2:46:57 pm"},{"name":"Jason Tan","password":"12345678","level":"1","date":"22/01/2024","time_in":"","id":"652"},{"name":"Jason TanTan","password":"123456","level":"1","date":"22/01/2024","time_in":"","id":"712"},{"name":"John Doe","password":"12345678","level":"1","date":"26/01/2024","time_in":"","id":"232","time_out":"7:12:20 pm"},{"name":"Test Test","password":"123456","level":"1","date":"22/01/2024","time_in":"","id":"065"},{"name":"ryanlimxy","password":"1234567","level":"2","date":"23/01/2024","time_in":"","id":"423"},{"name":"Testing Today","password":"12345678","level":"1","date":"23/01/2024","time_in":"","id":"028"},{"name":"Testing Today Again","password":"12345678","level":"1","date":"26/01/2024","time_in":"3:05:27 pm","id":"934","time_out":"3:10:27 pm"},{"name":"Testing Today","password":"12345678","level":"1","date":"23/01/2024","time_in":"","id":"028"},{"name":"RYAN TEST1","password":"12345678","level":"1","date":"26/01/2024","time_in":"","id":"312","time_out":""},{"name":"RYAN TEST2","password":"12345678","level":"1","date":"26/01/2024","time_in":"","id":"313","time_out":""},{"name":"RYAN TEST3","password":"12345678","level":"1","date":"26/01/2024","time_in":"","id":"312","time_out":""},{"name":"RYAN TEST4","password":"12345678","level":"1","date":"26/01/2024","time_in":"","id":"314","time_out":""},{"name":"RYAN TEST5","password":"12345678","level":"1","date":"26/01/2024","time_in":"","id":"315","time_out":""},{"name":"RYAN TEST5","password":"12345678","level":"1","date":"26/01/2024","time_in":"6:25:23 pm","id":"316","time_out":""},{"name":"RYAN TEST5","password":"12345678","level":"1","date":"26/01/2024","time_in":"","id":"315","time_out":""},{"name":"RYAN TEST5","password":"12345678","level":"1","date":"26/01/2024","time_in":"6:25:23 pm","id":"317","time_out":""}
        ];
        fs.writeFileSync(path.join(__dirname, '..', '..', 'utils', 'users.json'), JSON.stringify(defaultUsers), 'utf8');

    })
    .afterEach(async t => {
        // Code to handle coverage data if needed
        // You'll need to adapt this part for TestCafe if necessary
    });

test('Test Time In followed by Time Out - should show success messages', async t => {
    const setSessionStorage = ClientFunction((key, value) => sessionStorage.setItem(key, value));
    await setSessionStorage('id', '11');

    await t.click(Selector('#timeInBtn'));

    const message = Selector('#message');
    await t.expect(message.innerText).contains('User time updated successfully!');

    await t.click(Selector('#timeOutBtn'));
    await t.expect(message.innerText).contains('User time out updated successfully!');
});



test('Test Time Out when the User Has Already Timed Out - should show error message', async t => {
    const setSessionStorage = ClientFunction((key, value) => sessionStorage.setItem(key, value));
    await setSessionStorage('id', '934');

    await t.click(Selector('#timeOutBtn'));

    const message = Selector('#message');
    await t.expect(message.innerText).contains('User already timed out!');
});

test('should display an error if no user ID in session for Time Out', async t => {
    const clearSessionStorage = ClientFunction(() => sessionStorage.clear());
    await clearSessionStorage();

    await t.click(Selector('#timeOutBtn'));

    const message = Selector('#message');
    await t.expect(message.innerText).contains('No user ID found in session.');
});

test('should handle errors from the server on time out', async t => {
    const setSessionStorage = ClientFunction((key, value) => sessionStorage.setItem(key, value));
    await setSessionStorage('id', 'valid_user_id');

    // Use ClientFunction or t.eval to run code in the browser's context
    const mockFetchError = ClientFunction(() => {
        window.fetch = function() {
            return Promise.reject(new Error('Simulated fetch error'));
        };
    });
    await mockFetchError();

    await t.click(Selector('#timeOutBtn'));

    const message = Selector('#message');
    await t.expect(message.innerText).contains('Simulated fetch error');
});

// Additional tests can follow the same pattern
