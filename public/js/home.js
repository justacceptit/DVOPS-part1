
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
function editpage() {
    window.location.href = 'edit.html';
}
function calendar() {
    window.location.href = 'calendar.html';
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
            } else {
                html += '<tr>' +
                    '<td>' + (i + 1) + '</td>' +
                    '<td>' + response[i].name + '</td>' +
                    '<td>' + response[i].level + '</td>' +
                    '<td>' + response[i].date + '</td>' +
                    '<td>' + response[i].time_in + '</td>' +
                    '<td>' +
                    '<button type="button" class="btn btn-warning" onclick="editProfile(\'' + JSON.stringify(response[i]).replaceAll('\"', '&quot;') + '\')">Edit </button> ' +
                    '<button type="button" class="btn btn-danger" onclick="deleteProfile(' + response[i].id + ')"> Delete</button>' +
                    '</td>' +
                    '</tr>'
            }

        document.getElementById('tableContent').innerHTML = html;
    };

    request.send();
}

function formatTimeForInput(timeString) {//headscratcher
    if(timeString=='Invalid Date'){
        console.log("NO TIMEEEE" ,timeString)
        return '';
    }
    //splits the value eg. 12:32 == 12 ,32 with the : as seperator
    const parts = timeString.split(':');
    //console.log(parts)
    if (parts.length === 3) {
        //padstart to check that there is a len of 2 for each parts
        return parts[0].padStart(2, '0') + ':' + parts[1].padStart(2, '0');
    } else {
        console.error('Invalid time string:', timeString);
        return '';
    }
}
function formatDateForInput(dateString) {//headscratcher.2
    if (dateString == 'Invalid Date') {
        console.log('no')
        return '';
    }
    const parts = dateString.split('/');
    if (parts.length === 3) {
        // Ensure that the date string is in the format "dd/MM/yyyy"
        const formattedDate = parts[2] + '-' + parts[1].padStart(2, '0') + '-' + parts[0].padStart(2, '0');
        return formattedDate;
    }
    
}

function editProfile(data) {
    var selectedProfile = JSON.parse(data);
    //console.log(selectedProfile);
    //document.getElementById("editID").value = selectedProfile.id;
    document.getElementById("editName").value = selectedProfile.name;
    document.getElementById("editPassword").value = selectedProfile.password;
    document.getElementById("editLevel").value = selectedProfile.level;
    if (selectedProfile.date) {
        const formattedDate = formatDateForInput(selectedProfile.date);
        document.getElementById("editDate").value = formattedDate;
    } else {
        document.getElementById("editDate").value = "";
    }

    if (selectedProfile.time_in) {
        const formattedTime = formatTimeForInput(selectedProfile.time_in);
        document.getElementById("editTime_In").value = formattedTime;
    } else {
        document.getElementById("editTime_In").value = "";
    }
    // document.getElementById("editDate").value = selectedProfile.date;
    //document.getElementById("editTime_In").value = selectedProfile.time_in;

    document.getElementById("updateButton").setAttribute("onclick", 'updateProfile("' + selectedProfile.id + '")');

    $('#editProfileModal').modal('show');
}

function updateProfile(id) {
    // console.log(id)
    var response = "";
    //console.log(response);
    var jsonData = new Object();
    jsonData.name = document.getElementById("editName").value;
    jsonData.password = document.getElementById("editPassword").value;
    jsonData.level = document.getElementById("editLevel").value;
    jsonData.date = document.getElementById("editDate").value;
    jsonData.time_in = document.getElementById("editTime_In").value;
    //console.log('time',jsonData.time_in.length);
    //Format Time from 24 hr to 12 hr     
    const timeString = jsonData.time_in;//call the json data
    
      //console.log('time',timeString.length);//error testing
    if(!timeString==''||timeString.length!==5 ){
        const timeobjt = new Date('2023-12-01T' + timeString)//Uk locale parameters below
        const timeformat = timeobjt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        //the seconds is there to meet the dumb requirement for hh:mm:ss format
        //  console.log(timeformat);//error testing
        jsonData.time_in = timeformat;
    
    
    }
    console.log('time json',jsonData.time_in)
    //Format Date from dd-mm-yyyy to dd/mm/yyyy
    const dateString = jsonData.date;//call the json data
    //console.log('date',dateString)
    if(!dateString==''){
        const dateobjt = new Date(dateString)//it didnt work when done in one line
        const dateformat = dateobjt.toLocaleDateString('en-GB');//Uk locale parameters
        //console.log(dateformat);
        jsonData.date = dateformat;
    
    }
    if (jsonData.name == "" ) {
        document.getElementById("editMessage").innerHTML = 'Please Input Name!';
        document.getElementById("editMessage").setAttribute("class", "text-danger");
        return;
    }else
    if (jsonData.password == "" ) {
        document.getElementById("editMessage").innerHTML = 'Please Input Password!';
        document.getElementById("editMessage").setAttribute("class", "text-danger");
        return;
    }else
    if (jsonData.date == "" ) {
        document.getElementById("editMessage").innerHTML = 'Please Input a proper Date!';
        document.getElementById("editMessage").setAttribute("class", "text-danger");
        return;
    }else
    if (jsonData.time_in == "Invalid Date" ) {
        document.getElementById("editMessage").innerHTML = 'Please fill in the Time!';
        document.getElementById("editMessage").setAttribute("class", "text-danger");
        return;
    }else
    if (jsonData.name == "" || jsonData.password == "" || jsonData.date == "" || jsonData.time_in == ""|| jsonData.time_in.length <= 5 ) {
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
            window.location.href = 'edit.html';
            console.log(jsonData.time_in);
        }
        else {
            console.log('No it didnt work')
            document.getElementById("editMessage").innerHTML = 'Error occured,Unable to edit';
            document.getElementById("editMessage").setAttribute("class", "text-danger");

        }
    };

    request.send(JSON.stringify(jsonData));
}
function deleteUser(selectedId) {
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


