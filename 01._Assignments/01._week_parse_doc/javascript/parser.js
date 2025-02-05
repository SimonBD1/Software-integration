const fs = require('fs');

// Function to parse JSON file
function parseJsonFile() {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }
    try {
      const jsonData = JSON.parse(data);
      console.log('JSON data:', jsonData);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
    }
  });
}

// Function to parse CSV file
function parseCsvFile() {
  fs.readFile('./data.csv', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading CSV file:', err);
      return;
    }
    // Split the file into lines and then split each line by commas.
    const rows = data.trim().split('\n');
    const csvData = rows.map(row => row.split(','));
    console.log('CSV data:', csvData);
  });
}

// Call the functions to parse and log the files
parseJsonFile();
parseCsvFile();