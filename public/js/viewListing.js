$(document).ready(async function () {
  const userEmail = localStorage.getItem('userLoggedIn');
  const userRole = localStorage.getItem('userRole');
  
  let userData, studioData;
  
  try {
    userData = await retrieveUserData();
  } catch (error) {
    console.error('Error retrieving user data:', error);
    alert('An error occurred while retrieving user data. Please try again later.');
    return;
  }
  
  try {
    studioData = await retrieveStudioData();
  } catch (error) {
    console.error('Error retrieving studio data:', error);
    alert('An error occurred while retrieving studio data. Please try again later.');
    return;
  }
  
  const userLoggedIn = userData.find(user => user.email.toLowerCase() === userEmail.toLowerCase());
  const selectedStudio = JSON.parse(localStorage.getItem('selectedStudio'));
  const $studioDetails = $('#studio-details');
  const $contactForm = $('#owner-form');
  const $contactDetails = $('#contact-details');
  const labelMapping = {
    name: 'Name',
    address: 'Address',
    neighborhood: 'Neighborhood',
    size: 'Size',
    type: 'Type',
    capacity: 'Capacity',
    hasParking: 'Parking Available',
    hasPublicTransport: 'Public Transport Available',
    availability: 'Availability',
    rentalTerm: 'Rental Term',
    pricePerTerm: 'Price Per Term',
    ownerEmail: 'Email'
  };

  if (!selectedStudio) {
    alert('No studio data found!');
    window.location.href = 'studiolisting.html';
    return;
  }

  function displayStudioDetails(studio) {
    return `
      <h1>${studio.name}</h1>
      <p><strong>Address:</strong> ${studio.address}</p>
      <p><strong>Neighborhood:</strong> ${studio.neighborhood}</p>
      <p><strong>Size:</strong> ${studio.size} sqm</p>
      <p><strong>Type:</strong> ${studio.type}</p>
      <p><strong>Capacity:</strong> ${studio.capacity}</p>
      <p><strong>Parking Available:</strong> ${studio.hasParking}</p>
      <p><strong>Public Transport Available:</strong> ${studio.hasPublicTransport}</p>
      <p><strong>Availability:</strong> ${studio.availability}</p>
      <p><strong>Rental Term:</strong> ${studio.rentalTerm}</p>
      <p><strong>Price per Term:</strong> $${studio.pricePerTerm}</p>
    `;
  }

  function displayContactDetails(user) {
    return `
      <h2>Contact Information</h2>
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Contact Number:</strong> ${user.contactNo}</p>
    `;
  }

  function appendStudioDetails() {
    $studioDetails.html(displayStudioDetails(selectedStudio));
  
    if (selectedStudio.ownerEmail && userLoggedIn.email && selectedStudio.ownerEmail.toLowerCase() === userLoggedIn.email.toLowerCase()) {
      $studioDetails.append(`
        <div id="edit-delete-buttons">
          <button id="edit-btn" class="alter-buttons">Edit</button>
          <button id="delete-btn" class="alter-buttons">Delete</button>
          <button id="save-btn" class="alter-buttons">Save</button>
          <button id="cancel-btn" class="alter-buttons">Cancel</button>
        </div>
      `);
    } else {
      console.log('Studio cannot be edited');
      console.log('Owner Email:', selectedStudio.ownerEmail);
      console.log('User Logged In Email:', userLoggedIn.email);
    }
  }
  
  appendStudioDetails();

  // Show edit and delete buttons only if userRole is owner and userEmail matches selectedStudio.workEmail
  if (userRole === 'owner' && userEmail.toLowerCase() === selectedStudio.ownerEmail.toLowerCase()) {
    $('#edit-btn').show();
    $('#delete-btn').show();
  } else {
    $('#edit-btn').hide();
    $('#delete-btn').hide();
  }

  if ($contactForm.length) {
    if (selectedStudio.ownerEmail.toLowerCase() === userLoggedIn.email.toLowerCase()) {
      $contactForm.hide();
    } else {
      $contactForm.show();
    }
  } else {
    console.warn('Contact form not found in the DOM.');
  }

  const userOfSelectedStudio = userData.find(user => user.email.toLowerCase() === selectedStudio.ownerEmail.toLowerCase());
  $contactDetails.html(displayContactDetails(userOfSelectedStudio));

  $('#contact-form').on('submit', function (e) {
    e.preventDefault();
    const name = $('#contact-name').val();
    const message = $('#contact-message').val();
    const contactNo = $('#contact-number').val();

    console.log('Form Submitted:', { name, message, contactNo });
    alert('Your message has been sent!');
    $(this).trigger('reset');
  });

  // Edit button event handler
  $(document).on('click', '#edit-btn', function() {
    $studioDetails.html(`
      <h1>${selectedStudio.name}</h1>
      <form>
        ${Object.keys(selectedStudio)
          .filter(key => key !== 'ownerEmail')
          .map(key => {
            let inputElement;
            switch (key) {
              case 'name':
              case 'address':
              case 'neighborhood':
                inputElement = `<input type="text" id="${key}" name="${key}" value="${selectedStudio[key]}" class="form-input">`;
                break;
              case 'type':
                inputElement = `
                  <select id="${key}" name="${key}" class="form-select">
                    <option value="Photography Studio" ${selectedStudio[key] === 'Photography' ? 'selected' : ''}>Photography</option>
                    <option value="Art Studio" ${selectedStudio[key] === 'Art' ? 'selected' : ''}>Art</option>
                    <option value="Music Studio" ${selectedStudio[key] === 'Music' ? 'selected' : ''}>Music</option>
                    <option value="Recording Studio" ${selectedStudio[key] === 'Recording' ? 'selected' : ''}>Recording</option>
                    <option value="Film" ${selectedStudio[key] === 'Film' ? 'selected' : ''}>Film</option>
                  </select>`;
                break;
              case 'size':
              case 'capacity':
              case 'pricePerTerm':
                inputElement = `<input type="number" id="${key}" name="${key}" value="${selectedStudio[key]}" class="form-input">`;
                break;
              case 'hasParking':
              case 'hasPublicTransport':
                inputElement = `
                  <select id="${key}" name="${key}" class="form-select">
                    <option value="Yes" ${selectedStudio[key] === 'Yes' ? 'selected' : ''}>Yes</option>
                    <option value="No" ${selectedStudio[key] === 'No' ? 'selected' : ''}>No</option>
                  </select>`;
                break;
              case 'availability':
                inputElement = `
                  <select id="${key}" name="${key}" class="form-select">
                    <option value="Available" ${selectedStudio[key] === 'Available' ? 'selected' : ''}>Available</option>
                    <option value="Rented" ${selectedStudio[key] === 'Rented' ? 'selected' : ''}>Rented</option>
                  </select>`;
                break;
              case 'rentalTerm':
                inputElement = `
                  <select id="${key}" name="${key}" class="form-select">
                    <option value="Hour" ${selectedStudio[key] === 'Hour' ? 'selected' : ''}>Hour</option>
                    <option value="Day" ${selectedStudio[key] === 'Day' ? 'selected' : ''}>Day</option>
                    <option value="Week" ${selectedStudio[key] === 'Week' ? 'selected' : ''}>Week</option>
                    <option value="Month" ${selectedStudio[key] === 'Month' ? 'selected' : ''}>Month</option>
                    <option value="Year" ${selectedStudio[key] === 'Year' ? 'selected' : ''}>Year</option>
                  </select>`;
                break;
              default:
                inputElement = `<input type="text" id="${key}" name="${key}" value="${selectedStudio[key]}" class="form-input">`;
            }
            return `
              <div class="form-group">
                <label for="${key}" class="form-label">${labelMapping[key]}</label>
                ${inputElement}
              </div>
            `;
          }).join('')}
      </form>
    `);

    if (selectedStudio.ownerEmail && userLoggedIn.email && selectedStudio.ownerEmail.toLowerCase() === userLoggedIn.email.toLowerCase()) {
      $studioDetails.append(`
        <div id="edit-delete-buttons">
          <button id="edit-btn" class="alter-buttons">Edit</button>
          <button id="delete-btn" class="alter-buttons">Delete</button>
          <button id="save-btn" class="alter-buttons">Save</button>
          <button id="cancel-btn" class="alter-buttons">Cancel</button>
        </div>
      `);
    } else {
      console.log('Studio cannot be edited');
    }

    $('#edit-btn, #delete-btn').hide();
    $('#save-btn').show().css('background-color', 'darkgray').prop('disabled', true);
    $('#cancel-btn').show().prop('disabled', false);
  });

  // Cancel button event handler
  $(document).on('click', '#cancel-btn', function() {
    if (selectedStudio.ownerEmail && userLoggedIn.email && selectedStudio.ownerEmail.toLowerCase() === userLoggedIn.email.toLowerCase()) {
      appendStudioDetails();
    } else {
      $studioDetails.html(displayStudioDetails(selectedStudio));
    }
  });

  let oldStudioName = selectedStudio.name;

  // Enable save button only if there are changes
  $(document).on('input', function() {
    let name = $('#name').val();
    let address = $('#address').val();
    let neighborhood = $('#neighborhood').val();
    let size = parseFloat($('#size').val());
    let type = $('#type').val();
    let capacity = parseInt($('#capacity').val(), 10);
    let hasParking = $('#hasParking').val();
    let hasPublicTransport = $('#hasPublicTransport').val();
    let availability = $('#availability').val();
    let rentalTerm = $('#rentalTerm').val();
    let pricePerTerm = parseFloat($('#pricePerTerm').val());  
    
    console.log('Input event triggered');
    console.log('Selected Studio:', selectedStudio);
    console.log('Input Values:', { name, address, neighborhood, size, type, capacity, hasParking, hasPublicTransport, availability, rentalTerm, pricePerTerm });
  
    // Reset the background color and disable the button by default
    $('#save-btn').css('background-color', 'grey').prop('disabled', true);

    if (name.trim() !== selectedStudio.name.trim() || 
        address.trim() !== selectedStudio.address.trim() || 
        neighborhood.trim() !== selectedStudio.neighborhood.trim() || 
        size !== selectedStudio.size || 
        type.trim() !== selectedStudio.type.trim() || 
        capacity !== selectedStudio.capacity || 
        hasParking.trim() !== selectedStudio.hasParking.trim() || 
        hasPublicTransport.trim() !== selectedStudio.hasPublicTransport.trim() || 
        availability.trim() !== selectedStudio.availability.trim() ||
        rentalTerm.trim() !== selectedStudio.rentalTerm.trim() || 
        pricePerTerm !== selectedStudio.pricePerTerm) {
        
        $('#save-btn').css({'background-color': 'black', 'cursor': 'pointer'}).prop('disabled', false);
    } else {
        $('#save-btn').css('background-color', 'grey').prop('disabled', true);
    }
  });

  $(document).ready(function () {
    // Show the modal when delete button is clicked
    $(document).on('click', '#delete-btn', function() {
        $('#deleteModal').css('display', 'block');
        $('.modal-content p').text('Are you sure you want to delete this studio?');
        $('#confirmDelete').show();
        $('#cancelDelete').show();
    });

    // Get the modal
    var deleteModal = document.getElementById("deleteModal");

    // Get the <span> element that closes the modal
    var deleteSpan = document.getElementById("deleteClose");

    // When the user clicks on <span> (x), close the modal
    deleteSpan.onclick = function() {
        deleteModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == deleteModal) {
            deleteModal.style.display = "none";
        }
    }

    // Confirm delete button event handler
    $(document).on('click', '#confirmDelete', async function() {
      console.log('Confirm delete button clicked');
      // Proceed with deletion
      console.log(selectedStudio);
      studioData = studioData.filter(studio => {
        return studio.name !== selectedStudio.name ||
               studio.address !== selectedStudio.address ||
               studio.neighborhood !== selectedStudio.neighborhood ||
               studio.size !== selectedStudio.size ||
               studio.type !== selectedStudio.type;
      });
      console.log(studioData);
      
      try {
        await saveStudioData(studioData);
        $('.modal-content p').text('Studio deleted successfully.');
        $('#confirmDelete').hide();
        $('#cancelDelete').hide();
    
        setTimeout(function() {
          window.location.href = 'studiosListing.html';
        }, 2000);
      } catch (error) {
        console.error('Error saving studio data:', error);
        alert('An error occurred while deleting the studio. Please try again later.');
      }
    });

    // Cancel delete button event handler
    $('#cancelDelete').on('click', function() {
      deleteModal.style.display = "none";
    });

    // Show the modal when save button is clicked
    $(document).on('click', '#save-btn', function() {
        $('#saveModal').css('display', 'block');
        $('.modal-content p').text('Are you sure you want to save the changes?');
        $('#confirmSave').show();
        $('#cancelSave').show();
    });

    // Get the modal
    var saveModal = document.getElementById("saveModal");

    // Get the <span> element that closes the modal
    var saveSpan = document.getElementById("saveClose");

    // When the user clicks on <span> (x), close the modal
    saveSpan.onclick = function() {
        saveModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == saveModal) {
            saveModal.style.display = "none";
        }
    }

    // Confirm save button event handler
    $(document).on('click', '#confirmSave', async function() {
      console.log('Save confirmed');
      let name = $('#name').val();
      let address = $('#address').val();
      let neighborhood = $('#neighborhood').val();
      let size = parseFloat($('#size').val());
      let type = $('#type').val();
      let capacity = parseInt($('#capacity').val(), 10);
      let hasParking = $('#hasParking').val();
      let hasPublicTransport = $('#hasPublicTransport').val();
      let availability = $('#availability').val();
      let rentalTerm = $('#rentalTerm').val();
      let pricePerTerm = parseFloat($('#pricePerTerm').val());
  
      selectedStudio.name = name;
      selectedStudio.address = address;
      selectedStudio.neighborhood = neighborhood;
      selectedStudio.size = size;
      selectedStudio.type = type;
      selectedStudio.capacity = capacity;
      selectedStudio.hasParking = hasParking;
      selectedStudio.hasPublicTransport = hasPublicTransport;
      selectedStudio.availability = availability;
      selectedStudio.rentalTerm = rentalTerm;
      selectedStudio.pricePerTerm = pricePerTerm;
  
      localStorage.setItem('selectedStudio', JSON.stringify(selectedStudio));
  
      const studioIndex = studioData.findIndex(studio => 
        studio.name === selectedStudio.name || studio.name === oldStudioName
      );
      
      if (studioIndex !== -1) {
        console.log(`Updating studio at index ${studioIndex} with new data:`, selectedStudio);
        // Update the studio at the found index
        studioData[studioIndex] = { ...studioData[studioIndex], ...selectedStudio };
      } else {
        console.warn('No matching studio found to update.');
      }
      console.log('Updated studioData:', studioData);
      
  
      try {
        await saveStudioData(studioData);
        $('.modal-content p').text('Save successful.');
        $('#confirmSave').hide();
        $('#cancelSave').hide();
  
        setTimeout(function() {
          if (selectedStudio.ownerEmail && userLoggedIn.email && selectedStudio.ownerEmail.toLowerCase() === userLoggedIn.email.toLowerCase()) {
            appendStudioDetails();
          } else {
            $studioDetails.html(displayStudioDetails(selectedStudio));
          }
          saveModal.style.display = "none";
        }, 2000);
      } catch (error) {
        console.error('Error saving studio data:', error);
        alert('An error occurred while saving the studio. Please try again later.');
      }
    });

    // Cancel save button event handler
    $('#cancelSave').on('click', function() {
      saveModal.style.display = "none";
    });
  });
});
