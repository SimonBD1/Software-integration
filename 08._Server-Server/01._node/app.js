import express from "express";

const app = express();

app.get("/expressData", (req, res) => {
    res.send({data: "This is the data from Express!"}); //JavaScript object, easier to work with
    //res.send("This is the data from Express!"); //Text string / html
});

app.get("/requestFastAPIData", async (req, res) => {
    const response = await fetch("http://localhost:8000/fastapiData");
    const result = await response.json();
    // res.send(result); 
    res.send({data: result}); // Keeps the same format as the Express data
});

app.get("/names/:name", (req, res) => {
    console.log(req.params.name);
    res.send({data: `your name is ${req.params.name}`});
});

app.get("/sniddy/:name/:number", (req, res) => {
    console.log(req.params.name);
    console.log(req.params.age);
    res.send({data: `Du er ${req.params.name}, og du elsker ${req.params.age} dillermænd i munden på en gang`});
});



const PORT=8080
app.listen(PORT, () => console.log("Server is running on port", PORT, "http://localhost:8080"));