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
