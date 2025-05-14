// index.js
import express from "express";
import webhookRoutes from "./routes/webhooks.js";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount at /webhooks
app.use("/webhooks", webhookRoutes);

app.use(express.static(path.join(process.cwd(), "public")));

// Simple health check
app.get("/ping", (req, res) => res.send("pong"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Webhook service listening on port ${PORT}`);
});
