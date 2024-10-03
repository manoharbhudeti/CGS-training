let usernameValue = '';
let emailValue = '';
let passwordValue = '';
let nameoutput = document.getElementById('name1');

document.getElementById('username-continue').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    if (username.length > 0) {
        usernameValue = username; 
        console.log('Username:', usernameValue); 
        document.getElementById('username-group').style.display = 'none';
        document.getElementById('email-group').style.display = 'block';
    } else {
        alert("Please enter a valid username.");
    }
});

document.getElementById('email-continue').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    if (email.includes('@') && email.includes('.')) {
        emailValue = email; 
        console.log('Email:', emailValue); 
        document.getElementById('email-group').style.display = 'none';
        document.getElementById('password-group').style.display = 'block';
    } else {
        alert("Please enter a valid email address.");
    }
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
    const password = document.getElementById('password').value;
    if (password.length < 6) {
        alert("Password should be at least 6 characters long.");
        event.preventDefault();
    } else {
        passwordValue = password; 
        console.log('Password:', passwordValue); 

    
        console.log('Signup Details:');
        console.log('Username:', usernameValue);
        console.log('Email:', emailValue);
        console.log('Password:', passwordValue);

        alert("Signup successful!");
    
    }
});
