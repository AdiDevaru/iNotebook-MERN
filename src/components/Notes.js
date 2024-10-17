import React, {useContext, useEffect} from 'react'
import noteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem'
import Addnote from './Addnote'

export default function Notes() {

  const context = useContext(noteContext)
  const {notes, getNote} = context
  
  useEffect(() => {
    getNote()
    // eslint-disable-next-line
  }, [])

  return (
    <>
    <Addnote />
    <div className='row my-3'>
        <h2>Your notes</h2>
        {notes.map((note) => {
            return <Noteitem key={note._id} note={note}/>
        })}
    </div>
    </>
  )
}
