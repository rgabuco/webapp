// User account constructor
function userAccount(name, email, contactNo) {
  this.name = name;
  this.email = email;
  this.contactNo = contactNo;
}

// Studio constructor
function studio(name, address, neighborhood, size, type, capacity, hasParking, hasPublicTransport, availability, rentalTerm, pricePerTerm, ownerEmail) {
  this.name = name;
  this.address = address;
  this.neighborhood = neighborhood;
  this.size = size;
  this.type = type;
  this.capacity = capacity;
  this.hasParking = hasParking;
  this.hasPublicTransport = hasPublicTransport;
  this.availability = availability;
  this.rentalTerm = rentalTerm;
  this.pricePerTerm = pricePerTerm;
  this.ownerEmail = ownerEmail;
}

// Fetch user data from the server
async function fetchUserData() {
  try {
    const response = await fetch("/api/users");
    if (response.ok) {
      return await response.json();
    }
    console.error("Failed to fetch user data:", response.statusText);
    return [];
  } catch (error) {
    console.error("Error fetching user data:", error);
    return [];
  }
}

// Save user data to the server
async function saveUserData(userData) {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      console.log("User data saved successfully");
    } else {
      console.error("Failed to save user data:", response.statusText);
    }
  } catch (error) {
    console.error("Error saving user data:", error);
  }
}

// Fetch studio data from the server
async function fetchStudioData() {
  try {
    const response = await fetch("/api/studios");
    if (response.ok) {
      return await response.json();
    }
    console.error("Failed to fetch studio data:", response.statusText);
    return [];
  } catch (error) {
    console.error("Error fetching studio data:", error);
    return [];
  }
}

// Save studio data to the server
async function saveStudioData(studioData) {
  try {
    const response = await fetch("/api/studios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studioData),
    });
    if (response.ok) {
      console.log("Studio data saved successfully");
    } else {
      console.error("Failed to save studio data:", response.statusText);
    }
  } catch (error) {
    console.error("Error saving studio data:", error);
  }
}

// Retrieve user data (same as fetchUserData but retained for compatibility)
async function retrieveUserData() {
  return await fetchUserData();
}

// Retrieve studio data (same as fetchStudioData but retained for compatibility)
async function retrieveStudioData() {
  return await fetchStudioData();
}

// Create dummy data if none exists on the server
async function createDummyData() {
  let userData = await fetchUserData();
  if (!userData.length) {
    userData.push(new userAccount("John Doe", "John.Doe@example.com", "1234567890"));
    userData.push(new userAccount("Jane Doe", "Jane.Doe@example.com", "1234567891"));
    userData.push(new userAccount("John Smith", "John.Smith@example.com", "1234567892"));
    userData.push(new userAccount("Jane Smith", "Jane.Smith@example.com", "1234567893"));
    userData.push(new userAccount("John Johnson", "John.Johnson@example.com", "1234567894"));
    await saveUserData(userData);
  }

  let studioData = await fetchStudioData();
  if (!studioData.length) {
    studioData.push(new studio("John's Art Studio", "123 Main St", "Downtown", 150, "Art Studio", 10, "No", "Yes", "Available", "Month", 3000, "John.Doe@example.com"));
    studioData.push(new studio("Jane's Recording Studio", "456 Main St", "Downtown", 80, "Recording Studio", 5, "Yes", "no", "Available", "Day", 200, "Jane.Doe@example.com"));
    studioData.push(new studio("JS Dance Studio", "789 Main St", "Edgemont", 200, "Dance Studio", 20, "Yes", "Yes", "Rented", "Hour", 50, "John.Smith@example.com"));
    studioData.push(new studio("Smith Music Studio", "321 Main St", "Glendale", 120, "Music Studio", 15, "no", "Yes", "Available", "Day", 300, "Jane.Smith@example.com"));
    studioData.push(new studio("JJ Photography Studio", "654 Main St", "Downtown", 70, "Photography Studio", 8, "Yes", "Yes", "Rented", "Hour", 40, "John.Johnson@example.com"));
    await saveStudioData(studioData);
  }
}
