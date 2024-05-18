import React, { useContext, useEffect, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

const Alert = () => {
  const [alertObj, setAlertObj] = useState({});
  const context = useContext(NoteContext);
  const { alert } = context;

  useEffect(() => {
    setAlertObj(alert);
  }, [alert])
  
  
  setTimeout(() => {
    setAlertObj({});
  }, 3000);

  return (
    <div style={{height: '50px'}}>
      {alertObj.text && <div className={`alert alert-${alertObj.type} alert-dismissible fade show`} role="alert">
        {alertObj.text}
      </div>}
    </div>
  )
}

export default Alert