import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { Search } from './Search';
import { Login } from './Login';
import { Profile } from './Profile';

export function Home(){
    const location = useLocation();
    const path = location.pathname;
    const [ myBar, setMyBar ] = useState<Array<string>>([]);

    function updateMyBar(ingredient: string){
        if (!myBar.includes(ingredient)){
          const newBar = myBar.concat(ingredient);
          setMyBar(newBar);  
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <Routes>
                <Route path="profile" element={<Profile />}></Route>
                <Route path="login" element={<Login />}></Route>
                <Route path="/" element={<Search myBar={myBar} updateMyBar={updateMyBar} />}></Route>
            </Routes>
        </div>
    );
}