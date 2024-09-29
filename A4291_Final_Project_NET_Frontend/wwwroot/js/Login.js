async function submitLogin() {
    try {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/ApiLogin/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {

            localStorage.setItem('id', result.data.id);
            localStorage.setItem('jwtToken', result.data.token);

            const token = result.data.token;

            const jwtPayLoad = JSON.parse(atob(token.split('.')[1]));
            console.log(jwtPayLoad);
            const role = jwtPayLoad["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            console.log(role);

            if (role === 'admin') {
                window.location.href = '/Admin/';
            } else if (role === 'Lender') {
                window.location.href = '/Lender/';
            } else if (role === 'Borrower') {
                window.location.href = '/Borrower/';
            }
            else {
                alert('Unauthorized role.');
            }
        } else {
            alert(result.message || 'Login failed. Please try again.');
        }
    }
    catch (error) {
        alert('An error occured while logging in: ' + error.message)
    }
}


async function Register() {

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;

    // Create a JSON object with the form data
    const formData = {
        name: name,
        email: email,
        role: role
    };


    try {
        

        const response = await fetch('/ApiMstUsers/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( formData )
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {

            document.getElementById('message').innerText = 'Registration successful!';
        } else {
            document.getElementById('message').innerText = `Registration failed: ${result.message}`;
        }
    }
    catch (error) {
        alert('An error occured while logging in: ' + error.message)
    }
}