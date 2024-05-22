import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/alerts/AlertContext';

const Signup = () => {
  const context = useContext(AlertContext);
  const {setAlert} = context;

  const [creds, setCreds] = useState({name: "", email: "", password: "", cPassword: ""});
  let navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const {name, email, password, cPassword} = creds;
    if(password !== cPassword) {
      return setAlert({text: 'Passwords do not match.', type: "danger"});
    }
    const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name, email, password})
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    if(!json.error) {
        localStorage.setItem('token', json.authtoken);
        setAlert({text: "User created successfully", type: "success"});
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
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cPassword" name='cpassword' onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Sign up</button>
      </form>
    </div>
  )
}

export default Signup