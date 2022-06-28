import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState=(props)=>{
  const host="http://localhost:5000"
  const notesInitial = [
    // {
    //   "_id": "62146843ec30302647b747ef",
    //   "user": "6211d02a162015b3e6ca8111",
    //   "title": "metitle",
    //   "description": "do coding ",
    //   "tag": "personell",
    //   "date": "2022-02-22T04:36:19.705Z",
    //   "__v": 0
    // },
  ]
   const[notes, setNotes] = useState(notesInitial);

      //   get all Notes.
    const getNotes =async()=>{
      //  API calling.
      const response = await fetch(`${host}/api/notes/fetchnotes`, {
        method:'GET',
        headers:{
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token') 
        }
      });
      const json = await response.json()
      console.log(json)
      setNotes(json)

  }
    //   Add a Note.
    const addNote =async(title, description, tag)=>{
        //  API calling.
        const response = await fetch(`${host}/api/notes/addnotes`, {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            "auth-token":localStorage.getItem('token')
          },
          body:JSON.stringify({"title":title,"description":description, "tag":tag})
        });
        const note  =  await response.json();
        setNotes(notes.concat(note))

        // console.log("adding a note");
        // const note =  {
        //     "_id": "62146843e34c303027647b747ef",
        //     "user": "6211d02a162015b3e6ca8111",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2022-02-22T04:36:19.705Z",
        //     "__v": 0
        //   };
        // setNotes(notes.concat(note))
    }

    // Delete a Note.
    const deleteNote=async(id)=>{
      const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          "auth-token":localStorage.getItem('token')
        },
      });
      const json = response.json();
      console.log(json)

      console.log("deleting the note with id" +id);
      const newNotes = notes.filter((notes)=>{return notes._id!==id})
      setNotes(newNotes);
    }

    // Edit a Note.
    const editNote = async (id, title, description, tag)=>{
      // API call
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          "auth-token":localStorage.getItem('token')
        },
        body:JSON.stringify({title, description, tag})
      });
      const json = response.json();

      let newNotes = JSON.parse(JSON.stringify(notes))
      // Logic to edit in client.
      for(let index=0; index<newNotes.length; index++){
        const element = newNotes[index];
        if(element._id===id){
        element.description = description;
        element.title=title;
        element.tag = tag;
        break;
        }
        
      }
      setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;