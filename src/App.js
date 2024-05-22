import './App.css';
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import AlertState from './context/alerts/AlertState';

function App() {
  return (
    <>
    <AlertState>
      <NoteState>
        <Router>
          <Navbar />
          <Alert />
          <div className='m-3'>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </AlertState>
    </>
  );
}

export default App;
