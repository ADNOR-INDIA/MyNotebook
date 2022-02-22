const express = require("express");
const router = express.Router();
let fetchuser = require("../middleware/fetchuser.js");
let Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE_1:  Get user notes using: GET"/api/auth/getuser. login required.
router.get("/fetchnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

//ROUTE_2:  Add a new note using: POST"/api/auth/addnote.login required.
router.post("/addnotes",fetchuser,[
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "atleast 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try{
        const {title, description, tag} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
        const note = new Notes({
            title,
            description,
            tag,
            user:req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    }catch(error){
        console.log(error.message);
        res.status(500).send("some error occured");
    }
  }
);

//ROUTE_3:  update an existing note using: PUT"/api/auth/updatenote.  login required.
router.put("/updatenotes/:id", fetchuser, async(req, res)=>{
    try{
    const {title, description, tag} = req.body;
    // Create a newnote object
    const newNote = {};
    if(title){
        newNote.title = title
    };
    if(description){
        newNote.description=description
    };
    if(tag){
        newNote.tag=tag
    };

    // find a note to be updated and update it
    let note =await Notes.findById(req.params.id);
    if(!note){
        res.status(404).send("not found");
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("not allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
    res.send({note});
    }catch(error){
        console.log(error.message);
        res.status(500).send("some error occured");
    }
});

//ROUTE_4:  delete an existing note using: DELETE"/api/auth/updatenote.  login required.
router.delete("/deletenotes/:id", fetchuser, async(req, res)=>{
    try{
    // find a note to be deleted and delete it
    let note =await Notes.findById(req.params.id);
    if(!note){
        res.status(404).send("not found");
    }
    // allow deletion only if use owns this note.
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("not allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.send("Success:Note has been deleted");
    }catch(error){
        console.log(error.message);
        res.status(500).send("some error occured");
    }
});
module.exports = router;
