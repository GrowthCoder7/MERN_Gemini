const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.use(express.json());

// const corsObj = {
//   origin: ["https://localhost:5173", "https://localhost:5174"], // Ensure this matches the actual frontend URL
// };

// app.use(cors(corsObj));

app.post("/gen", async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await model.generateContent(prompt);
    const resp = result.response.text();
    res.status(201).send(resp);
  } catch (error) {
    console.error(error);
    res.status(401).send("Failed request!");
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
