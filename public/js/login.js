
function login() {
	
	var response = "";
	
	var jsonData = new Object();
	jsonData.name = document.getElementById("name").value;
	jsonData.password = document.getElementById("password").value;
	
	if (jsonData.name == "" || jsonData.password == "") {
		document.getElementById("error").innerHTML = 'All fields are required!';
		return;
	} 

	var request = new XMLHttpRequest();
	
	request.open("POST", "/login", true);
	request.setRequestHeader('Content-Type', 'application/json');

	request.onload = function() {
		response = JSON.parse(request.responseText);

		if (response.message == "Login successful!") {
			sessionStorage.setItem("name", jsonData.name)
			sessionStorage.setItem("password", jsonData.password)
			sessionStorage.setItem("level",call(sessionStorage.getItem(call(jsonData.name))))
            window.location.href = 'home.html';
			
		}
		
		else {
			document.getElementById("error").innerHTML = 'Invalid credentials!';
		}
	};
	
	request.send(JSON.stringify(jsonData));
	

}

