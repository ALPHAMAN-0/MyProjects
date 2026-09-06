- No root manifest — this repo is a collection of independent, self-contained project folders; there is no shared build/test/lint command.
- Per-subproject scripts observed (run from that subfolder only):
  - `Learn Full Stack Applications DeployMent/Server`: `npm run start` (node index.js)
  - `Learn Full Stack Applications DeployMent/Client`: `npm run dev`, `npm run build`, `npm run lint`, `npm run preview`
  - `Understanding FullStack & CORS/backend`: `npm run start` (node server.js)
  - `Understanding FullStack & CORS/frontend`: `npm run dev`, `npm run build`, `npm run lint`, `npm run preview`
- Do not assume shared dependencies across folders — each has its own `.gitignore` and, where JS, its own `package.json`/`package-lock.json`.
- `Project 00(Phishing Site)/` is explicitly labeled educational-only in its own README — treat contents accordingly, do not deploy.
- Files worth reading first:
  - `README.md`
  - `Understanding FullStack & CORS/readme.md`
  - `Learn Full Stack Applications DeployMent/Server/index.js`

Architecture: see ARCHITECTURE.md — read before structural changes
