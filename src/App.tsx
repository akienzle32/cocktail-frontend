import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <div className="h-20 bg-rose-500">
        <ul className="list-none">
          <li className="text-3xl float-left ml-16 mt-5">The Cocktail Library</li>
          <li className="text-xl float-right mr-20 mt-6">My profile</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
