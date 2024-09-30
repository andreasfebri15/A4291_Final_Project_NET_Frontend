async function fetchLoans() {
    const token = localStorage.getItem('jwtToken');

    const response = await fetch(`/ApiLoan/GetAllLoan/`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    if (!response.ok) {
        alert('Failed to fetch loans')
        return;
    }

    const jsonData = await response.json();

    //console.log(jsonData)
    if (jsonData.success) {
        populateLoansTable(jsonData.data);
    } else {
        alert('No loans found')
    }
}

function populateLoansTable(loans) {
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
            <td>${loan.borrowerName}</td>
            <td>${amount}</td>
            <td>${loan.interestRate} (2.5%)</td>
            <td>${loan.duration} months</td>
            <td>${loan.status}</td>
            <td>
                <input type="hidden" id="loanId" />
                <button class="btn btn-primary btn-sm" id="btnFund" onclick="editLoan('${loan.loanId}')">Fund</button>
            </td>
            `;
        loanTableBody.appendChild(row);
    });
}

window.onload = fetchLoans()