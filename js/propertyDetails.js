document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');
  
    const properties = [
      { id: 1, price: 1500, location: 'New York City', availability: 'available', name: 'Studio A', description: 'A beautiful studio in NYC.', details: 'Detailed information about Studio A.' },
      { id: 2, price: 2500, location: 'Los Angeles', availability: 'not-available', name: 'Studio B', description: 'A spacious studio in LA.', details: 'Detailed information about Studio B.' },
      { id: 3, price: 3000, location: 'San Francisco', availability: 'available', name: 'Studio C', description: 'A modern studio in SF.', details: 'Detailed information about Studio C.' },
      { id: 4, price: 1800, location: 'Chicago', availability: 'available', name: 'Studio D', description: 'A cozy studio in Chicago.', details: 'Detailed information about Studio D.' },
    ];
  
    const property = properties.find(p => p.id == propertyId);
  
    if (property) {
      const propertyDetailsSection = document.querySelector('.property-details');
      propertyDetailsSection.innerHTML = `
        <h2>${property.name}</h2>
        <p class="price">$${property.price}</p>
        <p class="location">${property.location}</p>
        <p class="availability">${property.availability.charAt(0).toUpperCase() + property.availability.slice(1)}</p>
        <p class="description">${property.description}</p>
        <p class="details">${property.details}</p>
      `;
    } else {
      const propertyDetailsSection = document.querySelector('.property-details');
      propertyDetailsSection.innerHTML = '<p>Property not found.</p>';
    }
  
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      alert('Message sent to the owner.');
    });
  });
  