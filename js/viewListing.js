$(document).ready(function () {

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
    <div id="edit-delete-buttons">
      <button id="delete-btn" class="alter-buttons">Edit</button>
      <button id="edit-btn" class="alter-buttons">Delete</button>
      <button id="save-btn" class="alter-buttons">Save</button>
      <button id="cancel-btn" class="alter-buttons">Cancel</button>
    </div>
  `);

  // Retrieve current user data
  // Get the logged-in user's data
  let userEmail = localStorage.getItem('userLoggedIn');
  let userData = retrieveUserData();
  let userLoggedIn = userData.find(user => user.email.toLowerCase() === userEmail.toLowerCase());

  // Hide contact form if the studio is owned by the current user
  const contactForm = $('#owner-form');
  if (contactForm.length) {
    if (studioData.ownerEmail.toLowerCase() === userLoggedIn.email.toLowerCase()) {
      contactForm.hide(); // Hide contact form
    } else {
      contactForm.show(); // Show contact form if not owned by current user
    }
  } else {
    console.warn('Contact form not found in the DOM.');
  }

  // Filter and display studios based on ownership
  const studios = retrieveStudioData();
  if (studios.length) {
    studios.forEach(studio => {
      if (studio.ownerEmail && userLoggedIn.email && studio.ownerEmail.toLowerCase() === userLoggedIn.email.toLowerCase()) {
        $('#studios-container').append(createStudioBox(studio)); // Ensure createStudioBox function is defined
      }
    });
  } else {
    console.warn('No studio data found.');
  }

  // Display contact information
  $('#contact-details').html(`
    <h2>Contact Information</h2>
    <p><strong>Name:</strong> ${userLoggedIn.name}</p>
    <p><strong>Email:</strong> ${userLoggedIn.email}</p>
    <p><strong>Contact Number:</strong> ${userLoggedIn.contactNo}</p>
  `
  );

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
