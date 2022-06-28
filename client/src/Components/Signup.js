import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';

const Signup = ()=>{
    const [credentials, setCredentials] = useState({firstName:"", lastName:"", email:"", password:"", cpassword:""})
    let history = useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const {firstName, lastName, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method:'POST',
            headers:{
              "Content-Type": "application/json",
              //"auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxMWQwMmExNjIwMTViM2U2Y2E4MTExIn0sImlhdCI6MTY0NTQxNzAyOX0.JDcK--oQZAlwtnqy-fow8GjHfweTVvHMlsyMDT7kTys"
            },
            body: JSON.stringify({firstName, lastName, email, password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token', json.authtoken);
            history("/");
        }
        else{
            alert("invalid credentials");
        }
        
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    } 
    return(
        <div className="container">
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">First Name</label>
    <input type="text" className="form-control" id="fname" name="firstName" onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Last Name</label>
    <input type="text" className="form-control" id="lname" name="lastName" onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>     
        </div>
    )
}

export default Signup;