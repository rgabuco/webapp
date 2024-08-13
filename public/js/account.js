$(document).ready(async function() {
  console.log("Document is ready");

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
  console.log("User email from localStorage:", userEmail);

  let userData;
  try {
    userData = await retrieveUserData(); // Await the promise
    console.log("User data retrieved:", userData);
  } catch (error) {
    console.error('Failed to retrieve user data', error);
    return;
  }

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
  $(document).on('click', '#edit-btn', function() {
    console.log("Edit button clicked");
    $('#name, #contact-no, #email').prop('disabled', false);
    $('#edit-btn').hide();
    $('#save-btn, #cancel-btn').show();
  });

  // Cancel editing
  $(document).on('click', '#cancel-btn', function() {
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
    
    console.log("Input changed:", { name, email, contactNo });

    // Reset the background color
    $('#save-btn').css('background-color', 'grey').prop('disabled', true);

    if (name.trim() !== userLoggedIn.name.trim() || email.trim() !== userLoggedIn.email.trim() || contactNo.trim() !== userLoggedIn.contactNo.trim()) {
      $('#save-btn').css({'background-color': 'black', 'cursor': 'pointer'}).prop('disabled', false);
      console.log("Save button enabled");
    } else {
      $('#save-btn').css('background-color', 'grey').prop('disabled', true);
      console.log("Save button disabled");
    }
  });

  /* SAVE WITH MODAL */
  // Show the modal when save button is clicked
  $(document).on('click', '#save-btn', function(e) {
    e.preventDefault();
    console.log("Save button clicked");
    $('#saveModal').css('display', 'block');
    $('.modal-content p').text('Are you sure you want to save the changes?');
    $('#confirmSave').show();
    $('#cancelSave').show();
    console.log("Modal should be visible now");
  });

  // Get the modal
  var saveModal = document.getElementById("saveModal");

  // Get the <span> element that closes the modal
  var saveSpan = document.getElementById("saveClose");

  // When the user clicks on <span> (x), close the modal
  saveSpan.onclick = function() {
    console.log("Close button clicked");
    saveModal.style.display = "none";
    console.log("Modal should be hidden now");
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == saveModal) {
      console.log("Clicked outside the modal");
      saveModal.style.display = "none";
      console.log("Modal should be hidden now");
    }
  }

  // Confirm save button event handler
  $(document).on('click', '#confirmSave', async function(e) { // Add async here
    console.log("Confirm save button clicked");
    e.preventDefault();

    let name = $('#name').val();
    let email = $('#email').val();
    let contactNo = $('#contact-no').val();

    console.log("Form values to save:", { name, email, contactNo });

    // Clear previous error message
    $('#error-message').text('');

    // Error message to validate email
    if (!isValidEmail(email)) {
      console.error("Invalid email address");
      $('#error-message').css('color', 'red');
      $('#error-message').text('Please enter a valid email address!');
      return;
    }

    // Error message to validate phone number
    if (!isValidPhoneNumber(contactNo)) {
      console.error("Invalid phone number");
      $('#error-message').css('color', 'red');
      $('#error-message').text('Invalid input. Please enter a valid phone number!');
      return;
    }

    // Update the user object
    userLoggedIn.name = name;
    userLoggedIn.email = email;
    userLoggedIn.contactNo = contactNo;

    console.log("User object updated:", userLoggedIn);

    // Save the updated user data
    await saveUserData(userData);
    console.log("User data saved");

    // Update the userData.ownerEmail in studioData
    let studioData;
    try {
      studioData = await retrieveStudioData(); // Re-fetch studio data
      console.log("Studio data retrieved:", studioData);
    } catch (error) {
      console.error('Failed to retrieve studio data', error);
      return;
    }

    // Log the ownerEmail of each studio before filtering
    studioData.forEach(studio => {
      console.log(`Studio: ${studio.name}, ownerEmail: ${studio.ownerEmail}`);
    });

    console.log("Filtering studios with ownerEmail:", userEmail);

    if (Array.isArray(studioData)) {
      let studios = studioData.filter(studio => studio.ownerEmail.toLowerCase() === userEmail.toLowerCase());
      console.log("Filtered studios with matching ownerEmail:", studios);

      studios.forEach(studio => {
        console.log(`Updating studio: ${studio.name}, old ownerEmail: ${studio.ownerEmail}, new ownerEmail: ${email}`);
        studio.ownerEmail = email; // Update the ownerEmail
      });

      await saveStudioData(studioData); // Save updated studio data
      console.log("Studio data updated");
    } else {
      console.error('Failed to retrieve studio data or studio data is not an array');
    }

    // Update the local storage after updating studio data
    localStorage.setItem('userLoggedIn', email);
    userEmail = email; // Update userEmail to the new email
    console.log("Local storage updated with new email:", email);

    // Show success message in the modal
    $('.modal-content p').text('Save successful.');
    $('#confirmSave').hide();
    $('#cancelSave').hide();
    console.log("Save successful message displayed");

    // Close the modal after a short delay
    setTimeout(function() {
      saveModal.style.display = "none";
      console.log("Modal should be hidden now after delay");
    }, 2000);

    // Disable inputs and hide save/cancel buttons
    $('#name, #contact-no, #email').prop('disabled', true);
    $('#edit-btn').show();
    $('#save-btn, #cancel-btn').hide();
    $('#save-btn').css('background-color', 'grey').prop('disabled', true);
  });

  // Cancel save button event handler
  $(document).on('click', '#cancelSave', function() {
    console.log("Cancel save button clicked");
    // Close the modal
    saveModal.style.display = "none";
    console.log("Modal should be hidden now");
  });
});
