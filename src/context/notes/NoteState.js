import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const initialNotes = [];

    const [notes, setNotes] = useState(initialNotes);

    const getNotes = async() => {
        const response = await fetch(`${host}/api/note/fetchAllNotes`, {
            method: "GET",
            headers: {
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0MGQ5NGY2ZWJlODkxMDBlNzY4NDZiIn0sImlhdCI6MTcxNTY3MzE0OH0.bg8PrKx5UKSYa91WwHXgpUMZgtoOJBhQqIcMGkxGE1s"
            }
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);
        setNotes(json);
    }

    const addNote = async(note) => {
        const response = await fetch(`${host}/api/note/addNote`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0MGQ5NGY2ZWJlODkxMDBlNzY4NDZiIn0sImlhdCI6MTcxNTY3MzE0OH0.bg8PrKx5UKSYa91WwHXgpUMZgtoOJBhQqIcMGkxGE1s"
            },
            body: JSON.stringify({title: note.title, description: note.description, tag: note.tag})
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);

        setNotes(notes.concat(note));
    }

    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
    }

    const editNote = async(note) => {
        const response = await fetch(`${host}/api/note/updateNote/${note._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0MGQ5NGY2ZWJlODkxMDBlNzY4NDZiIn0sImlhdCI6MTcxNTY3MzE0OH0.bg8PrKx5UKSYa91WwHXgpUMZgtoOJBhQqIcMGkxGE1s"
            },
            body: JSON.stringify({title: note.title, description: note.description, tag: note.tag})
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if(element._id === note._id) {
                element.title = note.title;
                element.description = note.description;
                element.tag = note.tag;
            }
        }
    }
      
    return (
        <NoteContext.Provider value={{notes, setNotes, getNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState