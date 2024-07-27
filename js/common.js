function userAccount(name, email, contactNo) {
  this.name = name;
  this.email = email;
  this.contactNo = contactNo;
}

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

// Function to save data to localStorage
// localStorage is saved in the browser. Find it in Chrome at: Developer Tools > Application > Storage > Local Storage
function saveUserData(userData) {
  localStorage.setItem('userData', JSON.stringify(userData));
}

// Function to retrieve data from localStorage
function retrieveUserData() {
  let storedData = localStorage.getItem('userData');
  if (storedData) {
      return JSON.parse(storedData);
  }
  return [];
}

function saveStudioData(studioData) {
  localStorage.setItem('studioData', JSON.stringify(studioData));
}

// Function to retrieve data from localStorage
function retrieveStudioData() {
  let storedData = localStorage.getItem('studioData');
  if (storedData) {
      return JSON.parse(storedData);
  }
  return [];
}

// Function to clear data from localStorage
function clearLocalStorage() {
  localStorage.clear();
}

//create 5 dummy userAccount and studio objects and save to localStorage
function createDummyData() {
  let userData = retrieveUserData();
  if (!userData.length) {
    userData.push(new userAccount("John Doe", "John.Doe@example.com", "1234567890"));
    userData.push(new userAccount("Jane Doe", "Jane.Doe@example.com", "1234567891"));
    userData.push(new userAccount("John Smith", "John.Smith@example.com", "1234567892"));
    userData.push(new userAccount("Jane Smith", "Jane.Smith@example.com", "1234567893"));
    userData.push(new userAccount("John Johnson", "John.Johnson@example.com", "1234567894"));
    saveUserData(userData);
  }

  let studioData = retrieveStudioData();
  if (!studioData.length) {
    //name, address, neighborhood, size, type, capacity, hasParking, hasPublicTransport, availability, rentalTerm, pricePerTerm
    studioData.push(new studio("John's Art Studio", "123 Main St", "Downtown", 150, "Art Studio", 10, "No", "Yes", "Available", "Month", 3000, "John.Doe@example.com"));
    studioData.push(new studio("Jane's Recording Studio", "456 Main St", "Downtown", 80, "Recording Studio", 5, "Yes", "no", "Available", "Day", 200, "Jane.Doe@example.com"));
    studioData.push(new studio("JS Dance Studio", "789 Main St", "Edgemont", 200, "Dance Studio", 20, "Yes", "Yes", "Rented", "Hour", 50, "John.Smith@example.com"));
    studioData.push(new studio("Smith Music Studio", "321 Main St", "Glendale", 120 , "Music Studio", 15, "no", "Yes", "Available", "Day", 300, "Jane.Smith@example.com"));
    studioData.push(new studio("JJ Photography Studio", "654 Main St", "Downtown", 70, "Photography Studio", 8, "Yes", "Yes", "Rented", "Hour", 40, "John.Johnson@example.com"));
    saveStudioData(studioData);
  }
}

