const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/api/users", (req, res) => {
  const filePath = path.join(__dirname, "data", "userData.json");
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    res.json(JSON.parse(data));
  } else {
    res.json([]);
  }
});

app.post("/api/users", (req, res) => {
  const filePath = path.join(__dirname, "data", "userData.json");
  fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2), "utf8");
  res.send("User data saved successfully");
});

app.get("/api/studios", (req, res) => {
  const filePath = path.join(__dirname, "data", "studioData.json");
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    res.json(JSON.parse(data));
  } else {
    res.json([]);
  }
});

app.post("/api/studios", (req, res) => {
  const filePath = path.join(__dirname, "data", "studioData.json");
  if (req.body.action === "delete") {
    // Handle deletion logic
    const studioToDelete = req.body.studio;
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) throw err;
      let studioData = JSON.parse(data);
      studioData = studioData.filter(
        (studio) =>
          studio.name !== studioToDelete.name ||
          studio.address !== studioToDelete.address ||
          studio.neighborhood !== studioToDelete.neighborhood ||
          studio.size !== studioToDelete.size ||
          studio.type !== studioToDelete.type
      );
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
