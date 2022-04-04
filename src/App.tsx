import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Home } from './Home';
import './App.css';

function App() {
  const [ loggedIn, setLoggedIn ] = useState(true);

  function displayLink(){
    if (loggedIn)
      return <Link to="/login">Login</Link>
    else
      return <Link to="/profile">My profile</Link>
  }

  const rightLink = displayLink();

  return (
    <div>
      <div className="h-20 bg-cadetblue text-white">
        <ul className="list-none">
          <li className="text-3xl float-left ml-16 mt-5"><Link to="/">The Cocktail Library</Link></li>
          <li className="text-xl float-right mr-20 mt-6">{rightLink}</li>
        </ul>
      </div>
      <Home />
      <Outlet />
    </div>
  );
}

export default App;
