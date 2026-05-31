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

Then open `http://localhost:3000` in your browser.

## Structure

```
scrollgen/
├── public/
│   └── index.html      # frontend — scroll triggers AI generation
├── src/
│   └── server.js       # Express server — holds API key, proxies HF requests
├── .env                # your secrets — never committed
├── .env.example        # safe to commit — shows what keys are needed
├── .gitignore
└── package.json
```

## How it works

1. Browser loads `index.html`
2. On scroll near the bottom, JS calls `POST /generate` on the local server
3. Server reads `HF_TOKEN` from `.env` and calls HuggingFace API
4. Response comes back, gets appended to the page
5. Repeat

The key never touches the frontend. `.env` is in `.gitignore` so it never goes to Git.
