import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login(props) {
    const [credentials,setCredentials] = useState({email:"",password:""})
    let navigate = useNavigate()
    
    const handleSubmit = async(e)=>{
        try{
        e.preventDefault()
        const response = await fetch("http://127.0.0.1:5000/api/auth/login",{
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body : JSON.stringify({email: credentials.email,password: credentials.password})
        })
        const json = await response.json()
        console.log(json)
        if(json.success){
            //save the authtoken and redirect
            localStorage.setItem("token",json.authToken)
            console.log(localStorage)
            props.showAlert("logged in successfully ", "success")
            navigate("/")
        }
        else{
            alert("invalid credentials")
            props.showAlert("invalid credentials","danger")
        }
    }catch(error){
      console.log(error)
    }
    }

    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <div className='container'>
            <h2 className='mb-3 mt-3'>Login to continue to iNoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" value={credentials.email} onChange={onChange} name='email' id="email" aria-describedby="emailHelp"/>
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" name='password' value={credentials.password} onChange={onChange} class="form-control" id="password"/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
