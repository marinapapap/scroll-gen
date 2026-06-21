import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { HF_TOKEN } from "$env/static/private";

export const POST: RequestHandler = async ({ request }) => {
  const { prompt } = await request.json();

  if (!HF_TOKEN) {
    return json({ error: "HF_TOKEN not set in environment" }, { status: 500 });
  }

  try {
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "Qwen/Qwen2.5-72B-Instruct",
          messages: [
            {
              role: "system",
              content: `You are a creative web designer and content generator.
    
                  Return ONLY valid JSON.

                  Available component: ContentCard with props:
                  - title (string)
                  - text (string)  
                  - bgColor (hex color)
                  - textColor (hex color)
                  - padding: "compact" | "normal" | "spacious"
                  - alignment: "left" | "center" | "right"

                  Be creative with colors and vary the design for each section.

                  Example response:
                  {
                    "componentType": "ContentCard",
                    "props": {
                      "title": "Morning Coffee",
                      "text": "There's something special about the first sip...",
                      "bgColor": "#fef3e2",
                      "textColor": "#3d2817",
                      "padding": "spacious",
                      "alignment": "center"
                    }
                  }`,
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
    return json({ result: text });
  } catch (err) {
    console.error(err);
    return json({ error: "Generation failed" }, { status: 500 });
  }
};
