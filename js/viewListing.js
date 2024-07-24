document.addEventListener('DOMContentLoaded', function () {
    const priceSelect = document.getElementById('price');
    const locationSelect = document.getElementById('location');
    const availabilitySelect = document.getElementById('availability');
    const searchInput = document.getElementById('search');
    const propertyList = document.querySelector('.property-list');
  
    const properties = [
      { id: 1, price: 1500, location: 'New York City', availability: 'available', name: 'Studio A', description: 'A beautiful studio in NYC.' },
      { id: 2, price: 2500, location: 'Los Angeles', availability: 'not-available', name: 'Studio B', description: 'A spacious studio in LA.' },
      { id: 3, price: 3000, location: 'San Francisco', availability: 'available', name: 'Studio C', description: 'A modern studio in SF.' },
      { id: 4, price: 1800, location: 'Chicago', availability: 'available', name: 'Studio D', description: 'A cozy studio in Chicago.' },
    ];
  
    const uniquePrices = [...new Set(properties.map(p => p.price))];
    const uniqueLocations = [...new Set(properties.map(p => p.location))];
    const uniqueAvailability = [...new Set(properties.map(p => p.availability))];
  
    uniquePrices.sort((a, b) => a - b).forEach(price => {
      const option = document.createElement('option');
      option.value = price;
      option.textContent = `$${price}`;
      priceSelect.appendChild(option);
    });
  
    uniqueLocations.forEach(location => {
      const option = document.createElement('option');
      option.value = location.toLowerCase().replace(' ', '-');
      option.textContent = location;
      locationSelect.appendChild(option);
    });
  
    uniqueAvailability.forEach(status => {
      const option = document.createElement('option');
      option.value = status;
      option.textContent = status.charAt(0).toUpperCase() + status.slice(1);
      availabilitySelect.appendChild(option);
    });
  
    function renderProperties(properties) {
      propertyList.innerHTML = '';
      properties.forEach(property => {
        const propertyItem = document.createElement('div');
        propertyItem.className = 'property-item';
        propertyItem.innerHTML = `
          <h3>${property.name}</h3>
          <p class="price">$${property.price}</p>
          <p class="location">${property.location}</p>
          <p class="availability">${property.availability.charAt(0).toUpperCase() + property.availability.slice(1)}</p>
          <p class="description">${property.description}</p>
          <a href="./propertyDetails.html?id=${property.id}" class="view-details-btn">View Details</a>
        `;
        propertyList.appendChild(propertyItem);
      });
    }
  
    renderProperties(properties);
  
    document.getElementById('filterButton').addEventListener('click', () => {
      const selectedPrice = priceSelect.value;
      const selectedLocation = locationSelect.value;
      const selectedAvailability = availabilitySelect.value;
      const searchQuery = searchInput.value.toLowerCase();
  
      const filteredProperties = properties.filter(property => {
        const matchesSearch = searchQuery === '' || property.name.toLowerCase().includes(searchQuery) || property.description.toLowerCase().includes(searchQuery);
        const matchesPrice = selectedPrice === 'any' || property.price == selectedPrice;
        const matchesLocation = selectedLocation === 'any' || property.location.toLowerCase().replace(' ', '-') === selectedLocation;
        const matchesAvailability = selectedAvailability === 'any' || property.availability === selectedAvailability;
        
        return matchesSearch && matchesPrice && matchesLocation && matchesAvailability;
      });
  
      renderProperties(filteredProperties);
    });
  });
  