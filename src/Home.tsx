import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { Search } from './Search';
import { CocktailDetail } from './CocktailDetail';
import { Login } from './Login';
import { Profile } from './Profile';

export function Home(){
    const [ myBar, setMyBar ] = useState<Array<string>>([]);
    const [ searchByName, setSearchByName ] = useState<boolean>(true);

    function addToMyBar(ingredient: string){
        if (!myBar.includes(ingredient)){
          const newBar = myBar.concat(ingredient);
          setMyBar(newBar);  
        }
    }

    function removeFromMyBar(ingredientToRemove: string){
        const newBar = myBar.filter(ingredient => ingredient !== ingredientToRemove);
        setMyBar(newBar);
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <Routes>
                <Route path="profile" element={<Profile />}></Route>
                <Route path="login" element={<Login />}></Route>
                <Route path=":cocktailId" element={<CocktailDetail />}></Route>
                <Route path="/" element={<Search myBar={myBar} searchByName={searchByName} setSearchByName={setSearchByName} addToMyBar={addToMyBar} removeFromMyBar={removeFromMyBar} />}></Route>
            </Routes>
        </div>
    );
}