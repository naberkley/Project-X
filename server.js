import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
app.use(bodyParser.json());
app.use(cors());

let users = []; // In-memory user storage for demonstration purposes




///////////////////
// endpoints

app.post("/api/register", (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  if (users.find((user) => user.email === email)) {
    console.error("User already exists:", email); // Log the error on the server
    return res.status(400).json({ message: "User already exists" });
  }

  // Create a new user
  const newUser = { email, password };
  users.push(newUser);

  // Return the created user (excluding the password)
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
}); // end of /api/register

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Find the user
  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    console.error("Invalid email or password"); // Log the error on the server
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Return the user (excluding the password)
  const { password: _, ...userWithoutPassword } = user;
  res.status(200).json(userWithoutPassword);
}); // end of /api/login




// Serve static files from the React app
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'dist')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  if (!process.env.FROM_START_SCRIPT) {
    console.log(`Server is running on port ${PORT}`);
  }
});