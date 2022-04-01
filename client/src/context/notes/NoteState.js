import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
    const notesInitial = [
        {
          "_id": "62146843ec30302647b747ef",
          "user": "6211d02a162015b3e6ca8111",
          "title": "metitle",
          "description": "do coding af",
          "tag": "personell",
          "date": "2022-02-22T04:36:19.705Z",
          "__v": 0
        }
      ]
      const[notes, setNotes] = useState(notesInitial);
    return (
        <NoteContext.Provider value = {{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;