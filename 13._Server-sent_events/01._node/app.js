import express from "express";

const app = express();

app.use(express.static("public"));

app.get("/synchronizetime", (req, res) => {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });

  setInterval(() => sendTime(res), 1000);
});

function sendTime(res) {
  const time = new Date().toISOString();
  res.write(`data: ${time}\n\n`);
}

// 3 steder man kan oprette forbindelse til en SSE stream: browser (i konsol), postman og HTML
//for at sende data til en SSE stream, skal der sendes "data:" efterfulgt af dataen.

const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, () => console.log(`Server is running on port`, PORT));
