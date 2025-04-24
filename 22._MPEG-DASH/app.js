import express from "express";

const app = express();

app.use(express.static("public"));
app.use(express.static("videos"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
}
);


const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port`, PORT);
});