# TripWise

TripWise is a budget-first trip planner built with React, Vite, Node.js and Express.

## Features

- Trip form with starting location, budget, traveller count, duration and date
- Multi-select travel preferences
- Destination recommendations from a starter destination dataset
- Estimated cost breakdown for transport, accommodation, food and activities
- Budget feasibility warning
- Average accommodation price ranges and occupancy notes
- Transport option price ranges
- Day-wise itinerary generation
- Destination reviews and ratings
- Local JSON review persistence by default
- Optional MongoDB persistence

## Requirements

- Node.js 20 or newer
- npm
- Optional: MongoDB

## Install

From the project root:

```powershell
npm install
cd server
npm install
```

## Run

Terminal 1:

```powershell
cd server
npm run dev
```

Terminal 2, from the project root:

```powershell
npm run dev
```

Open http://localhost:5173.

## Optional MongoDB

Copy `server/.env.example` to `server/.env`, then set `MONGODB_URI` to your MongoDB connection string. If no MongoDB URI is configured or the connection fails, reviews use `server/data/reviews.json`.

## API endpoints

- `GET /`
- `GET /api/destinations`
- `POST /api/trips/plan`
- `POST /api/itinerary`
- `GET /api/reviews/:destinationId`
- `POST /api/reviews`

## Important estimate note

The included destination and cost information is a starter dataset for demonstration and planning. It is not live inventory or live fare data. Some sample transport ranges use Bengaluru as the reference market. Confirm actual fares, schedules, accommodation availability, seasonal access and attraction opening times before booking.
