const request = require('supertest');
const express = require('express');

function createApp() {
  const app = express();
  app.use(express.json());

  let comments = [];
  let nextId = 1;

  app.post('/comments', (req, res) => {
    const { text, author } = req.body;
    if (!text) return res.status(400).json({ error: 'Text is required' });
    if (!author) return res.status(400).json({ error: 'Author is required' });
    const comment = { id: nextId++, text, author };
    comments.push(comment);
    res.status(201).json(comment);
  });

  app.get('/comments', (req, res) => {
    res.json(comments);
  });

  app.get('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    res.json(comment);
  });

  return app;
}

module.exports = createApp;