import express from "express";
import { parseCsvFile, parseJsonFile } from "./parser.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// parse CSV endpoint
app.get("/parsecsv", async (req, res) => {
  const csvData = await parseCsvFile();
  res.json(csvData); // Send parsed CSV as JSON
});

// parse JSON endpoint
app.get("/parsejson", async (req, res) => {
  const jsonData = await parseJsonFile();
  res.json(jsonData); // Send parsed JSON
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT, "http://localhost:8080");
});
