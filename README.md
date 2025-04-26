### Riff Architect is a local-first desktop app designed for guitarists and bands to organize riffs, build songs, and experiment with arrangements when writing music. ###

It helps musicians manage their collection of riffs, structure them into full songs, track practice sessions, and get basic AI-powered arrangement suggestions — all without needing internet access.
The app combines:

FastAPI backend (Python) for logic and API handling

React frontend (JavaScript) for the user interface

Electron desktop runtime (Node.js) to wrap everything into a native desktop app

Built for musicians who love building songs riff-by-riff.

# dev instructions to run the system on your local environment

# Backend
cd backend
python -m venv venv
source venv/Scripts/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend
cd ../frontend/app
npm install
npm start

# Electron
cd ../../electron
npm install
npm run start
