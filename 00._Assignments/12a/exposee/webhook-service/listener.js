import express from "express";
const app = express();
app.use(express.json());

app.post("/incoming-webhook", (req, res) => {
  console.log("Received webhook:", req.body);
  res.sendStatus(204);
});


app.listen(9000, () => console.log("Listener on port 9000"));
