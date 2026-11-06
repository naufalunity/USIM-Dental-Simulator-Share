import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
    const { turns = [], summary = "", impression = "" } = req.body || {};
    const r = await client.responses.create({
      model: process.env.OPENAI_TEXT_MODEL || "gpt-4.1-mini",
      instructions: `Assess a dental history-taking simulation formatively. Use only supplied dialogue and student answers. Return JSON only: {"overall":"short summary","domains":[{"domain":"Presenting complaint: onset, site, radiation, nature, severity, aggravating/relieving factors","status":"Covered/Partial/Missed","comment":"evidence"},{"domain":"Associated symptoms and red flags: swelling, fever, mouth opening, swallowing, breathing","status":"Covered/Partial/Missed","comment":"evidence"},{"domain":"Medical history and diabetes follow-up","status":"Covered/Partial/Missed","comment":"evidence"},{"domain":"Medication and compliance","status":"Covered/Partial/Missed","comment":"evidence"},{"domain":"Allergies, asthma, blood disease","status":"Covered/Partial/Missed","comment":"evidence"},{"domain":"Dental history and oral hygiene","status":"Covered/Partial/Missed","comment":"evidence"},{"domain":"Diet history","status":"Covered/Partial/Missed","comment":"evidence"},{"domain":"Social/family history including smoking","status":"Covered/Partial/Missed","comment":"evidence"}],"improvement":"one practical next step"}. Use Covered only when clearly elicited; Partial when some elements were elicited; otherwise Missed. Do not invent a numeric score; source case has no explicit scoring rubric.`,
      input: JSON.stringify({ turns, summary, impression }),
      max_output_tokens: 900
    });

    const raw = (r.output_text || "")
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/```$/, "");

    return send(res, 200, JSON.parse(raw));
  } catch (e) {
    console.error("feedback failed", e?.message || e);
    return send(res, 500, { error: "Could not generate feedback. Check API setup." });
  }
}
