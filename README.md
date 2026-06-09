# scrollgen

MVP infinite scroll AI content generator. Scroll down, AI generates new content, appends to page. Built to test the engine before adding complexity.

## Setup

```bash
npm install
```

Copy the example env file and add your key:

```bash
cp .env.example .env
```

Open `.env` and paste your HuggingFace token:

```
HF_TOKEN=your_token_here
```

## Run

```bash
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Structure

```
scrollgen/
├── src/
│   ├── routes/
│   │   ├── +page.svelte              # frontend — scroll triggers AI generation
│   │   └── api/
│   │       └── generate/
│   │           └── +server.ts        # API endpoint — holds API key, calls HF
│   ├── app.html                      # app template
├── .env                              # your secrets — never committed
├── .env.example                      # safe to commit — shows what keys are needed
├── svelte.config.js                  # SvelteKit config
├── vite.config.ts                    # Vite config
├── .gitignore
└── package.json
```

## How it works

1. Browser loads the SvelteKit app
2. On scroll near the bottom, the Intersection Observer triggers content generation
3. Frontend calls `POST /api/generate` on the SvelteKit server
4. Server reads `HF_TOKEN` from `.env` and calls HuggingFace API
5. Response comes back, gets appended to the page
6. Repeat

The key never touches the frontend. `.env` is in `.gitignore` so it never goes to Git.
