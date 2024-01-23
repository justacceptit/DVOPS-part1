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
      } else {
        document.getElementById("error").innerHTML = 'Authentication failed!';
      }
    };
    request.send(JSON.stringify(jsonData));
  }
  
=======
	var response = "";
	
	var jsonData = new Object();
	jsonData.email = document.getElementById("name").value;
	jsonData.password = document.getElementById("password").value;

    var confirmPassword = document.getElementById("confirmPassword").value;
	
	if (jsonData.name == "" || jsonData.password == "" || confirmPassword == "") {
		document.getElementById("error").innerHTML = 'All fields are required!';
		return;
	} 
	else if (jsonData.password.length<3) {
		document.getElementById("error").innerHTML = 'Password is too short!';
		return;
	} 
    else if (jsonData.password != confirmPassword) {
		document.getElementById("error").innerHTML = 'Password does not match!';
		return;
	} 
	var request = new XMLHttpRequest();
	
	request.open("POST", "/register", true);
	request.setRequestHeader('Content-Type', 'application/json');

	request.onload = function() {
		response = JSON.parse(request.responseText);

		if (response.message == undefined) {
            window.location.href = 'index.html';
		}
		else {
			document.getElementById("error").innerHTML = 'Authentication failed!';
		}
	};
	
	request.send(JSON.stringify(jsonData));
}

