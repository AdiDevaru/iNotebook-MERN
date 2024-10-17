import React, {useState} from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {
    const host = "http://localhost:5000"

    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes)

    const getNote = async () => {
      //API CALL
      const response = await fetch(`${host}/api/notes/get-notes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwNDE1MWUzYWZlMmNjMTM2YWU4OTNkIn0sImlhdCI6MTcyOTE1OTc5M30.-sLIt6Fu7SqwLTQxyC4tUZD9AjJljgtjWvwFf_ZD5hc",
        }
      });
      const json = await response.json()
      setNotes(json)
    }

    const addNote = async (title, description, tag) => {
      //API CALL
      const response = await fetch(`${host}/api/notes/add-notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwNDE1MWUzYWZlMmNjMTM2YWU4OTNkIn0sImlhdCI6MTcyOTE1OTc5M30.-sLIt6Fu7SqwLTQxyC4tUZD9AjJljgtjWvwFf_ZD5hc",
        },
        body: JSON.stringify({title, description, tag}),
      });
      // const json = response.json()

      const note = {
        "_id": "670e26c0cbcac24aa76528bc",
        "user": "6704151e3afe2cc136ae893d",
        "title": title,
        "description": description,
        "tag": tag,
        "createdAt": "2024-10-15T08:24:32.150Z",
        "updatedAt": "2024-10-15T08:24:32.150Z",
        "__v": 0
      }
      setNotes(notes.concat(note))
    }

    const deleteNote = async (id) => {
      //API CALL
      const response = await fetch(`${host}/api/notes/delete-note/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwNDE1MWUzYWZlMmNjMTM2YWU4OTNkIn0sImlhdCI6MTcyOTE2MTczM30.vswq5cihfjXZndKu519J1CXW8XHvCgLT2yP7OeS4t2o",
        }
      });
      // const json = response.json()

      const newNotes = notes.filter((note)=>{return note._id !== id})
      setNotes(newNotes)
    }

    const editNote = async (id, title, description, tag) => {
      //API CALL
      const response = await fetch(`${host}/api/notes/update-note/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcwNDE1MWUzYWZlMmNjMTM2YWU4OTNkIn0sImlhdCI6MTcyOTE1OTc5M30.-sLIt6Fu7SqwLTQxyC4tUZD9AjJljgtjWvwFf_ZD5hc",
        },
        body: JSON.stringify({title, description, tag}),
      });
      const json = response.json()

      for (let index = 0; index < notes.length; index++) {
        const note = notes[index];
        if (note._id === id) {
          note.title = title
          note.description = description
          note.tag = tag
        }
        
      }
    }

    return (
        <NoteContext.Provider value={{notes, getNote, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;