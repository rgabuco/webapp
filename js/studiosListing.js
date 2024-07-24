$(document).ready(function() {
  const userRole = localStorage.getItem('userRole');
  const userLoggedIn = localStorage.getItem('userLoggedIn');
  const studiosString = localStorage.getItem('studioData');
  let studios = studiosString ? JSON.parse(studiosString) : [];

  if (userRole === 'owner') {
    $('#view-my-listing-div').show();
  } else {
    $('#view-my-listing-div').hide();
  }

  $('#view-my-listing-btn').click(function() {
    const buttonText = $(this).text();
    if (buttonText === 'View My Listings') {
      $(this).text('View All Listings');
      displayMyListings();
    } else {
      $(this).text('View My Listings');
      displayAllListings();
    }
  });

  $('#add-studio-btn').click(function() {
    window.location.href = 'addListing.html';
  });

  function displayAllListings() {
    $('#studios-container').empty();
    studios.forEach(studio => {
      $('#studios-container').append(createStudioBox(studio));
    });
  }

  function displayMyListings() {
    $('#studios-container').empty();
    studios.forEach(studio => {
      if (studio.ownerEmail.toLowerCase() === userLoggedIn.toLowerCase()) {
        $('#studios-container').append(createStudioBox(studio));
      }
    });
  }

  function createStudioBox(studio) {
    const studioBox = $('<div class="studio-box"></div>');
    studioBox.append($('<h3></h3>').text(studio.name));
    studioBox.append($('<p></p>').text('Address: ' + studio.address));
    studioBox.append($('<p></p>').text('Area: ' + studio.area));
    studioBox.append($('<p></p>').text('Type: ' + studio.type));
    studioBox.append($('<p></p>').text('Capacity: ' + studio.capacity));
    studioBox.append($('<p></p>').text('Parking: ' + (studio.hasParking ? 'Yes' : 'No')));
    studioBox.append($('<p></p>').text('Public Transport: ' + (studio.hasPublicTransport ? 'Yes' : 'No')));
    studioBox.append($('<p></p>').text('Availability: ' + studio.availability));
    studioBox.append($('<p></p>').text('Rental Term: ' + studio.rentalTerm));
    studioBox.append($('<p class="price"></p>').text('Price: $' + studio.pricePerTerm + ' / ' + studio.rentalTerm));
    studioBox.css('cursor', 'pointer');
    studioBox.click(function() {
      localStorage.setItem('selectedStudio', JSON.stringify(studio));
      window.location.href = 'viewListing.html';
    });
    return studioBox;
  }

  const nameInput = document.getElementById('search');
  const priceSelect = document.getElementById('price');
  const locationSelect = document.getElementById('location');
  const availabilitySelect = document.getElementById('availability');
  const typeSelect = document.getElementById('type');
  const capacitySelect = document.getElementById('capacity');
  const hasParkingSelect = document.getElementById('hasParking');
  const hasPublicTransportSelect = document.getElementById('hasPublicTransport');
  const rentalTermSelect = document.getElementById('rentalTerm');

  function populateSelectOptions() {
    const uniquePrices = [...new Set(studios.map(p => p.pricePerTerm))];
    const uniqueLocations = [...new Set(studios.map(p => p.address.split(',')[1]?.trim() || p.area))];
    const uniqueAvailability = [...new Set(studios.map(p => p.availability))];
    const uniqueTypes = [...new Set(studios.map(p => p.type))];
    const uniqueCapacities = [...new Set(studios.map(p => p.capacity))];
    const uniqueRentalTerms = [...new Set(studios.map(p => p.rentalTerm))];
    const uniqueHasParking = [...new Set(studios.map(p => p.hasParking ? 'Yes' : 'No'))];
    const uniqueHasPublicTransport = [...new Set(studios.map(p => p.hasPublicTransport ? 'Yes' : 'No'))];

    function populateSelect(selectElement, options) {
      $(selectElement).empty();
      options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        $(selectElement).append(optionElement);
      });
    }

    // Populate select elements
    populateSelect(priceSelect, ['any', ...uniquePrices.map(price => `$${price}`)]);
    populateSelect(locationSelect, ['any', ...uniqueLocations]);
    populateSelect(availabilitySelect, ['any', ...uniqueAvailability]);
    populateSelect(typeSelect, ['any', ...uniqueTypes]);
    populateSelect(capacitySelect, ['any', ...uniqueCapacities]);
    populateSelect(rentalTermSelect, ['any', ...uniqueRentalTerms]);
    populateSelect(hasParkingSelect, ['any', 'Yes', 'No']);
    populateSelect(hasPublicTransportSelect, ['any', 'Yes', 'No']);
  }

  populateSelectOptions();

  $('#filterButton').click(() => {
    const selectedName = nameInput.value.toLowerCase();
    const selectedPrice = priceSelect.value;
    const selectedLocation = locationSelect.value.toLowerCase();
    const selectedAvailability = availabilitySelect.value.toLowerCase();
    const selectedType = typeSelect.value.toLowerCase();
    const selectedCapacity = capacitySelect.value;
    const selectedHasParking = hasParkingSelect.value;
    const selectedHasPublicTransport = hasPublicTransportSelect.value;
    const selectedRentalTerm = rentalTermSelect.value.toLowerCase();

    console.log("Selected Filters:", {
      selectedName,
      selectedPrice,
      selectedLocation,
      selectedAvailability,
      selectedType,
      selectedCapacity,
      selectedHasParking,
      selectedHasPublicTransport,
      selectedRentalTerm
    });

    const filteredStudios = studios.filter(studio => {
      const studioLocation = studio.address.split(',')[1]?.trim().toLowerCase() || studio.area.toLowerCase();
      const matchesName = selectedName === '' || studio.name.toLowerCase().includes(selectedName);
      const matchesPrice = selectedPrice === 'any' || studio.pricePerTerm == selectedPrice.replace('$', '');
      const matchesLocation = selectedLocation === 'any' || studioLocation.includes(selectedLocation);
      const matchesAvailability = selectedAvailability === 'any' || studio.availability.toLowerCase() === selectedAvailability;
      const matchesType = selectedType === 'any' || studio.type.toLowerCase().includes(selectedType);
      const matchesCapacity = selectedCapacity === 'any' || studio.capacity == selectedCapacity;
      const matchesHasParking = selectedHasParking === 'any' || (studio.hasParking ? 'Yes' : 'No') === selectedHasParking;
      const matchesHasPublicTransport = selectedHasPublicTransport === 'any' || (studio.hasPublicTransport ? 'Yes' : 'No') === selectedHasPublicTransport;
      const matchesRentalTerm = selectedRentalTerm === 'any' || studio.rentalTerm.toLowerCase() === selectedRentalTerm;

      return matchesName && matchesPrice && matchesLocation && matchesAvailability && matchesType && matchesCapacity && matchesHasParking && matchesHasPublicTransport && matchesRentalTerm;
    });

    $('#studios-container').empty();
    filteredStudios.forEach(studio => {
      $('#studios-container').append(createStudioBox(studio));
    });
  });

  displayAllListings();
});
