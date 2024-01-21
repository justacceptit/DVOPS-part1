function loginUser() {
    var fullname = document.getElementById("fullname").value;
    var password = document.getElementById("password").value;
  
    // You may want to perform additional validation here
  
    // Example: Sending login credentials to the server for authentication
    var request = new XMLHttpRequest();
    request.open("POST", "/login", true);
    request.setRequestHeader('Content-Type', 'application/json');
    
    var jsonData = {
      fullname: fullname,
      password: password
    };
  
    request.onload = function () {
      var response = JSON.parse(request.responseText);
  
      if (response.success) {
        // Authentication successful
        sessionStorage.setItem("fullname", fullname);
        // Redirect to the home page or perform other actions
        window.location.href = 'home.html';
      } else {
        // Authentication failed
        document.getElementById("message").innerHTML = 'Login failed. Please check your credentials.';
        document.getElementById("message").setAttribute("class", "text-danger");
      }
    };
  
    request.send(JSON.stringify(jsonData));
  }
  