import express from "express";
import { parseCsvFile, parseJsonFile } from "./parser.js";

const app = express();
// PARSER FOR CSV AND JSON FILES, THAT PYTHON SCRIPTS WILL USE
app.get("/parsecsv", async (req, res) => {
  const csvData = await parseCsvFile();
  res.json(csvData); // Send parsed CSV as JSON
});

app.get("/parsejson", async (req, res) => {
  const result = await parseJsonFile();
  res.send(result);
});

// PARSING DATA FROM PYTHON FOR CSV AND JSON FILES
app.get("/CSVfromPY", async (req, res) => {
  const response = await fetch("http://localhost:8000/parsecsvPY");
  const result = await response.json();
  // res.send(result);
  res.send({ data: result });
});

app.get("/JSONfromPY", async (req, res) => {
  const response = await fetch("http://localhost:8000/parsejsonPY");
  const result = await response.json();
  // res.send(result);
  res.send({ data: result });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT, "http://localhost:8080");
});
