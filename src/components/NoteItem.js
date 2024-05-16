import React from 'react'

const NoteItem = (props) => {
    const {note} = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3" style={{width: "18rem"}}>
                <div className="card-body">
                    <div className="d-flex align-items-baseline justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <div>
                            <i className="fa-solid fa-trash-can mx-2"></i>
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