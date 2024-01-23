function displayMessage(message, isError = false) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.style.color = isError ? '#d9534f' : '#5cb85c';
}

document.getElementById('timeInBtn').addEventListener('click', function() {
    const userId = document.getElementById('userId').value;
    if (!userId) {
        displayMessage('Please enter a User ID.', true);
        return;
    }

    fetch(`/update-user-time/${userId}`, {
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

document.getElementById('timeOutBtn').addEventListener('click', function() {
    const userId = document.getElementById('userId').value;
    if (!userId) {
        displayMessage('Please enter a User ID.', true);
        return;
    }

    fetch(`/time-out/${userId}`, {
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