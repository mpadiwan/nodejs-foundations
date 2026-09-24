# Notes API — Capstone (Part 1)

## What this is

A REST API for managing personal notes: create, read, update, and delete.
This is the Module 10 capstone for nodejs-foundations, and its purpose is to
demonstrate solid command of the fundamentals covered so far — not to be a
finished product. Auth, Docker, and TypeScript are deliberately deferred to
Part 2 so this stays focused on the core Node.js/Express/Prisma skills.

## Data model

**Note**
- `title` — required
- `content` — required
- `tag` — optional
- `createdAt` / `updatedAt` — timestamps

Persisted in SQLite via Prisma.

## Functional scope

- CRUD endpoints for notes
- Input validation on writes
- Centralized error handling with consistent error responses
- Integration tests covering happy paths and key failure modes

## Explicitly out of scope (Part 1)

- Authentication / authorization
- Docker
- TypeScript

These are Part 2 additions — noting them here so scope creep during
implementation is easy to catch.

## Status

Planning stage — implementation not yet started.

---

*Setup instructions, how to run, how to test, and the endpoint list will move
into README.md near the end of development.*
