require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");

const app = express();


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});


db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});


app.get("/", (req, res) => {
  db.query("SELECT NOW() AS now", (err, result) => {
    if (err) {
      return res.status(500).send("Database error");
    }

    res.send("Database Connected Successfully: " + result[0].now);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});