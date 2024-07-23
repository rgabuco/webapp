$(document).ready(function() {
   
    // Retrieve user data from local storage
    function retrieveUserData() {
        let storedData = localStorage.getItem('userData');
        if (storedData) {
            return JSON.parse(storedData);
        }
        return [];
    }

    // Save user data to the local storage
    function saveUserData(userData) {
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    $('#signup-btn').click(function(event) {
        event.preventDefault();
        
        let name = $('#name').val();
        let email = $('#email').val();
        let contactNo = $('#contact-no').val();
        
        // Retrieve user data from local storage
        let users = retrieveUserData();

        // Basic email validation
        function isValidEmail(email) {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            return regex.test(email);
        }
        // Basic phone number validation
        function isValidPhoneNumber(contactNo) {
            return contactNo.length === 10 && /^\d+$/.test(contactNo);
        }
        // Check if email is already signed up
        function isEmailAlreadySignedUp(email) {
            return users.some(user => user.email === email);
        }

        // Clear previous error message
        $('#error-message').text('');

        // Error message to validate email
        if (!isValidEmail(email)) {
            $('#error-message').css('color','red');
            $('#error-message').text('Please enter a valid email address!');
            return;
        } 
        // Error message to validate phone number
        if (!isValidPhoneNumber(contactNo)) {
            $('#error-message').css('color','red');
            $('#error-message').text('Invalid input. Please enter a valid phone number!');
            return;
        }
        // Error message to check if email is already signed up
        if (isEmailAlreadySignedUp(email)) {
            $('#error-message').css('color','red');
            $('#error-message').text('Email is already signed up. Please login!');
            return;
        }

        // User object
        const userAccount = {
            name: name,
            email: email,
            contactNo: contactNo
        };

        // Add the user object to the local storage
        users.push(userAccount);
        saveUserData(users);

        window.location.href = 'studiosListing.html';
    });
});
