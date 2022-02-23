import './App.css';
import Home from './Components/Home.js'
import Navbar from './Components/Navbar.js'
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link
}from "react-router-dom";
function App() {
  return (
    <div className="App">
     <h1>MyNotebook</h1>
     <Navbar/>
     <Home/>
     
    </div>
  );
}

export default App;
