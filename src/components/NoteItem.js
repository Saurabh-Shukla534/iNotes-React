import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import '../App.css';
import EditItem from './EditItem';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    const {note} = props;
    const [editItem, setEditItem] = useState(false);

    const handleDelete = () => {
        deleteNote(note._id);
    }

    const handleEdit = () => {
        setEditItem(true);
    }

    return (
        <div className='col-md-3'>
            <div className="card my-3" style={{width: "18rem"}}>
                <div className="card-body">
                    <div className="d-flex align-items-baseline justify-content-between">
                        <div className='d-flex'>
                            <h5 className="card-title">{note.title}</h5>
                            <pre> ({note.tag})</pre>
                        </div>
                        <div>
                            <i className="fa-solid fa-trash-can mx-2 fa-opacity-hover" role='button' onClick={handleDelete}></i>
                            <i className="fa-solid fa-pen-to-square mx-2 fa-opacity-hover" role='button' onClick={handleEdit}></i>
                            {editItem &&<EditItem setEditItem={setEditItem} note={note}/>}
                        </div>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem