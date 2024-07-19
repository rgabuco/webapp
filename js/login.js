//Declare user role as a global variable
var userRole;

$(document).ready(function() {
  // Add event listener to login button
  $('#login-btn').on('click', function(event) {
    event.preventDefault(); // Prevent form submission

    // Store email and role input as variables
    let email = $('#email').val();
    userRole = $('#role').val();

    // Retrieve user data from localStorage
    let userData = retrieveUserData();

    // Check if email is present in user data
    // Check if email is present in user data
    let userExists = userData.some(user => user.email.toLowerCase() === email.toLowerCase());

    if (!userExists) {
      // Display error message if email is not found
      $('#error-message').css('color', 'red');
      $('#error-message').text('Error: Email not found. Please check your email or create a new account.');
    } else {
      // Navigate to studiosListing.html if email is found
      window.location.href = 'studiosListing.html';
    }
  });
});
