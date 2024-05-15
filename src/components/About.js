import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext';

const About = () => {
  const data = useContext(NoteContext);
  useEffect(() => {
    data.update();
  }, [])
  
  return (
    <div className='m-3'>This is about {data.state.name}, {data.state.age} from {data.state.place}</div>
  )
}

export default About