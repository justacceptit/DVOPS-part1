function register() {
  
    var response = "";
    var jsonData = new Object();
    jsonData.name = document.getElementById("name").value;
    jsonData.password = document.getElementById("password").value;
    jsonData.level = document.getElementById("level").value;
  
    if (jsonData.name == "" || jsonData.password == "" || jsonData.level == "") {
      document.getElementById("error").innerHTML = 'All fields are required!';
      return;
    }
  
    var request = new XMLHttpRequest();
    request.open("POST", "/register", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function() {
      response = JSON.parse(request.responseText);
      console.log(response)
      if (response.message == undefined) {
        window.location.href = 'index.html';
        console.log('no')
      } else {
        document.getElementById("error").innerHTML = 'Authentication failed!';
      }
    };
    request.send(JSON.stringify(jsonData));
  }
  
