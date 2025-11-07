import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001; // Changed from 5000 to avoid macOS AirPlay conflict

app.use(express.json());
app.use(cors());

//API routes
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the server!" }); // Send JSON instead of plain text
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
