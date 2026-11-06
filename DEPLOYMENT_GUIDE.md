# Deployment checklist (for IT support)

## A. Before deployment

1. Keep the repository private.
2. Install Node.js LTS locally.
3. From the project folder, run `npm install`.
4. For local development, copy `.env.example` to `.env.local`.
5. Add your API key to `.env.local`:
   ```dotenv
   OPENAI_API_KEY=replace_with_your_own_key
   OPENAI_TEXT_MODEL=gpt-4.1-mini
   ```
   Never send the key in chat or commit it to source control.
6. Run `npm run dev` and open the local URL printed by Vercel CLI.
7. Confirm the homepage loads and microphone access is requested only after pressing **Start consultation**.

## B. Deploy to Vercel

1. Create/sign in to a Vercel account.
2. Import the private repository into Vercel, or deploy from the project folder using Vercel CLI.
3. In Vercel project **Settings > Environment Variables**, add:
   - `OPENAI_API_KEY` — your secret API key
   - `OPENAI_TEXT_MODEL` — `gpt-4.1-mini` (optional; this is the default)
4. Apply the variables to the relevant Preview and Production environments.
5. Deploy to a temporary private test URL first.
6. Test on Android Chrome and iPhone Safari, as well as a desktop browser.

## C. Required functional tests

1. Confirm the server can load `api/case1-prompt.txt` in the deployed runtime.
2. Open the website and press **Start consultation**.
3. Confirm the opening patient line appears exactly as specified in the case prompt.
4. Record one focused question, stop recording, and verify:
   - a transcript appears;
   - a patient reply appears;
   - spoken audio plays when the browser permits playback.
5. Ask about the presenting complaint, then ask a follow-up question. Confirm the patient only reveals details reasonably elicited.
6. Finish the history and submit both reflection fields.
7. Confirm `/api/feedback` gives formative domain feedback.
8. Confirm errors are understandable if the network, microphone, API key, billing, or model access is unavailable.
9. Check Vercel function logs for server errors. Do not log API keys or sensitive information.

## D. Before student rollout

1. Add appropriate authentication and rate limits.
2. Set usage limits/monitoring and decide who pays API costs.
3. Complete university privacy review, consent notice where applicable, and retention/deletion controls.
4. Obtain faculty approval and test the case content.
5. Verify the medication wording in the source case: “Metformin 10mg once daily.” Do not silently correct it in code; faculty must confirm the intended wording.
6. The supplied case asks for a score but gives no numerical rubric. Do not assign numeric scores until faculty approves a rubric.
7. Do not enable public student access until security, privacy, and faculty checks are complete.

## E. Troubleshooting

- **`OPENAI_API_KEY` not configured:** Check the environment variable spelling and deployment environment, then redeploy.
- **401/invalid API key:** Create/check the key in the OpenAI platform and update the server-side environment variable.
- **Billing/model access error:** Check API billing and availability of the configured models.
- **Microphone unavailable:** Use a supported browser and HTTPS; grant microphone permission.
- **Prompt file not found:** Confirm `api/case1-prompt.txt` is included in the deployed project and inspect Vercel build/runtime logs.
- **No audio playback:** Some browsers block playback until a user interaction; try pressing the record/stop controls again and check device volume.
- **Feedback request fails:** Check the Vercel function logs and confirm the API environment variables are configured.

This is a development starter, not a production-ready clinical assessment system.
