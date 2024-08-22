/* 
SODV1201 (Intro to Full Stack Web Development)
Instructor: Michael Dorsey
Submitted By: Group F
Members:
  Rudy Gabuco Jr
  Jensen Castro
  Dawn Bosing
*/

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json()); // To parse JSON bodies
app.use(express.static("public")); // To serve static files

// Path to studiData.json file
const studioDataFilePath = path.join(__dirname, "data", "studioData.json");
const userDataFilePath = path.join(__dirname, "data", "userData.json");

// Check if studioData.json file exists. If it doesn't, then create one.
if (!fs.existsSync(studioDataFilePath)) {
  fs.writeFileSync(studioDataFilePath, JSON.stringify([], null, 2), "utf8");
  console.log("Created an empty studioData.json file.");
}
// Check if userData.json file exists. If it doesn't, then create one.
if (!fs.existsSync(userDataFilePath)) {
  fs.writeFileSync(userDataFilePath, JSON.stringify([], null, 2), "utf8");
  console.log("Created an empty userData.json file.");
}

// Handle GET request for user data
app.get("/api/users", (req, res) => {
  const filePath = path.join(__dirname, "data", "userData.json");
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    res.json(JSON.parse(data));
  } else {
    res.json([]);
  }
});

// Handle POST request for user data
app.post("/api/users", (req, res) => {
  const filePath = path.join(__dirname, "data", "userData.json");
  fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2), "utf8");
  res.send("User data saved successfully");
});

// Handle GET request for studio data
app.get("/api/studios", (req, res) => {
  const filePath = path.join(__dirname, "data", "studioData.json");
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    res.json(JSON.parse(data));
  } else {
    res.json([]);
  }
});

// Handle POST request for studio data
app.post("/api/studios", (req, res) => {
  const filePath = path.join(__dirname, "data", "studioData.json");
  if (req.body.action === "delete") {
    // Handle deletion logic
    const studioToDelete = req.body.studio;
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) throw err;
      let studioData = JSON.parse(data);
      studioData = studioData.filter((studio) => studio.name !== studioToDelete.name);
      fs.writeFile(filePath, JSON.stringify(studioData, null, 2), "utf8", (err) => {
        if (err) throw err;
        res.send("Studio data updated successfully");
      });
    });
  } else {
    // Handle normal save/update logic
    fs.writeFile(filePath, JSON.stringify(req.body, null, 2), "utf8", (err) => {
      if (err) throw err;
      res.send("Studio data saved successfully");
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
