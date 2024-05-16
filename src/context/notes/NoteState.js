import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const initialNotes = [
        {
            "_id": "66431b39ccd06fc417efb420",
            "user": "6640d94f6ebe89100e76846b",
            "title": "Title 1",
            "description": "Description 1",
            "tag": "Tag 1",
            "date": "2024-05-14T08:05:13.340Z",
            "__v": 0
        },
        {
            "_id": "66435696ccd06fc417efb423",
            "user": "6640d94f6ebe89100e76846b",
            "title": "Title 2",
            "description": "Description 2",
            "tag": "Tag 2",
            "date": "2024-05-14T12:18:30.885Z",
            "__v": 0
        },
        {
            "_id": "66436a6941ca512d5c7b0653",
            "user": "6640d94f6ebe89100e76846b",
            "title": "Title 3",
            "description": "Description 3",
            "tag": "Tag 3",
            "date": "2024-05-14T13:43:05.479Z",
            "__v": 0
        }
    ];

    const [notes, setNotes] = useState(initialNotes);

    const addNote = (note) => {
        console.log(note);
        setNotes(notes.concat(note));
    }
      
    return (
        <NoteContext.Provider value={{notes, setNotes, addNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState