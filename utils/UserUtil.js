const { time } = require('console');
const { User } = require('../models/User');
const fs = require('fs').promises;

async function readJSON(filename) {
  try {
    const data = await fs.readFile(filename, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function writeJSON(object, filename) {
  try {
    const allObjects = await readJSON(filename);
    allObjects.push(object);
    await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
    return allObjects;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function register(req, res) {
  try {
    
      const name=req.body.name;
      const password=req.body.password;
      const level=req.body.level;
      const time_in=req.body.time_in;
      const date=req.body.date;
  if (name.length < 3 || password.length < 6 || name.includes('@') || name.includes('#')) {
  return res.status(500).json({ message: 'Validation error' });
  } else {
  const newUser = new User(name, password,level,time_in,date);
  const updatedUsers = await writeJSON(newUser, 'utils/users.json');
  return res.status(201).json(updatedUsers);
  }
  } catch (error) {
  return res.status(500).json({ message: error.message });
  }
  }



// Validation checks done for login
async function login(req, res) {
  try {
    const name = req.body.name; // Renamed from fullname to name
    const password = req.body.password;
    const allUsers = await readJSON('utils/users.json');
    var validCredentials = false;
    
    for (var i = 0; i < allUsers.length; i++) {
      var currUser = allUsers[i];
      if (currUser.name == name && currUser.password == password) {
        // Must exist in the database
        validCredentials = true;
      }
    }

    if (validCredentials) {
      return res.status(201).json({ message: 'Login successful!' }); // Log In is a success
    } else {
      return res.status(500).json({ message: 'Invalid credentials!' }); // Log In is not a success
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;

    const allUsers = await readJSON('utils/users.json');

    var index = -1;

    for (var i = 0; i < allUsers.length; i++) {
      var currUser = allUsers[i];
      if (currUser.id == id)
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

async function updateUserTime(req, res) {
    try {
        const id = req.params.id;

        const allUsers = await readJSON('utils/users.json');

        const userIndex = allUsers.findIndex(user => user.id == id);

        if (userIndex !== -1) {
            const user = allUsers[userIndex];

            // Check if the user has already timed in
            if (user.time) {
                return res.status(400).json({ message: 'User already timed in!' });
            }

            // Update the "time" property to the current time
            user.time = new Date().toLocaleTimeString();

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


  readJSON,
  writeJSON,
  register,
  login,
  deleteUser,
  updateUserTime
};

