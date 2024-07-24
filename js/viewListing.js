document.addEventListener('DOMContentLoaded', function () {
    const studioData = JSON.parse(localStorage.getItem('selectedStudio'));
    if (!studioData) {
      alert('No studio data found!');
      window.location.href = 'studiolisting.html'; // Redirect if no data
      return;
    }
  
    const studioContainer = document.getElementById('studio-details');
    studioContainer.innerHTML = `
      <h1>${studioData.name}</h1>
      <p><strong>Address:</strong> ${studioData.address}</p>
      <p><strong>Area:</strong> ${studioData.area}</p>
      <p><strong>Type:</strong> ${studioData.type}</p>
      <p><strong>Capacity:</strong> ${studioData.capacity}</p>
      <p><strong>Parking Available:</strong> ${studioData.hasParking}</p>
      <p><strong>Public Transport Available:</strong> ${studioData.hasPublicTransport}</p>
      <p><strong>Availability:</strong> ${studioData.availability}</p>
      <p><strong>Rental Term:</strong> ${studioData.rentalTerm}</p>
      <p><strong>Price per Term:</strong> $${studioData.pricePerTerm}</p>
    `;
  
    const ownerEmail = studioData.ownerEmail;
    const userData = retrieveUserData();
    const ownerData = userData.find(user => user.email === ownerEmail);
  
    if (ownerData) {
      const contactContainer = document.getElementById('contact-details');
      contactContainer.innerHTML = `
        <h2>Contact Information</h2>
        <p><strong>Name:</strong> ${ownerData.name}</p>
        <p><strong>Email:</strong> ${ownerData.email}</p>
        <p><strong>Contact No:</strong> ${ownerData.contactNo}</p>
      `;
    }
  
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const message = document.getElementById('contact-message').value;
      const contactNo = document.getElementById('contact-number').value;
  
      // Handle the form submission logic here
      console.log('Form Submitted:', { name, message, contactNo });
  
      alert('Your message has been sent!');
      contactForm.reset();
    });
  });
  