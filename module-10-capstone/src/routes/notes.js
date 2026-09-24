const express = require("express");
const prisma = require("../db");
const { validateNoteBody, validateIdParam } = require("../middleware/validate");
const { sendError } = require("../middleware/errorHandler");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const notes = await prisma.note.findMany({ orderBy: { createdAt: "desc" } });
    res.json(notes);
  } catch (err) {
    next(err);
  }
});

router.post("/", validateNoteBody, async (req, res, next) => {
  try {
    const { title, content, tag } = req.body;

    const note = await prisma.note.create({
      data: { title, content, tag },
    });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateIdParam, async (req, res, next) => {
  try {
    const note = await prisma.note.findUnique({ where: { id: req.noteId } });
    if (!note) {
      return sendError(res, 404, "note not found");
    }

    res.json(note);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateIdParam, validateNoteBody, async (req, res, next) => {
  try {
    const { title, content, tag } = req.body;

    const note = await prisma.note.update({
      where: { id: req.noteId },
      data: { title, content, tag },
    }).catch((err) => {
      if (err.code === "P2025") return null;
      throw err;
    });

    if (!note) {
      return sendError(res, 404, "note not found");
    }

    res.json(note);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", validateIdParam, async (req, res, next) => {
  try {
    const note = await prisma.note.delete({ where: { id: req.noteId } }).catch((err) => {
      if (err.code === "P2025") return null;
      throw err;
    });

    if (!note) {
      return sendError(res, 404, "note not found");
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
