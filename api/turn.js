import OpenAI from "openai";
import { Buffer } from "node:buffer";
import { readFileSync } from "node:fs";

function send(res, status, obj) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(obj));
}

export default async function handler(req, res) {
  if (req.method !== "POST") return send(res, 405, { error: "POST only" });
  if (!process.env.OPENAI_API_KEY) {
    return send(res, 500, { error: "Server is not configured with an API key yet." });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = readFileSync(new URL("./case1-prompt.txt", import.meta.url), "utf8");
    const { audioBase64, mimeType, turns = [] } = req.body || {};
    if (!audioBase64) return send(res, 400, { error: "No recording received." });
    if (typeof audioBase64 !== "string" || audioBase64.length > 10_000_000) {
      return send(res, 413, { error: "Recording too large. Ask a shorter question." });
    }

    const ext = (mimeType || "").includes("mp4") ? "m4a" : "webm";
    const transcription = await client.audio.transcriptions.create({
      file: new File(
        [Buffer.from(audioBase64, "base64")],
        `question.${ext}`,
        { type: mimeType || "audio/webm" }
      ),
      model: "gpt-4o-mini-transcribe"
    });

    const question = (transcription.text || "").trim();
    if (!question) {
      return send(res, 400, { error: "I could not hear a clear question. Please try again." });
    }

    const safeTurns = Array.isArray(turns)
      ? turns.slice(-16).filter(
          (t) =>
            t &&
            ["user", "assistant"].includes(t.role) &&
            typeof t.content === "string"
        )
      : [];

    const answer = await client.responses.create({
      model: process.env.OPENAI_TEXT_MODEL || "gpt-4.1-mini",
      instructions: prompt,
      input: [...safeTurns, { role: "user", content: question }],
      max_output_tokens: 140
    });

    const reply = (answer.output_text || "").trim() || "Sorry, could you ask me that again?";
    const speech = await client.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "ash",
      input: reply,
      instructions: "Speak as a natural, slightly anxious adult Malaysian man speaking plain English. Keep the answer brief and conversational."
    });

    const audio = Buffer.from(await speech.arrayBuffer()).toString("base64");
    return send(res, 200, { transcript: question, reply, audioBase64: audio });
  } catch (e) {
    console.error("voice turn failed", e?.message || e);
    return send(res, 500, {
      error: "The AI voice service could not process this turn. Check API billing, model access, and server logs."
    });
  }
}
