import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import About from './Components/About';
import{
  BrowserRouter as Router,
  Routes,
  Route
}from "react-router-dom"; 
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <NoteState>
    <Router>
      <div >
      <Navbar/>
      <div className="container">
      <Routes>
      <Route exact path='/' element={<Home/>}/>
       <Route exact path='/about' element={<About/>}/>
      </Routes>
      </div>
      </div>
    </Router>
    </NoteState>
  );
}

export default App;
