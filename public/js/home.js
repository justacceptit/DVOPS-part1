

function deleteUser(selectedId) {
    var response = "";

    var request = new XMLHttpRequest();

    request.open("DELETE", "/delete-user/" + selectedId, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);

        if (response.message == "User deleted successfully!") {
            window.location.href = 'home.html';
        }
        else {
            alert('Unable to delete user!');
        }
    };

    request.send();
}

function updateUserTime(selectedId) {
    var response = "";

    var request = new XMLHttpRequest();

    request.open("PUT", "/update-user-time/" + selectedId, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);

        if (response.message == "User time updated successfully!") {
            // Handle success, maybe redirect or display a message
        }
        else {
            // Handle error, maybe show an alert
            console.error('Unable to update user time!');
        }
    };

    request.send();
}

