import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!process.env.HF_TOKEN) {
    return res.status(500).json({ error: "HF_TOKEN not set in .env" });
  }

  try {
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "Qwen/Qwen2.5-72B-Instruct",
          messages: [
            {
              role: "system",
              content:
                "You are a content generator for a website. Keep responses to 2-3 short paragraphs. Plain text only, no markdown.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 200,
          temperature: 0.8,
        }),
      },
    );

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content?.trim() || "...";
    res.json({ result: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Generation failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
