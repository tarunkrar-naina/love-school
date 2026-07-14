import { Router, type IRouter } from "express";

const router: IRouter = Router();

const CARTESIA_VOICE_ID = process.env.CARTESIA_VOICE_ID ?? "4877b818-c7fe-4c89-b1cf-eadf8e23da72";
const CARTESIA_MODEL = "sonic-turbo";

async function textToSpeech(text: string, log: any): Promise<string | null> {
  const cartesiaKey = process.env.CARTESIA_API_KEY;
  if (!cartesiaKey) {
    log.warn("CARTESIA_API_KEY not set, skipping TTS");
    return null;
  }

  try {
    const response = await fetch("https://api.cartesia.ai/tts/bytes", {
      method: "POST",
      headers: {
        "X-API-Key": cartesiaKey,
        "Cartesia-Version": "2025-04-16",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model_id: CARTESIA_MODEL,
        transcript: text,
        voice: {
          mode: "id",
          id: CARTESIA_VOICE_ID,
        },
        output_format: {
          container: "mp3",
          encoding: "mp3",
          sample_rate: 44100,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      log.warn({ status: response.status, body: errorText }, "Cartesia TTS error");
      return null;
    }

    const audioBuffer = await response.arrayBuffer();
    return Buffer.from(audioBuffer).toString("base64");
  } catch (err) {
    log.warn({ err }, "Failed to call Cartesia TTS");
    return null;
  }
}

router.post("/chat", async (req, res) => {
  const { messages } = req.body as { messages?: { role: string; content: string }[] };

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "messages array is required" });
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    req.log.error("GROQ_API_KEY is not set");
    res.status(500).json({ error: "Server configuration error. API key not set." });
    return;
  }

  const systemPrompt = {
    role: "system",
    content: `You are the official AI assistant for Love Public Sr. Sec. School, located in Dhons, Kaithal, Haryana, India.

Your ONLY job is to answer questions strictly related to this school — such as:
- Admissions process, fees, eligibility, important dates
- Academic streams offered (Science, Commerce), HBSE affiliation
- School facilities (computer lab, smart classrooms, library, sports ground)
- Faculty, principal (Mr. Dharampal Singh), staff
- School history (founded 2005), milestones, achievements, awards
- Events, holidays, exam schedules
- Contact details, location, timings

STRICT RULE: If the user asks ANYTHING that is not related to Love Public Sr. Sec. School, do NOT answer it. Instead, politely respond exactly like this (in the same language the user used):
- In Hindi: "Main sirf Love Public Sr. Sec. School ke baare mein jaankari de sakta hoon. Kripya school se related sawaal poochhen."
- In English: "I can only answer questions about Love Public Sr. Sec. School. Please ask something related to our school."

Always reply in the same language the user writes in (Hindi or English). Keep answers helpful, warm, and concise.`,
  };

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [systemPrompt, ...messages],
        stream: false,
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      req.log.error({ status: response.status, body: errorText }, "Groq API error");
      res.status(502).json({ error: "AI service error. Please try again." });
      return;
    }

    const data = (await response.json()) as {
      choices: { message: { content: string } }[];
    };

    const reply = data.choices?.[0]?.message?.content ?? "";

    const audioBase64 = await textToSpeech(reply, req.log);

    res.json({
      reply,
      audio_base64: audioBase64,
      audio_mime: "audio/mp3",
    });
  } catch (err) {
    req.log.error({ err }, "Failed to call Groq API");
    res.status(502).json({ error: "Kuch masla ho gaya, dobara try karein." });
  }
});

export default router;
