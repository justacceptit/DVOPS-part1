function displayMessage(message, isError = false) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.style.color = isError ? '#d9534f' : '#5cb85c';
}

document.getElementById('timeInBtn').addEventListener('click', function() {
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

document.getElementById('timeOutBtn').addEventListener('click', function() {
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