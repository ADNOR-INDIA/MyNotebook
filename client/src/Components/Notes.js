import React, {useContext} from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem.js";
 
const Notes = () =>{
    const context = useContext(noteContext);
    const{notes, setNotes} = context; //destructuring done, jo context ke notes and setNotes the ab vo yha par a jayenge.
    return (
        <div className="row my-4">
            <h2>Your Notes</h2>
            {notes.map((notes)=>{
                return <Noteitem notes = {notes}/>;
            })}
        </div>

    )
}

export default Notes;