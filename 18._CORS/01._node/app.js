import express from "express";

import cors from "cors";

const app = express();

/* app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}
); */

app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  })
);

app.get("/timestamp", (req, res) => {
  res.send({ data: new Date() });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
