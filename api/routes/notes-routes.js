import express from "express";
import Note from "../models/Note.js";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log({ user: req.user });
    const userId = req.user.id;

    const newNote = await Note.create({
      title,
      content,
      userId,
    });

    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the note." });
  }
});

router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log({ userId });

    const notes = await Note.findAll({ where: { userId } });

    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the notes." });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const note = await Note.findOne({ where: { id, userId } });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the note." });
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, content } = req.body;

    const note = await Note.findOne({ where: { id, userId } });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    note.title = title;
    note.content = content;

    await note.save();

    res.status(200).json(note);
  } catch (error) {
    console.error("Error updating note:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the note." });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const note = await Note.findOne({ where: { id, userId } });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    await note.destroy();

    res.status(204).json();
  } catch (error) {
    console.error("Error deleting note:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the note." });
  }
});

export default router;
