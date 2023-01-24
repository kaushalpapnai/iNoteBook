import { useState } from "react";
import noteContext from "./noteContext";


const  Notestate = (props) =>{
    const host = "http://127.0.0.1:5000"
    const notesInitial = []

   const [notes,setNotes] = useState(notesInitial)

   //   Get note 
   const getNotes = async()=>{
    //API call
        const  response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                Authorization : "bearer " + localStorage.getItem("token")
            },
        })

    const json = await response.json()
    setNotes(json)

  }

//    Add note 
      const addNote = async(title,description,tag)=>{
        //API call
            const  response = await fetch(`${host}/api/notes/addnote`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({title,description,tag})
            }) 
           const note = await response.json()
           setNotes(notes.concat(note))
      }

//    delete note
     const deleteNote = async (id)=>{

        // API Call 
        const  response = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + localStorage.getItem("token")
            },
        })
        const json = response.json()
        console.log(json)

        console.log("Deleting note with id "+id)
        const newNote = notes.filter((note)=>{return note._id!==id})
        setNotes(newNote)
     }

//    Edit note 
    const editNote = async(id,title,description,tag) =>{
       
        const  response = await fetch(`${host}/api/notes/updatenote/${id}`,{
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({title,description,tag})
        })
        const json = await response.json()
        console.log(json)

        for (let index = 0; index < notes.length; index++)
        {
            const element = notes[index]
            if(element._id === id){
                element.title = title;
                element.description = description;
                element.tag = tag;
            }

        }
    }
        
            return (
                <noteContext.Provider value={{notes,addNote,deleteNote,getNotes,editNote}}>
                    {props.children}
                </noteContext.Provider>
            )
    }



export default Notestate