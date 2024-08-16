$(document).ready(function() {
    $('#signup-btn').click(async function(event) {
        event.preventDefault();
        
        let name = $('#name').val();
        let email = $('#email').val();
        let contactNo = $('#contact-no').val();
        
        // Retrieve user data from local storage
        let users = await retrieveUserData();

        // Check email if already used
        function isEmailAlreadyUsed(email) {
            return users.some(user => user.email.toLowerCase() === email.toLowerCase());
        }
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
        if (isEmailAlreadyUsed(email)) {
            $('#error-message').css('color', 'red');
            $('#error-message').text('The email address is already in use!');
            return;
        }
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

        // Show modal after validation
        $('#saveModal').css('display', 'block');
        $('.modal-content p').text('Are you sure you want to create this account?');
        $('#confirmSave').show();
        $('#cancelSave').show();
        console.log("Modal should be visible now");

        // Get the modal
        var $saveModal = $("#saveModal");

        // Get the <span> element that closes the modal
        var $saveSpan = $("#saveClose");

        // When the user clicks on <span> (x), close the modal
        $saveSpan.on("click", function() {
            console.log("Close button clicked");
            $saveModal.hide();
            console.log("Modal should be hidden now");
        });

        // When the user clicks anywhere outside of the modal, close it
        $(window).on("click", function(event) {
            if ($(event.target).is($saveModal)) {
            console.log("Clicked outside the modal");
            $saveModal.hide();
            console.log("Modal should be hidden now");
            }
        });
        
          // Confirm save button event handler
        $(document).on('click', '#confirmSave', async function(e) {
            console.log("Confirm save button clicked");
            e.preventDefault();

            // Clear previous error message
            $('#error-message').text('');

            // User object
            const userAccount = {
                name: name,
                email: email,
                contactNo: contactNo
            };

            // Add the user object to the local storage
            users.push(userAccount);
            await saveUserData(users);

            // Close the modal after a short delay
            setTimeout(function() {
                saveModal.style.display = "none";
                window.location.href = 'login.html';
            }, 2000);

            // Error message to check if email is already signed up
            if (isEmailAlreadySignedUp(email)) {
                // Show success message in the modal
                $('.modal-content p').text('Account created successfully!');
                $('#confirmSave').hide();
                $('#cancelSave').hide();
                console.log("Save successful message displayed");                       
                return;
            }
        });

        // Cancel save button event handler
        $(document).on('click', '#cancelSave', function(e) {
            e.preventDefault();
            // Close the modal
            $saveModal.hide();
            console.log("Cancel button clicked, modal should be hidden now");
        });
    });
});