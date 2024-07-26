$(document).ready(function () {
  // Initialize dummy data if needed
  createDummyData(); // Ensure this function is called

  // Function to retrieve the current user from localStorage
  function getCurrentUser() {
    const currentUserEmail = localStorage.getItem('userLoggedin');
    console.log('Retrieved userLoggedin:', currentUserEmail); // Debug log
    if (currentUserEmail) {
      const users = retrieveUserData();
      console.log('Retrieved users:', users); // Debug log
      return users.find(user => user.email === currentUserEmail) || null;
    }
    console.error('No current user found in localStorage.');
    return null;
  }

  // Function to retrieve studio data from localStorage
  function retrieveStudioData() {
    let storedData = localStorage.getItem('studioData');
    if (storedData) {
      return JSON.parse(storedData);
    }
    return [];
  }

  // Function to create HTML for a studio box
  function createStudioBox(studio) {
    return `
      <div class="studio-box">
        <h3>${studio.name}</h3>
        <p>${studio.address}</p>
        <p>${studio.neighborhood}</p>
        <p>${studio.size} sqm</p>
        <p>${studio.type}</p>
        <p>${studio.capacity}</p>
        <p>Parking: ${studio.hasParking}</p>
        <p>Public Transport: ${studio.hasPublicTransport}</p>
        <p>Availability: ${studio.availability}</p>
        <p>Rental Term: ${studio.rentalTerm}</p>
        <p>Price per Term: $${studio.pricePerTerm}</p>
        <button id="show-contact-info-btn" data-owner-email="${studio.ownerEmail}">Show Contact Info</button>
      </div>
    `;
  }

  // Retrieve studio data from localStorage
  const studioData = JSON.parse(localStorage.getItem('selectedStudio'));
  if (!studioData) {
    alert('No studio data found!');
    window.location.href = 'studiolisting.html'; // Redirect if no data
    return;
  }

  // Display studio details
  $('#studio-details').html(`
    <h1>${studioData.name}</h1>
    <p><strong>Address:</strong> ${studioData.address}</p>
    <p><strong>Size:</strong> ${studioData.size + ' sqm'}</p>
    <p><strong>Type:</strong> ${studioData.type}</p>
    <p><strong>Capacity:</strong> ${studioData.capacity}</p>
    <p><strong>Parking Available:</strong> ${studioData.hasParking}</p>
    <p><strong>Public Transport Available:</strong> ${studioData.hasPublicTransport}</p>
    <p><strong>Availability:</strong> ${studioData.availability}</p>
    <p><strong>Rental Term:</strong> ${studioData.rentalTerm}</p>
    <p><strong>Price per Term:</strong> $${studioData.pricePerTerm}</p>
  `);

  // Retrieve current user data
  const currentUser = getCurrentUser();
  if (!currentUser) {
    console.error('Current user is not available.');
    return;
  }

  // Hide contact form if the studio is owned by the current user
  const contactForm = $('#contact-form');
  if (contactForm.length) {
    if (studioData.ownerEmail.toLowerCase() === currentUser.email.toLowerCase()) {
      contactForm.hide(); // Hide contact form
    } else {
      contactForm.show(); // Show contact form if not owned by current user
    }
  } else {
    console.warn('Contact form not found in the DOM.');
  }

  // Check ownership and set button visibility
  const editButton = $('#edit-studio-button');
  if (editButton.length) {
    if (localStorage.getItem('userRole') === 'owner' && studioData.ownerEmail.toLowerCase() === currentUser.email.toLowerCase()) {
      editButton.show(); // Show edit button
    } else {
      editButton.hide(); // Hide edit button
    }
  } else {
    console.warn('Edit button not found in the DOM.');
  }

  // Show "Add Studio" button only if the user is an owner
  const addButton = $('#add-studio-button');
  if (addButton.length) {
    if (localStorage.getItem('userRole') === 'owner') {
      addButton.show(); // Show add button
    } else {
      addButton.hide(); // Hide add button
    }
  } else {
    console.warn('Add button not found in the DOM.');
  }

  // Filter and display studios based on ownership
  const studios = retrieveStudioData();
  if (studios.length) {
    studios.forEach(studio => {
      if (studio.ownerEmail && currentUser.email && studio.ownerEmail.toLowerCase() === currentUser.email.toLowerCase()) {
        $('#studios-container').append(createStudioBox(studio)); // Ensure createStudioBox function is defined
      }
    });
  } else {
    console.warn('No studio data found.');
  }

  // Show contact information button functionality
  $(document).on('click', '#show-contact-info-btn', function () {
    const ownerEmail = $(this).data('owner-email');
    console.log('Clicked ownerEmail:', ownerEmail); // Debug log
    const owner = retrieveUserData().find(user => user.email === ownerEmail);
    if (owner) {
      $('#contact-details').html(`
        <h2>Contact Information</h2>
        <p><strong>Name:</strong> ${owner.name}</p>
        <p><strong>Email:</strong> ${owner.email}</p>
        <p><strong>Contact Number:</strong> ${owner.contactNo}</p>
      `);
    } else {
      $('#contact-details').html('<p>No contact information available.</p>');
    }
  });

  // Contact form submission handling
  $('#contact-form').on('submit', function (e) {
    e.preventDefault();
    const name = $('#contact-name').val();
    const message = $('#contact-message').val();
    const contactNo = $('#contact-number').val();

    // Handle the form submission logic here
    console.log('Form Submitted:', { name, message, contactNo });

    alert('Your message has been sent!');
    $(this).trigger('reset'); // Reset form fields
  });
});
