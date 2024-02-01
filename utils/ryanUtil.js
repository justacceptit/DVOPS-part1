const { readJSON } = require('./UserUtil')
const { User } = require('../models/User');
const fs = require('fs').promises;
async function deleteUser(req, res) {
    try {
      const id = req.params.id;
  
      const allUsers = await readJSON('utils/users.json');
  
      const userIndex = allUsers.findIndex(user => user.id == id);
  
      if (userIndex !== -1) {
        const userToDelete = allUsers[userIndex];
  
        // Check if the user has "level" as "2"
        if (userToDelete.level === '2') {
          const usersWithLevel2 = allUsers.filter(user => user.level === '2');
  
          // Check if the user to be deleted is the last user with "level" as "2"
          if (usersWithLevel2.length === 1 && usersWithLevel2[0].id === userToDelete.id) {
            return res.status(400).json({ message: 'Cannot delete the last user with level 2!' });
          }
        }
  
        allUsers.splice(userIndex, 1);
        await fs.writeFile('utils/users.json', JSON.stringify(allUsers), 'utf8');
        return res.status(201).json({ message: 'User deleted successfully!' });
      } else {
        return res.status(404).json({ message: 'User not found!' });
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
            if (user.time_in) {
                return res.status(400).json({ message: 'User already timed in!' });
            }

            // Update the "time" property to the current time
            user.time_in = new Date().toLocaleTimeString();
            user.date=new Date().toLocaleDateString();
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

async function updateUserTimeOut(req, res) {
  try {
    const id = req.params.id;

    const allUsers = await readJSON('utils/users.json');

    const userIndex = allUsers.findIndex(user => user.id == id);

    if (userIndex !== -1) {
      const user = allUsers[userIndex];

      // Check if the user has not timed in
      if (!user.time_in) {
        return res.status(400).json({ message: 'User has not timed in yet!' });
      }

      // Check if the user has already timed out
      if (user.time_out) {
        return res.status(400).json({ message: 'User already timed out!' });
      }

      // Update the "time_out" property to the current time
      user.time_out = new Date().toLocaleTimeString();

      // Save the updated users array to the file
      await fs.writeFile('utils/users.json', JSON.stringify(allUsers), 'utf8');

      return res.status(200).json({ message: 'User time out updated successfully!' });
    } else {
      return res.status(404).json({ message: 'User not found!' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


module.exports = {


    
    deleteUser,
    updateUserTime,
    updateUserTimeOut
  };
  