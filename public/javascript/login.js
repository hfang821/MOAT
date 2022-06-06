import {modalAlert} from './modal.js'

async function loginFormHandler(event) {
    event.preventDefault();
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    const type = document.querySelector('input[name="resident-type"]:checked').value;

    if(email && password && type) {
        switch(type) {
            case "tenant":
                const result = await fetch('/api/tenants/login', {
                    method: 'post',
                    body: JSON.stringify({
                        email,
                        password
                    }),
                    headers: { 'Content-Type': 'application/json' }
                })
        
                if(result.ok) {
                    document.location.replace('/');
                } else {
                    modalAlert(`${result.statusText}. There was an error in your submission! Please try again.`);
                }
                break;
            case "landlord":
                const response = await fetch('/api/landlords/login', {
                    method: 'post',
                    body: JSON.stringify({
                        email,
                        password
                    }),
                    headers: { 'Content-Type': 'application/json' }
                })
        
                if(response.ok) {
                    document.location.replace('/');
                } else {
                    modalAlert(`${response.statusText}. There was an error in your submission! Please try again.`);
                }

                break;
        }

    }
}


document.querySelector('.signup').addEventListener('submit', loginFormHandler);