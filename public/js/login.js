$(document).ready(function() {
  // Add event listener to login button
  $('#login-btn').on('click', async function(event) {
    event.preventDefault(); // Prevent form submission

    // Store email and role input as variables
    let email = $('#email').val();
    let userRole = $('#role').val();

    try {
      // Retrieve user data from server
      let userData = await retrieveUserData();

      // Check if userData is an array
      if (!Array.isArray(userData)) {
        throw new Error('Invalid user data format');
      }

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
        window.location.href = 'home.html';
      }
    } catch (error) {
      // Display error message if there is an issue with fetching user data
      $('#error-message').css('color', 'red');
      $('#error-message').text(`Error: ${error.message}`);
    }
  });
});
