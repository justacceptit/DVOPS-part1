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
    const fullname = req.body.fullname;
    const password = req.body.password;

    // Validation checks done for registration
    if (fullname.length < 3 || password.length < 6 ) {
      return res.status(500).json({ message: 'Validation error' });
    } else {
      const newUser = new User(fullname, password);
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
  const fullname = req.body.fullname;
  const password = req.body.password;
  const allUsers = await readJSON('utils/users.json');
  var validCredentials = false;
  for (var i = 0; i < allUsers.length; i++) {
  var currUser = allUsers[i];
  if (currUser.fullname == fullname && currUser.password == password)
  validCredentials = true;
  }
  if (validCredentials) {
  return res.status(201).json({ message: 'Login successful!' });
  } else {
  return res.status(500).json({ message: 'Invalid credentials!' });
  }
  } catch (error) {
  return res.status(500).json({ message: error.message });
  }
  }

module.exports = {
  readJSON,
  writeJSON,
  register,
  login
};

