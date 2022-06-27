import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Signup from './Components/Signup';
import Login from './Components/Login';
// import Alert from './Components/Alert.js';
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
      {/* <Alert message="are you sure  you want to delete the note."/> */}
      <div className="container">
      <Routes>
      <Route exact path='/' element={<Home/>}/>
       <Route exact path='/about' element={<About/>}/>
       <Route exact path='/login' element={<Login/>}/>
       <Route exact path='/signup' element={<Signup/>}/>
      </Routes>
      </div>
      </div>
    </Router>
    </NoteState>
  );
}

export default App;
