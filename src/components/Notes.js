import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const context = useContext(NoteContext);
    const {notes, getNotes} = context;
    let navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')) {
            getNotes();
        } else {
            console.log(notes);
            navigate("/login");
        }
    //   eslint-disable-next-line
    }, [])
    
  
    return (
        <div className='row'>
            <h1>Your added note</h1>
            <div>{notes.length === 0 ? "Please add notes to preview." : ""}</div>
            {notes.map((note) => {
                return <NoteItem note={note} key={note._id}/>
            })}
        </div>
    )
}

export default Notes