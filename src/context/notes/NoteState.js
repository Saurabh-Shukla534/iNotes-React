import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const s1 = {
        name: "Saurabh",
        age: 26,
        place: "Kanpur"
    }
    const [state, setState] = useState(s1);

    const update = () => {
        setTimeout(() => {
            setState({
                name: "Shubham",
                age: 30,
                place: "Noida"
            })
        }, 1000);
    }

    return (
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState