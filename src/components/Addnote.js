import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/NoteContext'

export default function Addnote() {
  const context = useContext(noteContext)
  const {addNote} = context
  
  const [note, setNote] = useState({title: "", description: "", tag: ""})

  const handleChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  }
  const handleClick = (e) => {
    e.preventDefault()
    addNote(note.title, note.description, note.tag)

  }

  return (
    <div>
        <h1>Add a Note</h1>
        <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea type="text" className="form-control" id="description" name="description" rows="3" onChange={handleChange}></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="tag" name="tag" />
            </div>
            <button type="submit" className="btn btn-dark mb-2" onClick={handleClick}>Add Note</button>
        </form>
    </div>
  )
}
