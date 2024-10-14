const express = require('express');
const User = require('../models/User');
const Notes = require('../models/Notes');
const router = express.Router();
const { body, validationResult } = require('express-validator'); //validate user creation fields

//middlewares
const getUser = require('../middlewares/getUser');

//GET ALL NOTES for a SPECIFIC USER. Login required. /api/notes/get-notes
router.get('/get-notes', getUser, async (req, res) => {
    try {
        const notes = await Notes.find({user: req.user.id})
        res.status(200).send(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ADD NOTES for a SPECIFIC USER. Login required. /api/notes/add-notes
router.post('/add-notes', getUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async(req, res) => {
    
    //check for bad request errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //add new note
    try {
        const note = await Notes.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
        })
        res.send(note)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//UPDATE EXISTING NOTE. login required. /api/notes/update-note
router.put('/update-note/:id', getUser, async (req, res) => {
    try {
        // Create a newNote object
        const newNote = {};
        if (req.body.title) { newNote.title = req.body.title };
        if (req.body.description) { newNote.description = req.body.description };
        if (req.body.tag) { newNote.tag = req.body.tag };

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Authorised");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//DELETE EXISTING NOTE. login required. /api/notes/delete-note
router.delete('/delete-note/:id', getUser, async(req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Authorised");
        }

        await Notes.findByIdAndDelete(req.params.id)
        res.send('Note deleted successfully')
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Success": "Internal Server Error", note: note});
    }
    
})

module.exports = router