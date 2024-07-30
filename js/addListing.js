$(document).ready(function() {

    function retrieveStudioData() {
        return JSON.parse(localStorage.getItem('studioData'));
    }

    function saveStudioData(data) {
        localStorage.setItem('studioData', JSON.stringify(data));
    }

    // Function to validate form fields
    function validateForm() {
        let isValid = true;
        const fields = ['#name', '#address', '#size', '#neighborhood', '#studio-type', '#capacity', '#price'];
        fields.forEach(field => {
            if ($(field).val().trim() === '') {
                $(field).addClass('error');
                isValid = false;
            } else {
                $(field).removeClass('error');
            }
        });
        return isValid;
    }

    // Event listener for form submission
    $('#add-listing form').on('submit', function(event) {
        event.preventDefault();

        // Validate form fields
        if (!validateForm()) {
            alert('Please fill in all required fields.');
            return;
        }

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
    });
});
