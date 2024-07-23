$(document).ready(function() {
	var studiosString = localStorage.getItem('studioData');
	
	if (studiosString) {
		var studios = JSON.parse(studiosString);
		
		studios.forEach(function(studio) {
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
			
			$('#studios-container').append(studioBox);
		});
	} else {
		$('#studios-container').text('No studio found in local storage.');
	}
});