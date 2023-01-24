const express = require("express")
const router = express.Router();
const authenticate = require("../middleware/fetchuser")
const Notes = require("../models/Notes")
const { body, validationResult } = require('express-validator');



// ROUTE 1 : get all notes using GET: "api/auth/fetchallnotes".login required
try {
    router.get("/fetchallnotes", authenticate, async (req, res) => {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    })
} catch (error) {
    console.error(error.message)
    res.status(400).send('some error occured')
}

// ROUTE 2 : Add a new note using POST : "api/note/addnote". login required 
router.post("/addnote", authenticate, [
    body('title', "title must be at least 3 characters ").isLength({ min: 3 }),
    body('description', "Description must be at least 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    // if there are errors return bad request and the errors
    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        note.save()
        res.json(note)
    } catch (error) {
        console.error(error.message)
        res.status(400).send('some error occured')
    }
})


// ROUTE 3 : update an existing note using PUT request : "api/note/updatenote". login required 
router.put("/updatenote/:id", authenticate, async (req, res) => {
    try {
    const { title, description, tag } = req.body
    // create a new note object
    const newNote = {}
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    // find the note to be updated and update it
    const noteId = req.params.id
    let note = await Notes.findById(noteId)
    if (!note) { return res.status(404).send('not found') }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("note allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note })
} catch (error) {
    console.error(error.message)
    res.status(400).send('internal server error')
}
})




// ROUTE 4 : delete an existing note using DELETE request : "api/note/deletenote". login required 
router.delete(`/deletenote/:id`, authenticate, async (req, res) => {
    try {
        // find the note to be deleted and delete it
        const noteId = req.params.id
        let note = await Notes.findById(noteId)
        if (!note) { return res.status(404).send('not found') }
        // allow deletion only if user owns this note 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("note allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "success": "note has been deleted", note: note })
        // res.json({ note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('internal server error')
    }
})

module.exports = router