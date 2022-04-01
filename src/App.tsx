import { useState } from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import './App.css';
import { Login } from './Login';
import { Profile } from './Profile';

function App() {
  const [ myBar, setMyBar ] = useState<Array<string>>([]);
  return (
    <div>
      <div className="h-20 bg-rose-500">
        <ul className="list-none">
          <li className="text-3xl float-left ml-16 mt-5"><Link to="/">The Cocktail Library</Link></li>
          <li className="text-xl float-right mr-20 mt-6"><Link to="/profile">My profile</Link></li>
        </ul>
      </div>
      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
      </Routes>
      <Outlet />
    </div>
  );
}

export default App;
