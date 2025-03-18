import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'project_x_dev',
  password: '666',
  port: 5432,
});

///////////////////
// endpoints

// Test database connection
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS current_time");
    res.status(200).json({ success: true, currentTime: result.rows[0].current_time });
  } catch (error) {
    console.error("Database connection test failed:", error);
    res.status(500).json({ success: false, message: "Database connection failed" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, email, user_role, subscription_tier, payment_info FROM users`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { email, user_role, subscription_tier, payment_info } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users
       SET email = $1, user_role = $2, subscription_tier = $3, payment_info = $4
       WHERE id = $5 RETURNING *`,
      [email, user_role, subscription_tier, payment_info, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      console.error("User already exists:", email); // Log the error on the server
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );

    // Return the created user (excluding the password)
    const { password: _, ...userWithoutPassword } = newUser.rows[0];
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}); // end of /api/register

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = userResult.rows[0];

    if (!user) {
      console.error("Invalid email or password"); // Log the error on the server
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.error("Invalid email or password"); // Log the error on the server
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Return the user (excluding the password)
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
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