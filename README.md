# Dialect Classification App

A monorepo containing a React + TypeScript + Vite frontend and a Python backend
---

## Getting Started

### Prerequisites
- **Node.js**
- **Python**
- **[uv](https://github.com/astral-sh/uv)** package manager installed globally
- Any required environment variables set in `.env` files (see below)

---

### Clone the repository

### Set up the frontend
```bash
cd frontend
npm install
npm run dev
```

### Set up the backend
New Terminal
```bash
cd backend

# Create and sync the virtual environment from pyproject.toml
uv sync

# Activate the virtual environment
source .venv/bin/activate  # Mac/Linux
.venv\Scripts\activate     # Windows PowerShell

# Run the backend server
uv run uvicorn server:app --reload

# To perform unit testing
uv run pytest
```

### Environment Variables
```
cp backend/.env.example backend/.env
```
Replace placeholders

## Access the App
Start both the frontend and backend servers.
Open the frontend in your browser (default: http://localhost:5173).
The frontend will communicate with the backend API automatically.
