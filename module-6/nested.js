const express = require('express');
const app = express();
 
app.use(express.json());

let projects = [
  { id: 1, name: 'Website Redesign', tasks: [
    { id: 1, title: 'Mockups', done: true },
    { id: 2, title: 'Build homepage', done: false }
  ]},
  { id: 2, name: 'API Migration', tasks: [] }
];
let nextProjectId = 3;
let nextTaskId = 3;

// List all projects
app.get('/projects', (req, res) => {
  res.json(projects);
});

// List tasks for a specific project
app.get('/projects/:id/tasks', (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = projects.find(p => p.id === projectId);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project.tasks);
});

// Add a new task to a project
app.post('/projects/:id/tasks', (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = projects.find(p => p.id === projectId);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const task = { id: nextTaskId++, title, done: false };
  project.tasks.push(task);
  res.status(201).json(task);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Users API running at http://localhost:${PORT}`);
});
