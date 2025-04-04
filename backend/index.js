import express from "express";
import axios from "axios";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.post("/test-server", async (req, res) => {
  const { installationCode } = req.body;

  if (!installationCode) {
    return res
      .status(400)
      .json({ success: false, message: "Installation code is required" });
  }

  const MCP_URL = `https://registry.smithery.ai/servers/${installationCode}`;

  try {
    const response = await axios.get(MCP_URL, {
      headers: { Accept: "application/json" },
    });

    res.json({
      success: true,
      message: "MCP Server is reachable",
      data: response.data,
    });
  } catch (error) {
    const errorMessage = error.response?.data || error.message;

    res.status(500).json({
      success: false,
      message: "Failed to connect to MCP server",
      details: errorMessage,
    });
  }
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
