function userAccount(name, email, contactNo) {
  this.name = name;
  this.email = email;
  this.contactNo = contactNo;
}

function studio(name, address, area, type, capacity, hasParking, hasPublicTransport, availability, rentalTerm, pricePerTerm) {
  this.name = name;
  this.address = address;
  this.area = area;
  this.type = type;
  this.capacity = capacity;
  this.hasParking = hasParking;
  this.hasPublicTransport = hasPublicTransport;
  this.availability = availability;
  this.rentalTerm = rentalTerm;
  this.pricePerTerm = pricePerTerm;
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
    //name, address, area, type, capacity, hasParking, hasPublicTransport, availability, rentalTerm, pricePerTerm
    studioData.push(new studio("John's Art Studio", "123 Main St", "Downtown", "Art Studio", 10, true, true, "Available", "Monthly", 3000));
    studioData.push(new studio("Jane's Recording Studio", "456 Main St", "Downtown", "Recording Studio", 5, true, false, "Available", "Day", 200));
    studioData.push(new studio("JS Dance Studio", "789 Main St", "Edgemont", "Dance Studio", 20, true, true, "Rented", "Hour", 50));
    studioData.push(new studio("Smith Music Studio", "321 Main St", "Glendale", "Music Studio", 15, false, true, "Available", "Day", 300));
    studioData.push(new studio("JJ Photography Studio", "654 Main St", "Downtown", "Photography Studio", 8, true, true, "Rented", "Hour", 40));
    saveStudioData(studioData);
  }
}

