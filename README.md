# Notes App

A simple and modern web application for managing notes, built with Node.js, Express, and SQLite.

## Features

- Create, read, update, and delete notes
- Clean and responsive user interface
- Real-time updates
- Flash messages for user feedback
- Mobile-friendly design

## Prerequisites

- Node.js 16 or higher
- npm (Node package manager)

## Installation

1. Clone this repository or download the source code.

2. Install the required packages:
```bash
npm install
```

## Running the Application

### Development Mode

1. Start the development server:
```bash
npm run dev
```

2. Open your web browser and navigate to:
```
http://localhost:5173
```

The application will automatically reload when you make changes to the code.

### Production Mode

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
node server.js
```

3. Open your web browser and navigate to:
```
http://localhost:3001
```

## Usage

- Click "Create New Note" to add a new note
- Click "Edit" on any note to modify its content
- Click "Delete" to remove a note
- Notes are automatically sorted by last updated time

## Technologies Used

- Node.js - Runtime environment
- Express - Web framework
- SQLite3 - Database
- Vite - Build tool and development server
- Bootstrap 5 - Frontend framework
- Bootstrap Icons - Icon library

## API Endpoints

- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get a specific note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note