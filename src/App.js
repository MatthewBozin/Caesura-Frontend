import './App.css';
import React, {useState, useEffect} from "react";
import Navbar from './components/Navbar';
import Create from './pages/Create.js';
import Landing from './pages/Landing.js';
import Login from './pages/Login';
import Signup from './pages/Signup';
import dataService from './dataService';

function App() {

  const [page, setPage] = useState("landing");

  const [user, setUser] = useState(null);

  useEffect(() => {
    dataService.checkLogin().then((res) => {
      console.log(res.data);
      if (res.message === 'Not logged in.') return;
      setUser(res.data)
    })
  }, [])

  const [poems, setPoems] = useState({
    all: [],
    choices: [],
    poem: {authors: [], lines: []}
  });

  return (
    <div>
        <Navbar setPage={setPage} user={user} setUser={setUser}/>
        {page === 'landing' && <Landing setPage={setPage}/>}
        {page === 'create' && <Create poems={poems} setPoems={setPoems}/>}
        {page === 'login' && <Login setUser={setUser} setPage={setPage}/>}
        {page === 'signup' && <Signup />}
    </div>
  );
}

export default App;
