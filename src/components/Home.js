import React from 'react'
import Notes from './Notes';
import AddNote from './AddNote';

export const Home = () => {

  return (
    <div>
      <div className='container mt-2'>
        <AddNote />
      </div>
      <div className="container mt-3">
        <Notes />
      </div>
    </div>
  )
}
