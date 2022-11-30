const newPostHandles = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    const response = await fetch('/api/dashboard', {
        method: 'POST',
        body: JSON.stringify({
            title,
            content
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.reload();
    }
    else {
        alert(response.statusText);
    }
};


console.log("File loaded");


document
    .querySelector('.dashboard-form')
    .addEventListener('submit', newPostHandles);