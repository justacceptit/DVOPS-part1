function displayMessage(message, isError = false) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.style.color = isError ? '#d9534f' : '#5cb85c';
}

document.getElementById('timeInBtn').addEventListener('click', function () {
    const id = sessionStorage.getItem('id');
    if (!id) {
        displayMessage('No user ID found in session.', true);
        return;
    }

    fetch(`/update-user-time/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            displayMessage(data.message);
        })
        .catch(error => {
            displayMessage(error.message, true);
        });
});

document.getElementById('timeOutBtn').addEventListener('click', function () {
    const id = sessionStorage.getItem('id');
    if (!id) {
        displayMessage('No user ID found in session.', true);
        return;
    }

    fetch(`/time-out/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            displayMessage(data.message);
        })
        .catch(error => {
            displayMessage(error.message, true);
        });
});
async function deleteUser(userId) {
    return new Promise((resolve, reject) => {


        if (!userId) {
            alert('User ID is missing.');
            reject(new error('User ID is missing.'))
            return;
        }

        if (!confirm('Are you sure you want to delete this user?')) {
            reject(new error('never delete user.'))
            return;
        }

        const request = new XMLHttpRequest();
        request.open("DELETE", "/delete-user/" + userId, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    const data = JSON.parse(request.responseText);
                    alert(data.message);
                    resolve(data.message);
                    GetProfileEdit(); // Refresh the user list
                } else {

                    const errorData = JSON.parse(request.responseText);
                    alert(errorData.message);

                }
            }
        };

        request.onerror = function () {
            alert('Error: ' + request.statusText);
        };

        request.send();

    }).then(() => {
        // Add a delay before redirecting to "home.html"
        return new Promise((resolve) => {
            setTimeout(() => {
                window.location.href = "home.html";
                resolve();
            }, 2000);
        });
    });
}