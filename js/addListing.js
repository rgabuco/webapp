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
            const $field = $(field);
            const $error = $field.siblings('.error-message');

            if ($(field).val().trim() === '') {
                $field.css('border','2px solid red');
                if ($error.length === 0) {
                    $field.after(`<span class="error-message" style="color: red"> This field is required.</span>`);
                }
                isValid = false;
            } else {
                $field.css('border', '1px solid gray');
                $error.remove();
            }
        });
        return isValid;
    }

    // Function to check if name is already used
    function isNameDuplicate(name) {
        const studioData = retrieveStudioData();
        return studioData.some(studio => studio.name.toLowerCase() === name.toLowerCase());
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

        // Check if the name is duplicate
        if (isNameDuplicate(name)) {
            $('#error-message').css('color', 'red');
            $('#error-message').text('The name is already in use. Please use a different name.')
            return;
        }

        let studioData = retrieveStudioData();
        
        studioData.push(newStudio);

        saveStudioData(studioData);

        $('#add-listing form').trigger('reset');

        alert('Listing added successfully!');
        window.location.href = 'studiosListing.html';
    });

    // Event listener for input on form fields to remove error message
    $('#add-listing form input, #add-listing form select').on('input', function () {
        const $field = $(this);
        const $error = $field.siblings('.error-message');

        if ($field.val().trim() !== '') {
            $field.css('border', '1px solid gray');
            $error.remove();
        }
    });
});
