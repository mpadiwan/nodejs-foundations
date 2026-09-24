const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/db");

function createNote(overrides = {}) {
  return prisma.note.create({
    data: {
      title: "Existing title",
      content: "Existing content",
      ...overrides,
    },
  });
}

beforeEach(async () => {
  await prisma.note.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /notes", () => {
  it("creates a note and returns 201", async () => {
    const res = await request(app)
      .post("/notes")
      .send({ title: "Buy milk", content: "2% milk, 1 gallon", tag: "errands" });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      title: "Buy milk",
      content: "2% milk, 1 gallon",
      tag: "errands",
    });
    expect(res.body.id).toEqual(expect.any(Number));

    const stored = await prisma.note.findUnique({ where: { id: res.body.id } });
    expect(stored).not.toBeNull();
  });

  it("creates a note without a tag", async () => {
    const res = await request(app)
      .post("/notes")
      .send({ title: "No tag", content: "content here" });

    expect(res.status).toBe(201);
    expect(res.body.tag).toBeNull();
  });

  it("returns 400 when title is missing", async () => {
    const res = await request(app).post("/notes").send({ content: "content only" });

    expect(res.status).toBe(400);
    expect(res.body.error.message).toMatch(/title/i);
  });

  it("returns 400 when title is blank", async () => {
    const res = await request(app).post("/notes").send({ title: "   ", content: "content" });

    expect(res.status).toBe(400);
    expect(res.body.error.message).toMatch(/title/i);
  });

  it("returns 400 when content is missing", async () => {
    const res = await request(app).post("/notes").send({ title: "title only" });

    expect(res.status).toBe(400);
    expect(res.body.error.message).toMatch(/content/i);
  });

  it("returns 400 when tag is not a string", async () => {
    const res = await request(app)
      .post("/notes")
      .send({ title: "title", content: "content", tag: 123 });

    expect(res.status).toBe(400);
    expect(res.body.error.message).toMatch(/tag/i);
  });

  it("returns 400 for a malformed JSON body", async () => {
    const res = await request(app)
      .post("/notes")
      .set("Content-Type", "application/json")
      .send("{ not valid json");

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});

describe("GET /notes", () => {
  it("returns an empty list when there are no notes", async () => {
    const res = await request(app).get("/notes");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("returns notes newest first", async () => {
    const older = await createNote({
      title: "First",
      content: "one",
      createdAt: new Date(Date.now() - 60_000),
    });
    const newer = await createNote({ title: "Second", content: "two" });

    const res = await request(app).get("/notes");

    expect(res.status).toBe(200);
    expect(res.body.map((n) => n.id)).toEqual([newer.id, older.id]);
  });
});

describe("GET /notes/:id", () => {
  it("returns the note when it exists", async () => {
    const note = await createNote({ title: "Findable", content: "content" });

    const res = await request(app).get(`/notes/${note.id}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(note.id);
    expect(res.body.title).toBe("Findable");
  });

  it("returns 404 when the note does not exist", async () => {
    const res = await request(app).get("/notes/999999");

    expect(res.status).toBe(404);
    expect(res.body.error.message).toMatch(/not found/i);
  });

  it("returns 400 when id is not an integer", async () => {
    const res = await request(app).get("/notes/abc");

    expect(res.status).toBe(400);
    expect(res.body.error.message).toMatch(/integer/i);
  });
});

describe("PUT /notes/:id", () => {
  it("updates an existing note", async () => {
    const note = await createNote({ title: "Old", content: "old content" });

    const res = await request(app)
      .put(`/notes/${note.id}`)
      .send({ title: "New", content: "new content", tag: "updated" });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: note.id,
      title: "New",
      content: "new content",
      tag: "updated",
    });
  });

  it("returns 404 when updating a note that does not exist", async () => {
    const res = await request(app)
      .put("/notes/999999")
      .send({ title: "New", content: "new content" });

    expect(res.status).toBe(404);
  });

  it("returns 400 when the update body is invalid", async () => {
    const note = await createNote();

    const res = await request(app).put(`/notes/${note.id}`).send({ content: "missing title" });

    expect(res.status).toBe(400);
  });
});

describe("DELETE /notes/:id", () => {
  it("deletes an existing note and returns 204", async () => {
    const note = await createNote({ title: "To delete", content: "content" });

    const res = await request(app).delete(`/notes/${note.id}`);

    expect(res.status).toBe(204);
    expect(res.body).toEqual({});

    const stored = await prisma.note.findUnique({ where: { id: note.id } });
    expect(stored).toBeNull();
  });

  it("returns 404 when deleting a note that does not exist", async () => {
    const res = await request(app).delete("/notes/999999");

    expect(res.status).toBe(404);
  });

  it("returns 400 when id is not an integer", async () => {
    const res = await request(app).delete("/notes/abc");

    expect(res.status).toBe(400);
  });
});
