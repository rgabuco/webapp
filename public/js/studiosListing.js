/* 
SODV1201 (Intro to Full Stack Web Development)
Instructor: Michael Dorsey
Submitted By: Group F
Members:
  Rudy Gabuco Jr
  Jensen Castro
  Dawn Bosing
*/

$(document).ready(async function () {
  const userRole = localStorage.getItem("userRole");
  const userLoggedIn = localStorage.getItem("userLoggedIn");
  let studios = [];

  // Define the input elements at the top
  const nameInput = document.getElementById("search");
  const minPriceInput = document.getElementById("min-price");
  const maxPriceInput = document.getElementById("max-price");
  const minCapacityInput = document.getElementById("min-capacity");
  const maxCapacityInput = document.getElementById("max-capacity");
  const minSizeInput = document.getElementById("min-size");
  const maxSizeInput = document.getElementById("max-size");
  const locationSelect = document.getElementById("location");
  const availabilitySelect = document.getElementById("availability");
  const typeSelect = document.getElementById("type");
  const hasParkingSelect = document.getElementById("hasParking");
  const hasPublicTransportSelect = document.getElementById("hasPublicTransport");
  const rentalTermSelect = document.getElementById("rentalTerm");

  // Fetch studio data using retrieveStudioData function from common.js
  try {
    studios = await retrieveStudioData();
    initializePage();
  } catch (error) {
    console.error("Error retrieving studio data:", error);
  }

  function initializePage() {
    toggleButtonsBasedOnUserRole();
    setupEventListeners();
    populateSelectOptions();
    displayAllListings();
  }

  // Function to toggle buttons based on user role
  function toggleButtonsBasedOnUserRole() {
    if (userRole === "owner") {
      $("#view-my-listing-btn").show();
      $("#add-studio-btn").show();
    } else {
      console.log("nav-btn will be hidden");
      $("#view-my-listing-btn").hide();
      $("#add-studio-btn").hide();
    }
  }

  // Function to set up event listeners
  function setupEventListeners() {
    $("#view-my-listing-btn").click(toggleListingsView);
    $("#add-studio-btn").click(() => (window.location.href = "addListing.html"));
    $("#filterButton").click(applyFilters);
    $("#clearFiltersButton").click(clearFilters);

    nameInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        applyFilters();
      }
    });
  }

  // Function to toggle between viewing all listings and viewing my listings
  function toggleListingsView() {
    const buttonText = $(this).text();
    if (buttonText === "View My Listings") {
      $(this).text("View All Listings");
      displayMyListings();
    } else {
      $(this).text("View My Listings");
      displayAllListings();
    }
  }

  // Function to display all listings
  function displayAllListings() {
    $("#studios-container").empty();
    studios.forEach((studio) => {
      $("#studios-container").append(createStudioBox(studio));
    });
  }

  // Function to display my listings
  function displayMyListings() {
    $("#studios-container").empty();
    studios.forEach((studio) => {
      if (studio.ownerEmail.toLowerCase() === userLoggedIn.toLowerCase()) {
        $("#studios-container").append(createStudioBox(studio));
      }
    });
  }

  // Function to create a studio box
  function createStudioBox(studio) {
    const studioBox = $('<div class="studio-box"></div>');
    studioBox.append($("<h3></h3>").text(studio.name));
    studioBox.append($("<p></p>").text("Neighborhood: " + studio.neighborhood));
    studioBox.append($("<p></p>").text("Size: " + studio.size + " sqm"));
    studioBox.append($("<p></p>").text("Type: " + studio.type));
    studioBox.append($("<p></p>").text("Capacity: " + studio.capacity));
    studioBox.append($("<p></p>").text("Availability: " + studio.availability));
    studioBox.append($('<p class="price"></p>').text("Price: $" + studio.pricePerTerm + " / " + studio.rentalTerm));
    studioBox.css("cursor", "pointer");
    studioBox.click(function () {
      localStorage.setItem("selectedStudio", JSON.stringify(studio));
      window.location.href = "viewListing.html";
    });
    return studioBox;
  }

  // Function to populate select options
  function populateSelectOptions() {
    const uniqueLocations = [...new Set(studios.map((p) => p.neighborhood))].sort();
    const uniqueAvailability = [...new Set(studios.map((p) => p.availability))].sort();
    const uniqueTypes = [...new Set(studios.map((p) => p.type))].sort();
    const uniqueRentalTerms = [...new Set(studios.map((p) => p.rentalTerm))].sort();
    const uniqueHasParking = [...new Set(studios.map((p) => (p.hasParking ? "Yes" : "No")))].sort();
    const uniqueHasPublicTransport = [...new Set(studios.map((p) => (p.hasPublicTransport ? "Yes" : "No")))].sort();

    function populateSelect(selectElement, options) {
      $(selectElement).empty();
      options.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        $(selectElement).append(optionElement);
      });
    }

    populateSelect(locationSelect, ["any", ...uniqueLocations]);
    populateSelect(availabilitySelect, ["any", ...uniqueAvailability]);
    populateSelect(typeSelect, ["any", ...uniqueTypes]);
    populateSelect(rentalTermSelect, ["any", ...uniqueRentalTerms]);
    populateSelect(hasParkingSelect, ["any", "Yes", "No"]);
    populateSelect(hasPublicTransportSelect, ["any", "Yes", "No"]);
  }

  // Function to apply filters
  function applyFilters() {
    const selectedName = nameInput.value.toLowerCase();
    const selectedMinPrice = parseFloat(minPriceInput.value) || 0;
    const selectedMaxPrice = parseFloat(maxPriceInput.value) || Infinity;
    const selectedMinCapacity = parseInt(minCapacityInput.value) || 0;
    const selectedMaxCapacity = parseInt(maxCapacityInput.value) || Infinity;
    const selectedMinSize = parseFloat(minSizeInput.value) || 0;
    const selectedMaxSize = parseFloat(maxSizeInput.value) || Infinity;
    const selectedLocation = locationSelect.value.toLowerCase();
    const selectedAvailability = availabilitySelect.value.toLowerCase();
    const selectedType = typeSelect.value.toLowerCase();
    const selectedHasParking = hasParkingSelect.value;
    const selectedHasPublicTransport = hasPublicTransportSelect.value;
    const selectedRentalTerm = rentalTermSelect.value.toLowerCase();

    console.log("Selected Filters:", {
      selectedName,
      selectedMinPrice,
      selectedMaxPrice,
      selectedMinCapacity,
      selectedMaxCapacity,
      selectedMinSize,
      selectedMaxSize,
      selectedLocation,
      selectedAvailability,
      selectedType,
      selectedHasParking,
      selectedHasPublicTransport,
      selectedRentalTerm,
    });

    const filteredStudios = studios.filter((studio) => {
      return (
        (selectedName === "" || studio.name.toLowerCase().includes(selectedName)) &&
        studio.pricePerTerm >= selectedMinPrice &&
        studio.pricePerTerm <= selectedMaxPrice &&
        studio.capacity >= selectedMinCapacity &&
        studio.capacity <= selectedMaxCapacity &&
        studio.size >= selectedMinSize &&
        studio.size <= selectedMaxSize &&
        (selectedLocation === "any" || studio.neighborhood.toLowerCase().includes(selectedLocation)) &&
        (selectedAvailability === "any" || studio.availability.toLowerCase() === selectedAvailability) &&
        (selectedType === "any" || studio.type.toLowerCase().includes(selectedType)) &&
        (selectedHasParking === "any" || (studio.hasParking ? "Yes" : "No") === selectedHasParking) &&
        (selectedHasPublicTransport === "any" || (studio.hasPublicTransport ? "Yes" : "No") === selectedHasPublicTransport) &&
        (selectedRentalTerm === "any" || studio.rentalTerm.toLowerCase() === selectedRentalTerm)
      );
    });

    $("#studios-container").empty();
    filteredStudios.forEach((studio) => {
      $("#studios-container").append(createStudioBox(studio));
    });
  }

  // Function to clear filters
  function clearFilters() {
    nameInput.value = "";
    minPriceInput.value = "";
    maxPriceInput.value = "";
    minCapacityInput.value = "";
    maxCapacityInput.value = "";
    minSizeInput.value = "";
    maxSizeInput.value = "";
    locationSelect.value = "any";
    availabilitySelect.value = "any";
    typeSelect.value = "any";
    hasParkingSelect.value = "any";
    hasPublicTransportSelect.value = "any";
    rentalTermSelect.value = "any";

    displayAllListings(); // Show all listings after clearing the filters
  }

  nameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      applyFilters();
    }
  });

  $("#filterButton").click(applyFilters);
  $("#clearFiltersButton").click(clearFilters);
});
