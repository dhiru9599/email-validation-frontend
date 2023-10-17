let emails = document.querySelector("textarea");

function checkSize() {
    let emailStr = emails.value;
    let emailArr = emailStr.split(",");
    if (emailArr.length > 20) {
        return false
    }
    return true;
}

// Function to send a POST request to the server
function sendEmailsToServer(emails) {
    fetch('https://email-validation-git-main-dhiru9599.vercel.app/saveEmails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emails: emails })
    })
        .then(response => console.log(response.json()))
        .catch(error => console.error(error));
}

// Function to send a POST request to the server
async function getEmailsfromServer() {
    try {
        const response = await fetch('https://email-validation-git-main-dhiru9599.vercel.app/getEmails');
        const data = await response.json();
        console.log(data);

        const validArr = []
        const invalidArr = []
        data.map((doc) => {
            doc.valid.map(em => {
                if (em !== "") {
                    validArr.push(em)
                }
            });
            doc.invalid.map(em => {
                if (em !== "") {
                    invalidArr.push(em)
                }
            });
        })

        displayValidAndInvalidEmails(validArr, invalidArr);
    } catch (error) {
        console.log(err.message);
    }
}

// Function to display valid and invalid emails
function displayValidAndInvalidEmails(validEmails, invalidEmails) {
    const validList = document.getElementById('valid-emails-list');
    const invalidList = document.getElementById('invalid-emails-list');

    // Clear existing lists
    validList.innerHTML = '';
    invalidList.innerHTML = '';

    validEmails.forEach(email => {
        const li = document.createElement('li');
        li.textContent = email;
        validList.appendChild(li);
    });

    invalidEmails.forEach(email => {
        const li = document.createElement('li');
        li.textContent = email;
        invalidList.appendChild(li);
    });
}

// Handle form submission
document.getElementById('email-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const emailInput = document.getElementById('emails');
    if (!checkSize()) {
        alert("Email limit exceeded! Max - 20");
        return;
    }
    const emails = emailInput.value.split(',').map(email => email.trim());
    sendEmailsToServer(emails);
    emailInput.value = "";
    alert("Emails saved successfully!")
    getEmailsfromServer();
});

getEmailsfromServer()