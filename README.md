# scrollgen

MVP infinite scroll AI content generator. Scroll down, AI generates new content provided as props to a dynamic component, appends to page.

This project is for learning purposes, to explore the possibilities of an LLM and get familiar with the SveltKit framework.

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

## Project Structure

```
scrollgen/
├── src/
│   ├── lib/
│   │   └── components/
│   │       ├── ContentCard.svelte    # displays individual content cards
│   │       ├── types.ts              # TypeScript type definitions
│   │       └── constants.ts          # shared constants
│   ├── routes/
│   │   ├── +page.svelte              # main page — scroll triggers AI generation
│   │   └── api/
│   │       └── generate/
│   │           └── +server.ts        # API endpoint — calls HuggingFace API
│   └── app.html                      # app template
├── static/                           # static assets
├── .env                              # your secrets — never committed
├── .env.example                      # template for environment variables
├── svelte.config.js                  # SvelteKit configuration
├── vite.config.ts                    # Vite configuration
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
