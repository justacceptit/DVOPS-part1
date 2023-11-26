
const { User } = require('../models/User');
const fs = require('fs').promises;




async function deleteUser(req, res) {
    try {
        const id = req.params.id;

        const allUsers = await readJSON('utils/users.json');

        var index = -1;

        for (var i = 0; i < allUsers.length; i++) {
            var curcurrUser = allUsers[i];
            if (curcurrUser.id == id)
                index = i;
        }

        if (index != -1) {
            allUsers.splice(index, 1);
            await fs.writeFile('utils/users.json', JSON.stringify(allUsers), 'utf8');
            return res.status(201).json({ message: 'User deleted successfully!' });
        } else {
            return res.status(500).json({ message: 'Error occurred, unable to delete!' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

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



module.exports = {
    deleteUser,readJSON
};