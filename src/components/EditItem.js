import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

const EditItem = (props) => {
    const ref = useRef(null);
    const {setEditItem, note} = props;
    const context = useContext(NoteContext);
    const {editNote} = context;
    const [noteItem, setNoteItem] = useState({title: "", description: "", tag: "", id: ""});

    useEffect(() => {
        ref.current.click();
        setNoteItem({title: note.title, description: note.description, tag: note.tag, id: note._id})
        // eslint-disable-next-line
    }, [])
    

    const onChange = (e) => {
        setNoteItem({...noteItem, [e.target.name]: e.target.value});
        // console.log(noteItem)
    }
    
    const updateClick = () => {
        editNote(noteItem);
        setEditItem(false);
    }
    const closeModal = () => {
        setEditItem(false);
    }

    return (
        <>
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-2'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={noteItem.title}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={noteItem.description}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={noteItem.tag}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditItem