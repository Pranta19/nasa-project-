import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";


dotenv.config();


// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "frontend")));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// API route example
app.get("/api/satellites", async (req, res) => {
  const { default: Satellite } = await import("./models/Satellite.js");
  try {
    const satellites = await Satellite.find();
    res.json(satellites);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch satellites" });
  }
});

// WebSocket setup
const wss = new WebSocketServer({ noServer: true });
wss.on("connection", (ws) => {
  console.log("🔌 WebSocket client connected");
  ws.send("Welcome to Orbital Shield live feed 🌍");
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

// Upgrade HTTP → WebSocket
server.on("upgrade", (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit("connection", ws, req);
  });
});

