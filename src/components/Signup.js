import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'


function Signup(props) {

  const [credentials,setCredentials] = useState({name:"" , email:"",password:"",cpassword:""})
  
  let navigate = useNavigate()

  const handleSubmit = async(e)=>{
    try{
    e.preventDefault()
    const {name,email,password,cpassword} = credentials
    if(password !== cpassword){
      alert ("please match passwords")
    }
    else{
      const response = await fetch("http://127.0.0.1:5000/api/auth/createuser",{
          method: "POST",
          headers: {
              "content-type" : "application/json"
          },
          body : JSON.stringify({name,email,password})
      })
      const json = await response.json()
      console.log(json)

      if(json.success){
          //save the authtoken and redirect
            console.log(cpassword)
            localStorage.setItem("token",json.authToken)
            navigate("/")
            props.showAlert("account created successfully", "success")
  
      }
      else{
        props.showAlert("invalid details", "danger")
      }
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
      <h2 className='mb-3 mt-3'>Create an account to use iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name="name" onChange={onChange} id="name"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name='password' className="form-control" onChange={onChange}  minLength={5} required id="password"/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="cpassword" name='cpassword' className="form-control" onChange={onChange}  minLength={5} required id="cpassword"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
