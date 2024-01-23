
async function readUserJSON() {
    
    const userJSON = await fetch('path/to/user.json');
    const data = await userJSON.json();
  
    return data;
  }
  
  // Function to set the level in sessionStorage based on the name
  async function setLevelFromStorageName() {
    const storedName = sessionStorage.getItem('name');
  
    if (!storedName) {
      console.error('Name not found in sessionStorage');
      return;
    }
  
    try {
      const userJSON = await readUserJSON();
      const userProfile = userJSON.find((profile) => profile.name === storedName);
  
      if (userProfile) {
        const userLevel = userProfile.level;
        sessionStorage.setItem('level', JSON.stringify(userLevel));
      } else {
        console.error('User profile not found for the stored name');
      }
    } catch (error) {
      console.error('Error reading user JSON:', error);
    }
  }
  
  // Call the function whenever needed
  setLevelFromStorageName();
  