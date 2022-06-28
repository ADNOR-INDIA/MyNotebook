import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';

const Login = ()=>{
    const[credentials, setCredentials] = useState({email:"", password:""})
    const navigate = useNavigate();
    const handleSubmit=async(e)=>{
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/login", {
          method:'POST',
          headers:{
            "Content-Type": "application/json",
            //"auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxMWQwMmExNjIwMTViM2U2Y2E4MTExIn0sImlhdCI6MTY0NTQxNzAyOX0.JDcK--oQZAlwtnqy-fow8GjHfweTVvHMlsyMDT7kTys"
          },
          body: JSON.stringify({email:credentials.email, password:credentials.password})
      });
      const json = await response.json();
      if(json.success){
          // save the auth token and redirect
          localStorage.setItem('token', json.authtoken);
          navigate("/");
      }
      else{
          alert("Invalid Credentials");
      }
      console.log(json);
  }
  const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]:e.target.value})
  } 

    return(
        <div>
            <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" value = {credentials.email}  id="email" onChange={onChange} aria-describedby="emailHelp" name="email" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" value ={credentials.password}  id="password " onChange={onChange} name="password" placeholder="Password"/>
  </div>
  
  <button type="submit" className="btn btn-primary my-3" >Submit</button>
</form>
        </div>
    )
}

export default Login; 