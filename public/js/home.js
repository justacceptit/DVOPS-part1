

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
        else if (response.message == "User already timed in!") {
            // Handle case where the user has already timed in
            alert('You have already timed in!');
        }
        else {
            // Handle other errors, maybe show an alert
            console.error('Unable to update user time!');
        }
    };

    request.send();
}
