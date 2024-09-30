async function fetchBorrowerLoans() {
    const borrowerId = localStorage.getItem('id');
    //const token = localStorage.getItem('jwtToken');

    const response = await fetch(`/ApiLoan/GetLoans?borrowerId=${borrowerId}`, {
        method: 'GET'
    });
    console.log(response);

    if (!response.ok) {
        alert('Failed to fetch loans')
        return;
    }

    const jsonData = await response.json();

    console.log(jsonData)
    if (jsonData.success) {
        populateBorrowerLoansTable(jsonData.data);
    } else {
        alert('No loans found')
    }
}

function populateBorrowerLoansTable(loans) {
    const loanTableBody = document.querySelector('#tableBase tbody');
    loanTableBody.innerHTML = '';
    loans.forEach(loan => {
        const currencyFormat = new Intl.NumberFormat('en-ID', {
            style: 'currency',
            currency: 'IDR'
        });
        amount = currencyFormat.format(loan.amount)
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="text-center">${amount}</td>
            <td class="text-center">${loan.interestRate} (2.5%)</td>
            <td class="text-center">${loan.duration} Bulan</td>
            <td class="text-center">${loan.status}</td>
            <td class="text-center">
                <button class="btn btn-primary btn-sm ">Detail</button>
            </td>
            `;
        loanTableBody.appendChild(row);
    });
}
window.onload = fetchBorrowerLoans()


async function RequestLoan() {
    try {
        const borrowerId = localStorage.getItem('id');
        const amount = document.getElementById('amount').value;

        const reqLoanDto = {
            borrowerId: borrowerId,
            amount: parseFloat(amount)
        }
        console.log(reqLoanDto);

        //const token = localStorage.getItem('jwtToken');

        const response = await fetch('/ApiLoan/CreateLoan/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqLoanDto)
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            $('#addLoanModal').modal('hide');
            fetchBorrowerLoans();
        }
        else {
            alert(result.message || 'Request loan failed. Please try again.');
        }
    }
    catch (error) {
        alert('Errord requesting loan: ' + error.message);
    }
}