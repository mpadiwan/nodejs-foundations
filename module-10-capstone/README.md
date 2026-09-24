# Notes API — Capstone (Part 1)

A REST API for managing personal notes: create, read, update, and delete.
Built with Express and Prisma (SQLite). See [PROJECT.md](PROJECT.md) for scope
and data model details.

## Setup

Requires Node.js and npm.

```bash
npm install
```

Create a `.env` file in `module-10-capstone/` pointing Prisma at the dev database:

```
DATABASE_URL="file:./dev.db"
```

Run migrations to create the SQLite database:

```bash
npm run db:migrate
```

## Run

```bash
npm start       # node src/server.js
npm run dev     # nodemon src/server.js, restarts on change
```

The server listens on `http://localhost:3000` by default (override with a `PORT`
env var).

Optional: `npm run db:studio` opens Prisma Studio to inspect the database.

## Test

```bash
npm test
npm run test:coverage
```

Tests run against a separate SQLite database (`test.db`), configured via
`.env.test` (`DATABASE_URL="file:./test.db"`). This file is reset and
migrated automatically once per test run — no manual setup needed beyond
`npm install`.

## API

All error responses share one shape:

```json
{ "error": { "status": 400, "message": "..." } }
```

### `GET /health`

Returns `{ "status": "ok" }`.

### `GET /notes`

Lists all notes, newest first.

### `POST /notes`

Creates a note.

Body:

```json
{ "title": "string, required", "content": "string, required", "tag": "string, optional" }
```

- `201` with the created note
- `400` if `title`/`content` are missing/empty, or `tag` is present but not a string

### `GET /notes/:id`

- `200` with the note
- `400` if `:id` is not an integer
- `404` if no note has that id

### `PUT /notes/:id`

Same body/validation as `POST /notes`.

- `200` with the updated note
- `400` on invalid `:id` or body
- `404` if no note has that id

### `DELETE /notes/:id`

- `204` on success
- `400` if `:id` is not an integer
- `404` if no note has that id
