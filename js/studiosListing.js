$(document).ready(function() {
  // Check user role from localStorage
  const userRole = localStorage.getItem('userRole');
  const userLoggedIn = localStorage.getItem('userLoggedIn');
  var studiosString = localStorage.getItem('studioData');
  
  if (studiosString) {
    var studios = JSON.parse(studiosString);
  } else {
    var studios = [];
  }

  // Only display the button if the user is an owner
  if (userRole === 'owner') {
    $('#view-my-listing-div').show();
  } else {
    $('#view-my-listing-div').hide();
  }

  // Event handler for the View My Listing button click
  $('#view-my-listing-btn').click(function() {
    const buttonText = $(this).text();

    if (buttonText === 'View My Listing') {
      $(this).text('View All Listing');
      displayMyListings();
    } else {
      $(this).text('View My Listing');
      displayAllListings();
    }
  });

	// Event handler for the "Add Studio" button click
	$('#add-studio-btn').click(function() {
		window.location.href = 'addListing.html';
	});

  // Function to display all listings
  function displayAllListings() {
    // Clear the container
    $('#studios-container').empty();

    // Assuming studios is an array of studio objects
    studios.forEach(studio => {
      $('#studios-container').append(createStudioBox(studio));
    });
  }

  // Function to display listings associated with the logged-in user
  function displayMyListings() {
    // Clear the container
    $('#studios-container').empty();

    // Assuming studios is an array of studio objects
    studios.forEach(studio => {
      if (studio.ownerEmail.toLowerCase() === userLoggedIn.toLowerCase()) {
        $('#studios-container').append(createStudioBox(studio));
      }
    });
  }

  // Function to create a studio box element
  function createStudioBox(studio) {
    var studioBox = $('<div class="studio-box"></div>');
    studioBox.append($('<h3></h3>').text(studio.name));
    studioBox.append($('<p></p>').text('Address: ' + studio.address));
    studioBox.append($('<p></p>').text('Availability: ' + studio.availability));
    studioBox.append($('<p></p>').text('Price: $' + studio.pricePerTerm + ' / ' + studio.rentalTerm));
    
    // Make the studio box clickable
    studioBox.css('cursor', 'pointer');
    studioBox.click(function() {
      // Store the clicked studio's details in local storage
      localStorage.setItem('selectedStudio', JSON.stringify(studio));
      // Redirect to viewListing.html
      window.location.href = 'viewListing.html';
    });

    return studioBox;
  }

  // Initial display of all listings
  displayAllListings();
});