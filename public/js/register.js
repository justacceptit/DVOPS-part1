function register() {
    var response = "";
    var jsonData = new Object();
    jsonData.name = document.getElementById("name").value;
    jsonData.password = document.getElementById("password").value;
    jsonData.level = document.getElementById("level").value;
  
    // Reset error message before validation
    document.getElementById("error").innerHTML = '';
  
    if (jsonData.name == "" || jsonData.password == "" || jsonData.level == "") {
        document.getElementById("error").innerHTML = 'All fields are required!';
        return;
    }
  
    // Add additional validation logic based on UserUtil.js
    if (jsonData.password.length < 6) {
        // Update the error message for password length validation
        document.getElementById("error").innerHTML = 'Password must be at least 6 characters!';
        return;
    }
  
    // Continue with the registration logic
    var request = new XMLHttpRequest();
    request.open("POST", "/register", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
      try {
          response = JSON.parse(request.responseText);
  
          if (response.message === undefined) {
              window.location.href = 'index.html';
          } else {
              document.getElementById("error").innerHTML = 'Authentication failed!';
          }
      } catch (error) {
          console.error('Error parsing response:', error);
          console.log('Raw response:', request.responseText);
          // Handle the error appropriately, e.g., display an error message
      }
    };
  
    request.send(JSON.stringify(jsonData));
  }
  
  