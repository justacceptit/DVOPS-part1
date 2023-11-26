
const { User } = require('../models/User');
const fs = require('fs').promises;






async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) { console.error(err); throw err; }
}

async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        allObjects.push(object);

        await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
        return allObjects;
    } catch (err) { console.error(err); throw err; }
}

async function updateUserTime(req, res) {
    try {
        const id = req.params.id;

        const allUsers = await readJSON('utils/users.json');

        const userIndex = allUsers.findIndex(user => user.id == id);

        if (userIndex !== -1) {
            // Update the "time" property to the current time
            allUsers[userIndex].time = new Date().toLocaleTimeString();

            // Save the updated users array to the file
            await fs.writeFile('utils/users.json', JSON.stringify(allUsers), 'utf8');

            return res.status(200).json({ message: 'User time updated successfully!' });
        } else {
            return res.status(404).json({ message: 'User not found!' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
    deleteUser,readJSON,updateUserTime
};