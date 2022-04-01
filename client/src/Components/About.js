import React,{ useContext, useEffect } from "react";
import NoteContext from "../context/notes/noteContext";

const About=()=>{
    const a = useContext(NoteContext)
    useEffect(()=>{ 
        a.update();
        // eslint-dsiable-next-lines
    }, [])
    return(
        <div>
            this is about {a.state.name}.
        </div>
    )
}

export default About;