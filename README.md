# thissitehasbeenonforhowlong

A minimalist website that displays how long the server has been online — built with vanilla Node.js, no frameworks.

## How it works

- The server records the time it started and increments a counter every second
- The uptime is streamed to the browser in real time using **Server-Sent Events (SSE)**
- The current uptime is persisted to `time.json` every minute, so it survives server restarts
- The browser updates the displayed time automatically without any page refresh

## Stack

- **Node.js** (built-in `http` and `fs` modules only — no Express or other dependencies)
- Vanilla HTML + JavaScript on the frontend

## Project structure

```
├── server.js       # HTTP server with SSE and uptime logic
├── index.html      # Frontend — connects to SSE and updates the DOM
├── time.json       # Persisted uptime state (auto-generated, git-ignored)
├── nodemon.json    # Tells nodemon to ignore time.json
└── .gitignore
```

## Running locally

```bash
node server.js
```

Then open `http://localhost:8000` in your browser.

To run with auto-restart on file changes:

```bash
npx nodemon server.js
```

## Notes

- `time.json` is git-ignored so uptime is not reset on every clone
- Uptime is measured in years, days, hours, minutes and seconds
- Months are intentionally omitted due to variable month length
