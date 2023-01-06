const express = require('express')
const route = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');
const { findOne } = require('../models/Notes');


// Route 1 we will get the notes from the database with the help of login details and with GET method (Login required)
// localhost:5000/api/notes/allnotes

route.get("/allnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        // we will fetch the notes from req.user and we are using fetchuser so we have the id of the user hence we will use
        // the req.user.id to get the notes from database with the  help of find method
        res.json( notes)
    } catch (error) {
        console.error(error.message);
        res.status(402).send("Internal Error occured")

    }

})

// Route 2 in this route we have to save the notes to the database with the help of destructuting and with the POST method..
// Login will required to save notes 
// localhost:5000/api/notes/addnotes

route.post("/addnote", fetchuser, [
    body('title', "Title is required").isLength({ min: 3 }),
    body('description', "description must be 5 letters long").isLength({ min: 5 })

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, tag } = req.body;
        //    with the help of destructiong we will get the title,description and tag from the req.body.
        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        })
        const savenote = await note.save()
        res.json(savenote)
    }
    catch (error) {
        console.error(error.message);
        res.status(402).send("Internal Error occured")
    }
});
// Route 3 in this route we are going to update the note with the help of id.
// and for updation we use PUT method.
// Login requried and also validation required that the user is upadation only his notes not other

route.put('/update/:id', fetchuser,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const newnote = {};
            // we are setting the updated title/descripiton/tag in the new note object 
            // like if title is available then store it in newnote.title
            if (title) { newnote.title = title }
            if (description) { newnote.description = description }
            if (tag) { newnote.tag = tag }

            // Find the note first then update the note
            let note = await Notes.findById(req.params.id);
            if (!note) { return res.status(404).send('Note not found') };

            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not allowed")
            }

            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
            // with the help of $set which is a mongodb method it replaces the current value in database with the new one
            res.json( note )

        } catch (error) {
            console.error(error.message);
            res.status(402).send("Internal Error occured")
        }

    });

// Route 3 in this route we are going to DELETE the note with the help of id.
// and for updation we use DELETE method.
// Login requried and also validation required that the user is DELETING only his notes not others

route.delete('/delete/:id', fetchuser,
    async (req, res) => {
        try {
            // Find the note first then update the note
            let note = await Notes.findById(req.params.id);
            if (!note) { return res.status(404).send('Note not found') };

            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not allowed")
            }

            note = await Notes.findByIdAndDelete(req.params.id)
            // with the help of findByIdAndDelete we will delete the existing note from the database
            res.json({Sucess:"Note has been deleted sucessfully", note:note})

        } catch (error) {
            console.error(error.message);
            res.status(402).send("Internal Error occured")
        }

    });
module.exports = route