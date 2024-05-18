const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//Route 1: Fetching all notes using Get "/api/note/fetchallnotes".
router.get('/fetchAllNotes', fetchuser, async(req, res) => {

    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        res.status(500).send("Internal server error.") 
    }
})

//Route 2: Add note using Post "/api/note/addNote".
router.post('/addNote', fetchuser, [
    body('title', 'Please enter title. Character limit should be minimum 3.').isLength({min: 3}),
    body('description', 'Please enter description. Character length should be minimum 10.').isLength({min: 10}),
], async(req, res) => {
    // Returning errors, if any, alongwith bad request
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({errors: result.array()})
    }

    const {title, description, tag} = req.body;
    try {
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);      
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error.")
    }
})

//Route 3: Update note using Put "/api/note/updateNote".
router.put('/updateNote/:id', fetchuser, [
], async(req, res) => {
    try {
        const {title, description, tag} = req.body;
        // Create newNote object
        const newNote = {};
        if(title) newNote.title = title;
        if(description) newNote.description = description;
        if(tag) newNote.tag = tag;
        
        // Find the note to be updated.
        let note = await Note.findById(req.params.id);
        if(!note) {
            return res.status(404).send("Note not found");
        }

        // Check if user owns note.
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
    
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json({note});
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error.")
    }

})

//Route 4: Delete note using Delete "/api/note/deleteNote".
router.delete('/deleteNote/:id', fetchuser, [
], async(req, res) => {
    try {
         // Find the note to be deleted.
        let note = await Note.findById(req.params.id);
        if(!note) {
            return res.status(404).send("Note not found");
        }
        
        // Check if user owns note.
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
    
        note = await Note.findByIdAndDelete(req.params.id)
        res.status(200).send({message: 'Note Deleted'});
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error.")
    }

})

module.exports = router;