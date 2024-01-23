function updateUserTime(selectedId) {
    var response = "";
    var request = new XMLHttpRequest();

    request.open("PUT", "/update-user-time/" + selectedId, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);

        if (response.message == "User time updated successfully!") {
            // Handle success, maybe redirect or display a message
        } else if (response.message == "User already timed in!") {
            // Handle case where the user has already timed in
            alert('You have already timed in!');
        } else {
            // Handle other errors, maybe show an alert
            console.error('Unable to update user time!');
        }
    };

    request.send();
}


function callname(){
    var value = sessionStorage.getItem('name');
    console.log(value);
    return value;
}

function callpassword(){
    var value = sessionStorage.getItem('password');
   console.log(value);
    return value;
}

function call() {
    var response = '';
    var name = callname();
    var password = callpassword();
    var request = new XMLHttpRequest();

    request.open('GET', `/call/${name}/${password}`, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        
        response = JSON.parse(request.responseText);
            console.log('respose is ',response);
        var level = response;    
        const splitt= response.split('/');
        console.log(splitt)   
        console.log(splitt[0])
        sessionStorage.setItem("level", splitt[0])
        sessionStorage.setItem("id", splitt[1])    
           };
           console.log('level:',sessionStorage.getItem('level'))
    request.send();

}
function addProfile() {
	var response = "";

	var jsonData = new Object();
    jsonData.name = document.getElementById("Name").value;
    jsonData.password = document.getElementById("Password").value;
    jsonData.level = document.getElementById("Level").value;
    jsonData.date = document.getElementById("Date").value;
    jsonData.time_in = document.getElementById("Time_In").value;
	
	if (jsonData.name == "" || jsonData.password == "" || jsonData.date == "") {
		document.getElementById("message").innerHTML = 'All fields are required!';
		document.getElementById("message").setAttribute("class", "text-danger");
		return;
	}

	var request = new XMLHttpRequest();

	request.open("POST", "/add-resource", true);
	request.setRequestHeader('Content-Type', 'application/json');

	request.onload = function () {
		response = JSON.parse(request.responseText);

        if (response.message == undefined) {
			document.getElementById("message").innerHTML = 'Added Resouce: ' + jsonData.name + '!';
			document.getElementById("message").setAttribute("class", "text-success");

			document.getElementById("name").value = "";
			document.getElementById("location").value = "";
			document.getElementById("description").value = "";

			window.location.href = 'home.html';
		}
		else {
			document.getElementById("message").innerHTML = 'Unable to add resource!';			document.getElementById("message").setAttribute("class", "text-danger");
			document.getElementById("message").setAttribute("class", "text-danger");
		}
	};

	request.send(JSON.stringify(jsonData));
}

function callsession(){
    var pass='';
    var keys = Object.keys(sessionStorage);
    keys.forEach(function(key) {
        var value = sessionStorage.getItem(key);

        if(key=='password'){
            len= key.length
            for (var i=0;i<len;i++){
            pass +='*'
            }
            console.log(pass)
        }else{
        console.log(key + ": " + value);}

    });
}
function GetProfile() {
    
    var response = '';
    var request = new XMLHttpRequest();

    request.open('GET', '/get-profile', true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);
        //console.log(response);
        var html = ''
        for (var i = 0; i < response.length; i++)
        if (response[i].id === '1') {
            continue; // Skip this profile
        }else
        {
            html += '<tr>' +
                '<td>' + (i+1) + '</td>' +
                '<td>' + response[i].name + '</td>' +
                '<td>' + response[i].level + '</td>' +
                '<td>' + response[i].date + '</td>' +
                '<td>' + response[i].time_in + '</td>' +
                //'<td>' +
                  //  '<button type="button" class="btn btn-warning" onclick="editProfile(\'' + JSON.stringify(response[i]).replaceAll('\"', '&quot;') + '\')">Edit </button> ' + 
                   // '<button type="button" class="btn btn-danger" onclick="deleteProfile(' + response[i].id + ')"> Delete</button>' + 
                '</td>'+
            '</tr>'
        }

        document.getElementById('tableContent').innerHTML = html;
    };

    request.send();
}
//backup of get profile
/*function GetProfile() {
    
    var response = '';
    var request = new XMLHttpRequest();

    request.open('GET', '/get-profile', true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);
        
        var html = ''
        for (var i = 0; i < response.length; i++)
        {
            html += '<tr>' +
                '<td>' + (i+1) + '</td>' +
                '<td>' + response[i].name + '</td>' +
                '<td>' + response[i].level + '</td>' +
                '<td>' + response[i].date + '</td>' +
                '<td>' + response[i].time_in + '</td>' +
                '<td>' +
                    '<button type="button" class="btn btn-warning" onclick="editProfile(\'' + JSON.stringify(response[i]).replaceAll('\"', '&quot;') + '\')">Edit </button> ' + 
                    '<button type="button" class="btn btn-danger" onclick="deleteProfile(' + response[i].id + ')"> Delete</button>' + 
                '</td>'+
            '</tr>'
        }

        document.getElementById('tableContent').innerHTML = html;
    };

    request.send();
}
*/
function editProfile(data) {
    var selectedProfile = JSON.parse(data);
    //document.getElementById("editID").value = selectedProfile.id;
    document.getElementById("editName").value = selectedProfile.name;
    document.getElementById("editPassword").value = selectedProfile.password;
    document.getElementById("editLevel").value = selectedProfile.level;
    //if  (selectedProfile.date == null) {
      //  document.getElementById("editDate").value = "1";
    //}

    if  (selectedProfile.time_in == !null) {
        document.getElementById("editTIme_IN").value = selectedProfile.time_in;
    }
   // document.getElementById("editTime_In").value = selectedProfile.time_in;
   
    document.getElementById("updateButton").setAttribute("onclick", 'updateUser("' + selectedProfile.id + '")');

    $('#editProfileModal').modal('show'); 
}
function updateProfile(id) {
    console.log(id)
    var response = "";

    var jsonData = new Object();
    jsonData.name = document.getElementById("editName").value;
    jsonData.password = document.getElementById("editPassword").value;
    jsonData.level = document.getElementById("editLevel").value;
    jsonData.date = document.getElementById("editDate").value;
    jsonData.time_in = document.getElementById("editTime_In").value;
    if (jsonData.name == "" || jsonData.password == "" || jsonData.date == "") {
        document.getElementById("editMessage").innerHTML = 'All fields are required!';
        document.getElementById("editMessage").setAttribute("class", "text-danger");
        return;
    }

    var request = new XMLHttpRequest();

    request.open("PUT", "/edit-profile/" + id, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);

        if (response.message == "Profile modified successfully!") {
            document.getElementById("editMessage").innerHTML = 'Edited Profile: ' + jsonData.name + '!';
            document.getElementById("editMessage").setAttribute("class", "text-success");
            window.location.href = 'home.html';
        }
        else {
            document.getElementById("editMessage").innerHTML = 'Error occured,Unable to edit';
            document.getElementById("editMessage").setAttribute("class", "text-danger");
        }
    };

    request.send(JSON.stringify(jsonData));
}



function deleteProfile(selectedId) {
    var response = "";
    var request = new XMLHttpRequest();

    request.open("DELETE", "/delete-user/" + selectedId, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);

        if (response.message == "User deleted successfully!") {
            window.location.href = 'home.html';
        } else {
            alert('Unable to delete user!');
        }
    };

    request.send();

}


