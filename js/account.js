$(document).ready(function() {
  // Basic email validation
  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  // Basic phone number validation
  function isValidPhoneNumber(contactNo) {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(contactNo);
  }

  // Get the logged-in user's data
  let userEmail = localStorage.getItem('userLoggedIn');
  let userData = retrieveUserData();
  let userLoggedIn = userData.find(user => user.email.toLowerCase() === userEmail.toLowerCase());

  if (!userLoggedIn) {
    console.error('No user is logged in');
  } else {
    console.log('User logged in:', userLoggedIn);

    // Populate form fields with user data on page load
    $('#name').val(userLoggedIn.name);
    $('#contact-no').val(userLoggedIn.contactNo);
    $('#email').val(userLoggedIn.email);

    console.log('Form values set to:', {
      name: $('#name').val(),
      contactNo: $('#contact-no').val(),
      email: $('#email').val()
    });

    $('#name, #contact-no, #email').prop('disabled', true);
    $('#edit-btn').show();
    $('#save-btn, #cancel-btn').hide();
    $('#save-btn').css('background-color', 'grey').prop('disabled', true);

    console.log('Edit button shown, save and cancel buttons hidden');
  }

  // Enable editing
  $('#edit-btn').click(function() {
    $('#name, #contact-no, #email').prop('disabled', false);
    $('#edit-btn').hide();
    $('#save-btn, #cancel-btn').show();
  });

  // Cancel editing
  $('#cancel-btn').click(function() {
    console.log('Cancel button clicked');
    console.log('User logged in:', userLoggedIn);

    if (userLoggedIn) {
      $('#name').val(userLoggedIn.name);
      $('#contact-no').val(userLoggedIn.contactNo);
      $('#email').val(userLoggedIn.email);

      console.log('Form values reset to:', {
        name: $('#name').val(),
        contactNo: $('#contact-no').val(),
        email: $('#email').val()
      });

      $('#name, #contact-no, #email').prop('disabled', true);
      $('#edit-btn').show();
      $('#save-btn, #cancel-btn').hide();
      $('#save-btn').css('background-color', 'grey').prop('disabled', true);

      // Clear the error message
      $('#error-message').text('');

      console.log('Edit button shown, save and cancel buttons hidden');
    } else {
      console.error('No user is logged in');
    }
  });

  // Enable save button only if there are changes
  $('input').on('input', function() {
    let name = $('#name').val();
    let email = $('#email').val();
    let contactNo = $('#contact-no').val();
    
    //reset the background color
    $('#save-btn').css('background-color', 'grey').prop('disabled', true)

    if (name.trim() !== userLoggedIn.name.trim() || email.trim() !== userLoggedIn.email.trim() || contactNo.trim() !== userLoggedIn.contactNo.trim()) {
      $('#save-btn').css({'background-color': 'black', 'cursor': 'pointer'}).prop('disabled', false)
    } else {
        $('#save-btn').css('background-color', 'grey').prop('disabled', true);
    }
  });

  // Save changes
  $('#save-btn').click(function(event) {
    event.preventDefault();

    let name = $('#name').val();
    let email = $('#email').val();
    let contactNo = $('#contact-no').val();

    // Clear previous error message
    $('#error-message').text('');

    // Error message to validate email
    if (!isValidEmail(email)) {
        $('#error-message').css('color', 'red');
        $('#error-message').text('Please enter a valid email address!');
        return;
    }

    // Error message to validate phone number
    if (!isValidPhoneNumber(contactNo)) {
        $('#error-message').css('color', 'red');
        $('#error-message').text('Invalid input. Please enter a valid phone number!');
        return;
    }

    // Update the user object
    userLoggedIn.name = name;
    userLoggedIn.email = email;
    userLoggedIn.contactNo = contactNo;

    // Update the local storage
    saveUserData(userData);

    // Update the logged-in user email if changed
    localStorage.setItem('userLoggedIn', email);

    $('#error-message').css('color', 'green');
    $('#error-message').text('Account details updated successfully!');

    // Disable inputs and hide save/cancel buttons
    $('#name, #contact-no, #email').prop('disabled', true);
    $('#edit-btn').show();
    $('#save-btn, #cancel-btn').hide();
    $('#save-btn').css('background-color', 'grey').prop('disabled', true);
  });
});