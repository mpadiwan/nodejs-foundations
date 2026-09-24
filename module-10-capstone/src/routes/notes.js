const express = require("express");
const prisma = require("../db");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const notes = await prisma.note.findMany({ orderBy: { createdAt: "desc" } });
    res.json(notes);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, content, tag } = req.body;

    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ error: "title is required" });
    }
    if (typeof content !== "string" || content.trim() === "") {
      return res.status(400).json({ error: "content is required" });
    }
    if (tag !== undefined && typeof tag !== "string") {
      return res.status(400).json({ error: "tag must be a string" });
    }

    const note = await prisma.note.create({
      data: { title, content, tag },
    });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "id must be an integer" });
    }

    const note = await prisma.note.findUnique({ where: { id } });
    if (!note) {
      return res.status(404).json({ error: "note not found" });
    }

    res.json(note);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "id must be an integer" });
    }

    const { title, content, tag } = req.body;

    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ error: "title is required" });
    }
    if (typeof content !== "string" || content.trim() === "") {
      return res.status(400).json({ error: "content is required" });
    }
    if (tag !== undefined && typeof tag !== "string") {
      return res.status(400).json({ error: "tag must be a string" });
    }

    const note = await prisma.note.update({
      where: { id },
      data: { title, content, tag },
    }).catch((err) => {
      if (err.code === "P2025") return null;
      throw err;
    });

    if (!note) {
      return res.status(404).json({ error: "note not found" });
    }

    res.json(note);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "id must be an integer" });
    }

    const note = await prisma.note.delete({ where: { id } }).catch((err) => {
      if (err.code === "P2025") return null;
      throw err;
    });

    if (!note) {
      return res.status(404).json({ error: "note not found" });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
