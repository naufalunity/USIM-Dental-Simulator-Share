# USIM Case 1 Secure Voice Starter

This project includes a mobile-first frontend and server-side API endpoints for speech transcription, patient response generation, spoken response, and formative feedback. It is a development starter and must be tested before student use.

## For a non-programmer: recommended next step

Ask a university IT colleague or developer to help with the initial cloud setup. You do not need to understand or edit the code yourself. Give them this project folder or ZIP and ask them to follow the deployment checklist in `DEPLOYMENT_GUIDE.md`.

## Project structure

```text
usim-case1-secure-voice-starter/
├── api/
│   ├── case1-prompt.txt
│   ├── feedback.js
│   └── turn.js
├── public/
│   └── index.html
├── .env.example
├── .gitignore
├── DEPLOYMENT_GUIDE.md
├── package.json
├── README.md
└── vercel.json
```

## Security

- Never put the OpenAI API key in `public/index.html`.
- The case prompt is in `api/case1-prompt.txt` and is intended for server-side use.
- Store `OPENAI_API_KEY` as a server-side environment variable in the hosting dashboard.
- Do not commit `.env` files or API keys to GitHub.
- Do not enable public student access until authentication/rate limits, privacy review, and faculty testing are complete.
- Do not use real patient information in this educational simulation.

## Requirements

- Node.js LTS
- An OpenAI API account with active billing
- A Vercel account
- A modern browser with microphone support

Voice endpoints incur API costs. Check current model availability and pricing before use.

## Local development

1. Install Node.js LTS.
2. Open PowerShell or a terminal in this folder.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local` and add your own API key to `.env.local`.
5. Run `npm run dev`.
6. Open the local URL printed by Vercel CLI.

Never share `.env.local` or paste your API key into chat.

## Case-source caution

The supplied Case 1 material states “Metformin 10mg once daily.” This starter preserves that wording; faculty must verify it rather than silently correcting it. The case asks for a score but provides no numerical rubric, so feedback reports covered/partial/missed domains and formative feedback only.
