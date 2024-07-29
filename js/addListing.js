$(document).ready(function() {

    function retrieveStudioData() {
        return JSON.parse(localStorage.getItem('studioData'));
    }

    function saveStudioData(data) {
        localStorage.setItem('studioData', JSON.stringify(data));
    }

    // Event listener for form submission
    $('#add-listing form').on('submit', function(event) {
        event.preventDefault();

        const name = $('#name').val();
        const adddress = $('#address').val();
        const neighborhood = $('#neighborhood').val();
        const size = parseFloat($('#size').val());
        const type = $('#studio-type').val();
        const capacity = parseInt($('#name').val());
        const hasParking = $('#hasParking').val();
        const hasPublicTransport = $('#hasPublicTransport').val();
        const availability = 'Available';
        const rentalTerm = $('#rentalTerm').val();
        const price = parseFloat($('#price').val());

        // Create a new studio object
        const newStudio = {
            name,
            adddress,
            neighborhood,
            size,
            type,
            capacity,
            hasParking,
            hasPublicTransport,
            availability,
            rentalTerm,
            price,
            ownerEmail: localStorage.getItem('userLoggedIn')
        };

        let studioData = retrieveStudioData();

        studioData.push(newStudio);

        saveStudioData(studioData);

        $('#add-listing form').trigger('reset');

        alert('Listing added successfully!');

        window.location.href = 'studiosListing.html';
    })
})