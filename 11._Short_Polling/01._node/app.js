import express from "express";

const app = express();

app.use(express.static("public"));

const randomnumbers = [1, 25, 75];

app.get("/randomnumbers", (req, res) => {
  res.send({ data: randomnumbers });
});

app.get("/simulatenewnumbers", (req, res) => {
  const newNumber = getRandomInt(1, 100);
  randomnumbers.push(newNumber);

  res.send({ data: newNumber });
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const PORT = 8080;
app.listen(PORT, () => console.log(`Server is running on port`, PORT));
