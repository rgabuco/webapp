$(document).ready(function() {
    const usersKey = 'users'; // Key for storing users in local storage

    // Retrieve user data from local storage
    function retrieveUserData() {
        let userData = [];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.startsWith('user_')) {
                let user = localStorage.getItem(key).split(';');
                userData.push({
                    email: key.substring(5),
                    fullName: user[0],
                    phoneNumber: user[1]
                });
            }
        }
        return userData;
    }

    // Save user data to the local storage
    function saveUserData(user) {
        localStorage.setItem('user_' + user.email.toLowerCase(), '${user.fullName};${user.phoneNumber}');
    }

    $('#signup-btn').click(function(event) {
        event.preventDefault();
        
        let fullName = $('#full-name').val();
        let phoneNumber = $('phone-number').val();
        let email = $('#email').val();

        // Retrieve user data from local storage
        const users = retrieveUserData();

        // Basic email validation
        function isValidEmail(email) {
            return email.indexOf('@') > 0 && email.indexOf('.') > email.indexOf('@') + 1 && email.indexOf('.') < email.length - 1
        }
        // Basic phone number validation
        function isValidPhoneNumber(phoneNumber) {
            return phoneNumber.length === 10 && /^\d+$/.test(phoneNumber);
        }

        // Check if email is already signed up
        function isEmailAlreadySignedUp(email) {
            for (let i = 0; i < userData.length; i++) {
                if(userData[i].email === email) {
                    return true;
                }
            }
            return false;
        }

        // Error message to validate email
        if (!isValidEmail(email)) {
            $('#error-message').css('color','red');
            $('#error-message').text('Please enter a valid email address!');
            return;
        } 
        // Error message to validate phone number
        if (!isValidPhoneNumber(phoneNumber)) {
            $('#error-message').css('color','red');
            $('#error-message').text('Invalid input. Please enter a valid phone number!');
            return;
        }
        // Error message to check if email is already signed up
        if (!isEmailAlreadySignedUp(email)) {
            $('#error-message').css('color','red');
            $('#error-message').text('Email is already signed up. Please login!');
            return;
        }

        // User object
        const user = {
            fullName: fullName,
            phoneNumber: phoneNumber,
            email: email
        };

        // Add the user object to the local storage
        saveUserData(user);

        // Optionally, log the array to see the updated list of users
        console.log(users);

        // Reset the form (this is optional)
        // $('form')[0].reset();

        // Provide some feedback to the user (this is optional)
        // alert('Account created successfully!')
    });
});
