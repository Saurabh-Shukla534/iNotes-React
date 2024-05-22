import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
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
            localStorage.setItem('token', json.authtoken);
            navigate("/");
        } else {
            alert(json.error);
        }
    }

    const onChange = (e) => {
        setCreds({...creds, [e.target.name]: e.target.value});
    }

    return (
        <div className='container mt-2'>
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