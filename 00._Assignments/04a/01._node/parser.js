import fs from "fs/promises";

// Function to parse JSON file
export async function parseJsonFile() {
  try {
    const data = await fs.readFile("./data.json", "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading or parsing JSON file:", err);
    return { error: "Failed to read JSON file" };
  }
}

// Function to parse CSV file
export async function parseCsvFile() {
  try {
    const data = await fs.readFile("./data.csv", "utf8");
    const rows = data.trim().split("\n");
    const csvData = rows.map((row) => row.split(","));
    return csvData;
  } catch (err) {
    console.error("Error reading CSV file:", err);
    return { error: "Failed to read CSV file" };
  }
}
