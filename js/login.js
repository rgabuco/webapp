$(document).ready(function() {
  // Add event listener to login button
  $('#login-btn').on('click', function(event) {
    event.preventDefault(); // Prevent form submission

    // Store email and role input as variables
    let email = $('#email').val();
    let userRole = $('#role').val();

    // Retrieve user data from localStorage
    let userData = retrieveUserData();

    // Check if email is present in user data
    let userExists = userData.some(user => user.email.toLowerCase() === email.toLowerCase());

    if (!userExists) {
      // Display error message if email is not found
      $('#error-message').css('color', 'red');
      $('#error-message').text('Error: Email not found. Please check your email or create a new account.');
    } else {
      // Store userLoggedIn and userRole in localStorage
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('userLoggedIn', email);

      // Navigate to studiosListing.html if email is found
      window.location.href = 'studiosListing.html';
    }
  });
});
