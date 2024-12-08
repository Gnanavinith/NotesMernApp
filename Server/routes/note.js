import express from "express";
import Note from "../models/Note.js";
import setMiddleware from "../Middleware/middleware.js";

const router = express.Router();

// Add a new note
// router.post("/add", setMiddleware, async (req, res) => {
//   try {
//     const { title, description } = req.body;

//     if (!title || !description) {
//       return res.status(400).json({ success: false, message: "Title and description are required" });
//     }

//     const newNote = new Note({ title, description, userId: req.user.id });
//     await newNote.save();

//     return res
//       .status(200)
//       .json({ success: true, message: "Note created successfully", note: newNote });
//   } catch (error) {
//     console.error("Error creating note:", error);
//     return res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// });

router.post("/add", setMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Title and description are required" });
    }

    const newNote = new Note({ title, description, userId: req.user.id });
    await newNote.save();

    return res
      .status(200)
      .json({ success: true, message: "Note created successfully", note: newNote });
  } catch (error) {
    console.error("Error creating note:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


// Get all notes
router.get("/",setMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({userId:req.user.id});
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.body.title || !req.body.description) {
      return res.status(400).json({ success: false, message: "Title and description are required." });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title: req.body.title, description: req.body.description },
      { new: true } // This ensures the response contains the updated document
    );

    if (!updatedNote) {
      return res.status(404).json({ success: false, message: "Note not found." });
    }

    return res.status(200).json({ success: true, updatedNote });
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the note by ID
    const deletedNote = await Note.findByIdAndDelete(id);

    // If no note was found
    if (!deletedNote) {
      return res.status(404).json({ success: false, message: "Note not found." });
    }

    // Successful deletion response
    return res.status(200).json({ success: true, message: "Note deleted successfully.", deletedNote });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});



export default router;
