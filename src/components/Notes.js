import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(NoteContext);
    const {notes, getNotes} = context;
    useEffect(() => {
      getNotes();
    //   eslint-disable-next-line
    }, [])
    
  
    return (
        <div className='row'>
            <h1>Your added note</h1>
            {notes.map((note) => {
                return <NoteItem note={note} key={note._id}/>
            })}
        </div>
    )
}

export default Notes