import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

const Alert = () => {
  const [alertObj, setAlertObj] = useState({});
  const context = useContext(NoteContext);
  const {alert} = context;

    setTimeout(() => {
      setAlertObj(alert);
  }, 500);

  return (
    alertObj.text && <div>
      <div className={`alert alert-${alertObj.type}`} role="alert">
        {alertObj.text}
      </div>
    </div>
  )
}

export default Alert