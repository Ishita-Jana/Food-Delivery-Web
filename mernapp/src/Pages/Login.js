import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Login = () => {

 
  const [credentials, setcredentials] = useState({email:"",password:""})

    let navigate = useNavigate()
  const handleSubmit= async(e)=>{
      e.preventDefault();
      const response = await fetch("http://localhost:4000/api/loginuser",{
          method: 'POST',
          headers:{
              'Content-Type': 'application/json'
          },
          body:JSON.stringify({ email:credentials.email, password:credentials.password })
          
      });

      const json =await response.json()
      // console.log(json)

      if(!json.success){
          alert("'Input correct credentials");
      }
      if(json.success){
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        console.log(localStorage.getItem("authToken"));
        console.log("success in creating token");
        navigate("/");
    }

  }

  const onChange=(e)=>{
      setcredentials({...credentials,[e.target.name]:e.target.value})
  }


  return (
    <>
    <Navbar/>
      <div className='container mt-3'>
            <form onSubmit={handleSubmit}>
             
              <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email}  onChange={onChange} />
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" name='password'  value={credentials.password} onChange={onChange}/>
              </div>
              
             
            
              <button type="submit" className="m-3 btn btn-danger">Submit</button>
              <Link to="/signup" className="m-3 btn btn-primary">Signup</Link>
          </form>
        </div> 
    </>
  )
}

export default Login
