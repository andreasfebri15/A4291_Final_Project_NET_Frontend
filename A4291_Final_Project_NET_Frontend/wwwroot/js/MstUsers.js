async function fetchUsers() {
    const token = localStorage.getItem('jwtToken');
    const response = await fetch('/ApiMstUsers/GetAllUsers', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    if (!response.ok) {
        alert('Failed to fetch users');
        return;
    }


    const jsonData = await response.json();
    console.log(jsonData);

    if (jsonData.success) {
        populateUserTable(jsonData.data)
    } else {
        alert('No Users found.')
    }
}


function populateUserTable(users) {
    const userTableBody = document.querySelector('#tableBase tbody');
    userTableBody.innerHTML = '';


    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            
            <td class="text-center">${user.role}</td>
            <td class="text-center">${user.balance}</td>
            <td class="text-center">
             <a class="btn btn-primary" onclick="editUser('${user.id}')">Edit</a>
            <button class="btn btn-danger" onclick="deleteUser('${user.id}')">Delete</button>
            </td>
           
        `;

        userTableBody.appendChild(row);
    });
}

window.onload = fetchUsers()



function editUser(id) {
    const token = localStorage.getItem('jwtToken');

    fetch(`/ApiMstUsers/GetUserById/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                const user = data.data;

                document.getElementById('userName').value = user.name;
                document.getElementById('userRole').value = user.role;
                document.getElementById('userBalance').value = user.balance;
                document.getElementById('userId').value = user.id;

                // Set the dropdown to the user's role
               

                // Show the modal
                $('#editUserModal').modal('show');
            } else {
                alert('User not found');
            }
        })
        .catch(error => {
            alert('Error fetching user data: ' + error.message);
        });
}

function updateUser() {
    const id = document.getElementById('userId').value;
    const name = document.getElementById('userName').value;
    const role = document.getElementById('userRole').value;
    const balance = document.getElementById('userBalance').value;

    const ReqMstUsers = {
        name: name,
        role: role,
        balance: parseFloat(balance)
    };

    const token = localStorage.getItem('jwtToken');

    fetch(`/ApiMstUsers/UpdateUser/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ReqMstUsers)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            return response.json();
        })
        .then(data => {
            alert('User updated successfully!');
            $('#editUserModal').modal('hide');
            fetchUsers();
        })
        .catch(error => {
            alert('Error updating user: ' + error.message);
        });
}


function deleteUser(id) {
    const confirmation = confirm("Are you sure you want to delete this user?");

    if (!confirmation) {
        return;
    }

    const token = localStorage.getItem('jwtToken');

    fetch(`/ApiMstUsers/DeleteUser/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            return response.text();
        })
        .then(message => {
            alert(message);
            fetchUsers();
        })
        .catch(error => {
            alert('Error deleting user: ' + error.message);
        });
}

async function AddUser() {
    try {
        const name = document.getElementById('addName').value;
        const email = document.getElementById('addEmail').value;
        const role = document.getElementById('addRole').value;

        const reqRegisterDto = {
            name: name,
            email: email,
            role: role
        }
        console.log(reqRegisterDto);

        const token = localStorage.getItem('jwtToken');

        const response = await fetch(`/ApiMstUsers/AddUser`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqRegisterDto)
        })

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            $('#addUserModal').modal('hide');
            fetchUsers();
        }
        else {
            alert(result.message || 'Add user failed. Please try again.');
        }
    }
    catch (error) {
        alert('Errord adding user: ' + error.message)
    }
}


