// Then add full CRUD routes for /notes to your app.js (or create a separate notes.js if you prefer). This prepares you for the capstone in Module 10.

// app.js
require('dotenv/config');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const app = express();
const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
 
app.use(express.json());
 
// List all tasks
app.get('/tasks', async (req, res, next) => {
  try {
    const where = {};
    if (req.query.done !== undefined) {
      where.done = req.query.done === 'true';
    }
    if (req.query.tag) {
      where.tag = req.query.tag;
    }
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
      where: where,
    });

    res.json(tasks);
  } catch (err) {
    next(err);
  }
});
 
// Get one task
app.get('/tasks/:id', async (req, res, next) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
});
 
// Create a task
app.post('/tasks', async (req, res, next) => {
  try {
    const { title, tag } = req.body;
    if (!title) return res.status(400).json({ error: 'title is required' });
    const task = await prisma.task.create({
      data: { title, tag }
    });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});
 
// Update a task
app.put('/tasks/:id', async (req, res, next) => {
  try {
    const task = await prisma.task.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(task);
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Task not found' });
    }
    next(err);
  }
});
 
// Delete a task
app.delete('/tasks/:id', async (req, res, next) => {
  try {
    await prisma.task.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Task not found' });
    }
    next(err);
  }
});

// List all notes
app.get('/notes', async (req, res, next) => {
  try {
    const notes = await prisma.note.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(notes);
  } catch (err) {
    next(err);
  }
});

// Get one note
app.get('/notes/:id', async (req, res, next) => {
  try {
    const note = await prisma.note.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (err) {
    next(err);
  }
});

// Create a note
app.post('/notes', async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'content is required' });
    const note = await prisma.note.create({
      data: { content }
    });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
}); 

// Update a note
app.put('/notes/:id', async (req, res, next) => {
  try {
    const note = await prisma.note.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(note);
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Note not found' });
    }
    next(err);
  }
});

// Delete a note
app.delete('/notes/:id', async (req, res, next) => {
  try {
    await prisma.note.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Note not found' });
    }
    next(err);
  }
});
 
// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});
 
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Tasks API running at http://localhost:${PORT}`);
});
