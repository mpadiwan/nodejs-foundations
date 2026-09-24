const request = require('supertest');
const createApp = require('./comment-api');

describe('Comments API', () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  describe('POST /comments', () => {
    test('creates a comment with text and author', async () => {
      const res = await request(app)
        .post('/comments')
        .send({ text: 'Great post!', author: 'Alice' });
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        id: 1,
        text: 'Great post!',
        author: 'Alice'
      });

    });

    test('returns 400 if text is missing', async () => {
      const res = await request(app)
        .post('/comments')
        .send({ author: 'Alice' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    test('returns 400 if author is missing', async () => {
      const res = await request(app)
        .post('/comments')
        .send({ text: 'Great post!' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /comments', () => {
    test('returns all comments', async () => {
      await request(app).post('/comments').send({ text: 'First comment', author: 'Alice' });
      await request(app).post('/comments').send({ text: 'Second comment', author: 'Bob' });
      const res = await request(app).get('/comments');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });

  describe('GET /comments/:id', () => {
    test('returns one comment', async () => {
      await request(app).post('/comments').send({ text: 'First comment', author: 'Alice' });
      const res = await request(app).get('/comments/1');
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        id: 1,
        text: 'First comment',
        author: 'Alice'
      });
    });

    test('returns 404 for missing ids', async () => {
      const res = await request(app).get('/comments/999');
      expect(res.status).toBe(404);
    });
  });
});