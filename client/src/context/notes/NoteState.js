import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
    const notesInitial = [
          {
            "_id": "6211346843ec30302647b747ef",
            "user": "6211d02a162015b3e6ca8111",
            "title": "metitle",
            "description": "do coding af",
            "tag": "personell",
            "date": "2022-02-22T04:36:19.705Z",
            "__v": 0
          },
      ]
      const[notes, setNotes] = useState(notesInitial);

    //   Add a Note.
    const addNote =(title, description, tag)=>{
        // TODO : API calling.
        console.log("adding a note");
        const note =  {
            "_id": "62146843e34c303027647b747ef",
            "user": "6211d02a162015b3e6ca8111",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-02-22T04:36:19.705Z",
            "__v": 0
          };
        setNotes(notes.concat(note))
    }

    // Delete a Note.
    const deleteNote=()=>{

    }

    // Edit a Note.
    const editNote = ()=>{

    }
    return (
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;