import React, { useContext ,useState} from 'react'
import noteContext from '../context/notes/noteContext'


const AddNote = (props) => {

 const context = useContext(noteContext)
 const { addNote } = context
 const [note , setNote] = useState({title: "",description: "",tag: ""})

 
 const handleClick = ()=>{
   addNote(note.title,note.description,note.tag)
   setNote({title: "",description: "",tag: ""})
   props.showAlert("Added successfully","success")
 }

 const onChange = (e)=>{
   setNote ({...note,[e.target.name]:e.target.value})
 }
  return (
    <div>
       <form className='my-3'>
                <div class="mb-3">
                    <label htmlFor="title" class="form-label">title</label>
                    <input type="text" class="form-control" id="title" value={note.title}name='title' onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div class="mb-3">
                    <label htmlFor="description" class="form-label">Description</label>
                    <input type="text" class="form-control" value={note.description}onChange={onChange} id="description" name='description'/>
                </div>
                <div class="mb-3">
                    <label htmlFor="tag" class="form-label">tag</label>
                    <input type="text" class="form-control" value={note.tag}onChange={onChange} id="tag" name='tag'/>
                </div>
                
                <button disabled={note.title.length<5 || note.description.length<5}  type="submit" class="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
    </div>
  )
}

export default AddNote
