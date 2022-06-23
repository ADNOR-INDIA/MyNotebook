import React, {useContext} from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem.js";
import AddNote from "./AddNote";

const Notes = () =>{
    const context = useContext(noteContext);
    const{notes} = context; //destructuring done, jo context ke notes  the ab vo yha par a jayenge.
    return (
        <>
        <AddNote/>
        <div className="row my-4">
            <h2>Your Notes</h2>
            {notes.map((note)=>{
                return <Noteitem key={note._id} note={note}/>;
            })}
        </div>
        </>

    )
}

export default Notes;