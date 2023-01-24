import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import noteContext from '../context/notes/noteContext'


function Noteitem(props) {
    const { note , updateNote} = props
    const context = useContext(noteContext)
    const {deleteNote} = context
    return (
        <div className='col-md-3'>
            <div class="card my-3" >
                <div class="card-body">
                    <h5 class="card-title">{note.title}</h5>
                    <p class="card-text">{note.description}</p>
                    <Link to="#" class="btn btn-primary">Go somewhere</Link>
                    <div className='mt-3'>
                    <i class="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted successfully","success")}}></i>
                    <i class="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
