import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note);
        setNote({title: "", description: "", tag: ""});
    }

    return (
        <>
            <h1>Add your note</h1>
            <form className='my-2'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={note.title} autoComplete='off'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description} autoComplete='off'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} autoComplete='off'/>
                </div>
                <button disabled={note.title.length <= 3 || note.description.length <= 10} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </>
    )
}

export default AddNote