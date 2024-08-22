/* 
SODV1201 (Intro to Full Stack Web Development)
Instructor: Michael Dorsey
Submitted By: Group F
Members:
  Rudy Gabuco Jr
  Jensen Castro
  Dawn Bosing
*/

$(document).ready(function () {
  // Function to validate form fields
  function validateForm() {
    let isValid = true;
    const fields = ["#name", "#address", "#size", "#capacity", "#price"];
    fields.forEach((field) => {
      const $field = $(field);
      const $error = $field.siblings(".error-message");

      if ($field.val().trim() === "") {
        $field.css("border", "2px solid red");
        if ($error.length === 0) {
          $field.after(`<span class="error-message" style="color: red"> This field is required.</span>`);
        }
        isValid = false;
      } else {
        $field.css("border", "1px solid gray");
        $error.remove();
      }
    });
    return isValid;
  }

  // Function to check if name is already used
  async function isNameDuplicate(name) {
    const studioData = await retrieveStudioData();
    return studioData.some((studio) => studio.name.toLowerCase() === name.toLowerCase());
  }

  // Event listener for form submission
  $("#add-listing form").on("submit", async function (event) {
    event.preventDefault();

    // Validate form fields
    if (!validateForm()) {
      alert("Please fill in all required fields.");
      return;
    }

    const name = $("#name").val();
    const address = $("#address").val();
    const neighborhood = $("#neighborhood").val();
    const size = parseFloat($("#size").val());
    const type = $("#studio-type").val();
    const capacity = parseInt($("#capacity").val());
    const hasParking = $("#hasParking").val();
    const hasPublicTransport = $("#hasPublicTransport").val();
    const availability = "Available";
    const rentalTerm = $("#rentalTerm").val();
    const pricePerTerm = parseFloat($("#price").val());

    // Create a new studio object
    const newStudio = {
      name,
      address,
      neighborhood,
      size,
      type,
      capacity,
      hasParking,
      hasPublicTransport,
      availability,
      rentalTerm,
      pricePerTerm,
      ownerEmail: localStorage.getItem("userLoggedIn"),
    };

    // Check if the name is duplicate
    if (await isNameDuplicate(name)) {
      $("#error-message").css("color", "red");
      $("#error-message").text("The name is already in use. Please use a different name.");
      return;
    }

    let studioData = await retrieveStudioData();

    studioData.push(newStudio);

    await saveStudioData(studioData);

    $("#add-listing form").trigger("reset");

    alert("Listing added successfully!");
    window.location.href = "studiosListing.html";
  });

  // Event listener for input on form fields to remove error message
  $("#add-listing form input, #add-listing form select").on("input", function () {
    const $field = $(this);
    const $error = $field.siblings(".error-message");

    if ($field.val().trim() !== "") {
      $field.css("border", "1px solid gray");
      $error.remove();
    }
  });
});
