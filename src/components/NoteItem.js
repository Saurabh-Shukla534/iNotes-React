import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    const {note} = props;

    const handleDelete = () => {
        deleteNote(note._id);
    }

    return (
        <div className='col-md-3'>
            <div className="card my-3" style={{width: "18rem"}}>
                <div className="card-body">
                    <div className="d-flex align-items-baseline justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <div>
                            <i className="fa-solid fa-trash-can mx-2" onClick={handleDelete}></i>
                            <i className="fa-solid fa-pen-to-square mx-2"></i>
                        </div>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem