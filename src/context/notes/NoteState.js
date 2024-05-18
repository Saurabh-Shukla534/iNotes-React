import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const initialNotes = [];

    const [notes, setNotes] = useState(initialNotes);
    // set alert text
    const [alert, setAlert] = useState({text: "", type: "secondary"});

    const getNotes = async() => {
        const response = await fetch(`${host}/api/note/fetchAllNotes`, {
            method: "GET",
            headers: {
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0MGQ5NGY2ZWJlODkxMDBlNzY4NDZiIn0sImlhdCI6MTcxNTY3MzE0OH0.bg8PrKx5UKSYa91WwHXgpUMZgtoOJBhQqIcMGkxGE1s"
            }
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
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
        if(!json.errors) {
            // setNotes(notes.concat(note));
            getNotes();
            setAlert({text: 'Note added successfully.', type: "success"});
        } else {
            setAlert({text: json.errors[0].msg, type: "danger"});
        }
    }

    const deleteNote = async(id) => {
        const response = await fetch(`${host}/api/note/deleteNote/${id}`, {
            method: "DELETE",
            headers: {
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0MGQ5NGY2ZWJlODkxMDBlNzY4NDZiIn0sImlhdCI6MTcxNTY3MzE0OH0.bg8PrKx5UKSYa91WwHXgpUMZgtoOJBhQqIcMGkxGE1s"
            }
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);
        if(!json.errors) {
            const newNotes = notes.filter((note) => note._id !== id);
            setNotes(newNotes);
            setAlert({text: 'Note deleted successfully.', type: "success"});
        } else {
            setAlert({text: json.errors[0].msg, type: "danger"});
        }

    }

    const editNote = async(note) => {
        const currentNote = notes.find((ele) => ele._id === note.id);
        console.log(currentNote);
        if(currentNote) {
            currentNote.title = note.title;
            currentNote.description = note.description;
            currentNote.tag = note.tag;
        }
        const response = await fetch(`${host}/api/note/updateNote/${currentNote._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0MGQ5NGY2ZWJlODkxMDBlNzY4NDZiIn0sImlhdCI6MTcxNTY3MzE0OH0.bg8PrKx5UKSYa91WwHXgpUMZgtoOJBhQqIcMGkxGE1s"
            },
            body: JSON.stringify({title: currentNote.title, description: currentNote.description, tag: currentNote.tag})
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        if(!json.errors) {
            getNotes();
            setAlert({text: 'Note updated successfully.', type: "success"});
        } else {
            setAlert({text: json.errors[0].msg, type: "danger"});
        }

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
        <NoteContext.Provider value={{notes, setNotes, getNotes, addNote, deleteNote, editNote, alert}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState