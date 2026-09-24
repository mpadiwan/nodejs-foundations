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

module.exports = router;
