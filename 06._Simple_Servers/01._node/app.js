import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
    });

    app.get("/encode/:message", (req, res) => {
        const message = req.params.message;
        const encodedMessage = Buffer.from(message).toString('base64');
        res.send(encodedMessage);
    });

app.get("/decode/:message", (req, res) => {
    const message = req.params.message;
    const decodedMessage = Buffer.from(message, 'base64').toString('utf-8');
    res.send(decodedMessage);
});

app.get("/greetings/:name", (req, res) => {
    const name = req.params.name;
    res.send(`Hello, ${name}!`);
});



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Server is running on port",PORT,"http://localhost:8080");
});