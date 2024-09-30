async function fetchSaldo() {
    const token = localStorage.getItem('jwtToken');
    const userid = localStorage.getItem('id');
    const response = await fetch(`/ApiMstUsers/GetUserById/${userid}`, {
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
    //console.log(jsonData);

    if (jsonData.success) {
        document.getElementById('Amount').textContent = jsonData.data.balance;
    } else {
        alert('No Users found.')
    }
}



window.onload = fetchSaldo()




async function addBalance() {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("jwtToken");
    const balanceInput = document.getElementById('balanceAmount').value;

    try {
        const response = await fetch(`/ApiMstUsers/GetUserById/${id}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data: ' + response.statusText);
        }

        const data = await response.json();


        if (data.success) {
            const addBalance = parseFloat(balanceInput);
            const userBalance = data.data.balance + addBalance;
            console.log('User Balance: ' + userBalance);
            const reqMstUserDto = {
                name: data.data.name,
                role: data.data.role,
                balance: userBalance
            };

            const updateResponse = await fetch(`/ApiMstUsers/UpdateUser/${id}`, {
                method: 'PUT',
                headers: {
                    "Authorization": "Bearer " + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqMstUserDto)
            });

            if (!updateResponse.ok) {
                throw new Error('Failed to add balance');
            }

            const updateData = await updateResponse.json();
            console.log(updateData);

            $('#addBalanceModal').modal('hide');
            alert('Balance added successfully');
            fetchSaldo();
        } else {
            alert('User not found');
        }
    } catch (error) {
        alert('Error: ' + error);
    }
}