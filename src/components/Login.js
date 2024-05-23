import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/alerts/AlertContext';

const Login = () => {
    const context = useContext(AlertContext);
    const {setAlert} = context;

    const [creds, setCreds] = useState({email: "", password: ""});
    let navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email: creds.email, password: creds.password})
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        if(!json.error) {
            localStorage.setItem('token', json.authToken);
            setAlert({text: "Logged in successfully", type: "success"});
            navigate("/");
        } else {
            setAlert({text: json.error, type: "danger"});
        }
    }

    const onChange = (e) => {
        setCreds({...creds, [e.target.name]: e.target.value});
    }

    return (
        <div className='container mt-2'>
            <h2 className='mb-3'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login