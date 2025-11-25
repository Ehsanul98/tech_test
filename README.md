# Tic-Tac-Toe Full-Stack Application

A full-stack Tic-Tac-Toe game with React frontend and Express/SQLite backend.

## Tech Stack

**Frontend:** React, TypeScript, Webpack, TailwindCSS  
**Backend:** Express, TypeScript, SQLite  
**Testing:** Jest

## Quick Start

### Backend

```bash
cd server
npm install
npm run dev
```

Server runs on `http://localhost:3002`

### Frontend

```bash
cd client
npm install
npm start
```

Frontend runs on `http://localhost:3001`

## Run Tests

### Backend Tests

```bash
cd server
npm test
```

### Frontend Tests

```bash
cd client
npm test
```

## Features

- Variable board sizes (3x3 to 15x15)
- Win detection for rows, columns, and diagonals
- Game statistics tracking (wins, losses, draws)
- Persistent SQLite database

## API Endpoints

- `POST /api/games` - Save game result
- `GET /api/stats` - Get overall statistics

## Database

SQLite database automatically created at `server/tictactoe.db`
