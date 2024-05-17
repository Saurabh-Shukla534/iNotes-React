import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import '../App.css';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const {deleteNote, editNote} = context;
    const {note} = props;

    const handleDelete = () => {
        deleteNote(note._id);
    }

    const handleEdit = () => {
        editNote(note);
    }

    return (
        <div className='col-md-3'>
            <div className="card my-3" style={{width: "18rem"}}>
                <div className="card-body">
                    <div className="d-flex align-items-baseline justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <div>
                            <i className="fa-solid fa-trash-can mx-2 fa-opacity-hover" role='button' onClick={handleDelete}></i>
                            <i className="fa-solid fa-pen-to-square mx-2 fa-opacity-hover" role='button' onClick={handleEdit}></i>
                        </div>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem