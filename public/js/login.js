const loginHandles = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if(username && password){
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({username: username, password}),
            headers: {'Content-Type' : 'application/json'},
        });

        if(response.ok){
            document.location.replace('/dashboard');
        }
        else {
            alert("Account is not created")
        }
    }
};

document
    .querySelector('login-form')
    .addEventListener('submit', loginHandles);