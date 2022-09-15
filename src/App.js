import './App.css';
import React, {useState} from "react";
import Navbar from './components/Navbar';
import Create from './pages/Create.js';
import Landing from './pages/Landing.js';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {

  const [page, setPage] = useState("landing");

  const [user, setUser] = useState(null);

  const [poems, setPoems] = useState({
    all: [],
    choices: [],
    poem: []
  });

  return (
    <div>
        <Navbar setPage={setPage} />
        {page === 'landing' && <Landing setPage={setPage}/>}
        {page === 'create' && <Create poems={poems} setPoems={setPoems}/>}
        {page === 'login' && <Login />}
        {page === 'signup' && <Signup />}
    </div>
  );
}

export default App;
