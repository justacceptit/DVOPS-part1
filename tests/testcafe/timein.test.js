import { Selector, ClientFunction } from 'testcafe';
import fs from 'fs';
import path from 'path';

const url = 'http://localhost:5050/home.html';
let counter = 0;

fixture`Time In UI Tests`
    .page(url)
    .beforeEach(async t => {
        const defaultUsers = [
            {"name":"ryan","password":"12345678","level":"1","date":"26/11/2023","time_in":"3:05:27 pm","id":"1","time_out":""},{"name":"edward","password":"12345678","level":"1","date":"26/11/2023","time_in":"","id":"2"},{"name":"john","password":"12345678","level":"1","date":"26/11/2023","time_in":"","id":"11"},{"name":"num1","password":"1234566","date":"20/01/2024","time_in":"","id":"1"},{"name":"testtwo","password":"12345678","level":"1","date":"26/11/2023","time_in":"","id":"11"},{"name":"dont touch","password":"1234566","level":"1","date":"27/11/2023","time_in":"","id":"113","time_out":""},{"name":"ryan","password":"12345678","level":"1","date":"26/11/2023","time_in":"3:05:27 pm","id":"1","time_out":""},{"name":"edward","password":"12345678","level":"1","date":"26/11/2023","time_in":"","id":"2"},{"name":"john","password":"12345678","level":"1","date":"26/11/2023","time_in":"","id":"11"},{"name":"testone","password":"12345678","level":"1","date":"24/01/2024","time_in":"02:48:00 am","id":"788","time_out":"2:46:57 pm"},{"name":"Jason Tan","password":"12345678","level":"1","date":"22/01/2024","time_in":"","id":"652"},{"name":"Jason TanTan","password":"123456","level":"1","date":"22/01/2024","time_in":"","id":"712"},{"name":"John Doe","password":"12345678","level":"1","date":"26/01/2024","time_in":"","id":"232","time_out":"7:12:20 pm"},{"name":"Test Test","password":"123456","level":"1","date":"22/01/2024","time_in":"","id":"065"},{"name":"ryanlimxy","password":"1234567","level":"2","date":"23/01/2024","time_in":"","id":"423"},{"name":"Testing Today","password":"12345678","level":"1","date":"23/01/2024","time_in":"","id":"028"},{"name":"Testing Today Again","password":"12345678","level":"1","date":"26/01/2024","time_in":"","id":"934","time_out":""},{"name":"Testing Today","password":"12345678","level":"1","date":"23/01/2024","time_in":"","id":"028"},{"name":"RYAN TEST1","password":"12345678","level":"1","date":"26/01/2024","time_in":"","id":"312","time_out":""},{"name":"RYAN TEST2","password":"12345678","level":"1","date":"26/01/2024","time_in":"","id":"313","time_out":""},{"name":"RYAN TEST3","password":"12345678","level":"1","date":"26/01/2024","time_in":"","id":"312","time_out":""},{"name":"RYAN TEST4","password":"12345678","level":"1","date":"26/01/2024","time_in":"","id":"314","time_out":""},{"name":"RYAN TEST5","password":"12345678","level":"1","date":"26/01/2024","time_in":"","id":"315","time_out":""},{"name":"RYAN TEST5","password":"12345678","level":"1","date":"26/01/2024","time_in":"6:25:23 pm","id":"316","time_out":""},{"name":"RYAN TEST5","password":"12345678","level":"1","date":"26/01/2024","time_in":"","id":"315","time_out":""},{"name":"RYAN TEST5","password":"12345678","level":"1","date":"26/01/2024","time_in":"6:25:23 pm","id":"317","time_out":""}
        ];
        fs.writeFileSync(path.join(__dirname, '..', '..', 'utils', 'users.json'), JSON.stringify(defaultUsers), 'utf8');

    })
    .afterEach(async t => {
        // Code to handle coverage data if needed
        // You'll need to adapt this part for TestCafe if necessary
    });

test('should find the Time In and Time Out buttons', async t => {
    const timeInBtn = Selector('#timeInBtn');
    const timeOutBtn = Selector('#timeOutBtn');

    await t.expect(timeInBtn.exists).ok();
    await t.expect(timeOutBtn.exists).ok();
});

test('User first time in - should show success message', async t => {
    const getSessionStorage = ClientFunction(() => sessionStorage.getItem('id'));
    const setSessionStorage = ClientFunction(id => sessionStorage.setItem('id', id));
    
    await setSessionStorage('232');
    await t.click(Selector('#timeInBtn'));

    const message = Selector('#message');
    await t.expect(message.innerText).contains('User time updated successfully!');
});

test('User tries to time in again - should show already timed in message', async t => {
    const setSessionStorage = ClientFunction(id => sessionStorage.setItem('id', id));

    await setSessionStorage('232');
    await t.click(Selector('#timeInBtn'));
    // Wait for some time or perform some operation to ensure time in is processed
    await t.click(Selector('#timeInBtn'));

    const message = Selector('#message');
    await t.expect(message.innerText).contains('User already timed in!');
});

test('User tries to time in with invalid session storage - should show error message', async t => {
    const setSessionStorage = ClientFunction(id => sessionStorage.setItem('id', id));

    await setSessionStorage('invalid');
    await t.click(Selector('#timeInBtn'));

    const message = Selector('#message');
    await t.expect(message.innerText).contains('User not found!');
});

test('should display an error if no user ID in session', async t => {
    const clearSessionStorage = ClientFunction(() => sessionStorage.clear());

    await clearSessionStorage();
    await t.click(Selector('#timeInBtn'));

    const message = Selector('#message');
    await t.expect(message.innerText).contains('No user ID found in session.');
});

// Additional test cases would follow a similar pattern
