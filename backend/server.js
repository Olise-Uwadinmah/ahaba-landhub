const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory "database" (replace with MongoDB/MySQL later)
let users = [];
let properties = [];

// Create default admin
users.push({
  name: "Admin",
  email: "emmanueluwadinmah@gmail.com",
  password: bcrypt.hashSync("d68cash1", 10),
  role: "admin"
});


const SECRET_KEY = "your_secret_key";

// REGISTER
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if(users.find(u => u.email === email)) return res.status(400).json({ message: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashedPassword, role: "user" });
  res.json({ message: "Registered successfully" });
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if(!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if(!match) return res.status(400).json({ message: "Incorrect password" });

  const token = jwt.sign(
    { email: user.email, name: user.name, role: user.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.json({ message: "Login successful", token, name: user.name, role: user.role });
});

// GET ALL PROPERTIES
app.get("/properties", (req, res) => {
  res.json(properties);
});

// ADD NEW PROPERTY (admin only)
app.post("/properties", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if(!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if(decoded.role !== "admin") return res.status(403).json({ message: "Forbidden" });

    const { title, location, price, image } = req.body;
    const id = properties.length + 1;
    properties.push({ id, title, location, price, image });
    res.json({ message: "Property added successfully" });

  } catch(err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
