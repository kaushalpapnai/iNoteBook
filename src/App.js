import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Navbar  from "./components/Navbar";
import  Home  from "./components/Home";
import  About  from "./components/About";
import Notestate from './context/notes/Notestate';
import Alert from './components/Alert';
import Login from "./components/Login"
import Signup from "./components/Signup"
import { useState } from "react";


function App() {

  const [alert,setAlert] = useState(null)

  let showAlert = (massege,type)=>{
    setAlert({
      massege : massege,
      type : type  
    })
    setTimeout(()=>{
      setAlert(null)
    }, 1500 );
}


  return (
    <Notestate>
      <BrowserRouter>
      <Navbar />
      <Alert alert={alert} /> 
        <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
        </Routes>

      </BrowserRouter>
    </Notestate>
  );
}

export default App;
