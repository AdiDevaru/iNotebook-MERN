import React, {useContext} from 'react'
import noteContext from '../context/notes/NoteContext'

export default function Noteitem(props) {
  const context = useContext(noteContext)
  const {note} = props;
  const {deleteNote} = context

  return (
    <div className='col-md-3'>
      <div className="card text-bg-secondary my-3">
        <div className="card-body">
            <div className="d-flex align-items-center">
                <h5 className="card-title">{note.title}</h5>
                <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                <i className="fa-regular fa-pen-to-square mx-2"></i>
            </div>
            <p className="card-text">{note.description} - {note.tag}</p>
        </div>
      </div>
    </div>
  )
}
