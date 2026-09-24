const express = require('express');
const app = express();

app.get('/slow', async (req, res, next) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    throw new Error('Something went wrong');
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
