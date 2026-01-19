# Understanding FullStack & CORS

Simple full-stack demo showing a Vite/React frontend consuming an Express backend with CORS enabled.

## Stack
- Backend: Express 5, CORS, serves `/api/data` JSON
- Frontend: Vite + React + Axios fetching from the backend

## How it works
- Backend exposes `GET /` (hello JSON) and `GET /api/data` returning a sample list.
- CORS middleware allows the frontend (running on a different port) to call the API.
- Frontend uses Axios to `GET /api/data`, then renders `id` and `name` for each item.

## Run locally
1) Backend
```bash
cd backend
npm install
npm run start
# server listens on http://localhost:3000
```

2) Frontend
```bash
cd frontend
npm install
npm run dev
# Vite serves on http://localhost:5173
```

## Key files
- Backend server: [backend/server.js](backend/server.js)
- Frontend entry: [frontend/src/App.jsx](frontend/src/App.jsx)

## API contract
- `GET /api/data` → `[{ id: number, name: string }]`

## Notes
- Frontend Axios call uses a relative path `/api/data`, so when frontend is started with Vite dev server, ensure the backend is reachable at `localhost:3000` and configure a proxy if needed.
