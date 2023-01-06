import './App.css';
import { useState } from 'react';
import Navbar from './Components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from './Components/Home';
import About from './Components/About';
import Notestate from './contexts/notes/Notestate';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Alert from './Components/Alert';

function App() {
  const [alert, setalert] = useState(null)
  const alertt=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setalert(null)
    }, 1500);

  }
  return (
    <>
      <Notestate>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home alertt={alertt} />}></Route>
            <Route exact path="/Home" element={<Home alertt={alertt}/>}></Route>
            <Route exact path="/About" element={<About />}></Route>
            <Route exact path="/Login" element={<Login alertt={alertt}/>}></Route>
            <Route exact path="/SignUp" element={<SignUp alertt={alertt}/>}></Route>
          </Routes>
          </div>
        </Router>
      </Notestate>
    </>
  );
}

export default App;
