import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { Search } from './Search';
import { CocktailDetail } from './CocktailDetail';
import { Login } from './Login';
import { Profile } from './Profile';

export function Home(props: any){
    const [ myBar, setMyBar ] = useState<Array<string>>([]);
    const [ savedCocktails, setSavedCocktails ] = useState<Array<string>>([]);
    const [ searchByName, setSearchByName ] = useState<boolean>(true);
    const [ token, setToken ] = useState<string>();
    const [ username, setUsername ] = useState<string>();

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

    function toggleSavedCocktail(cocktailId: string){
        const oldSavedCocktails: Array<string> = savedCocktails;
        let newSavedCocktails;
        if (oldSavedCocktails.includes(cocktailId))
            newSavedCocktails = oldSavedCocktails.filter(id => id !== cocktailId);
        else
            newSavedCocktails = oldSavedCocktails.concat(cocktailId);
        setSavedCocktails(newSavedCocktails);
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <Routes>
                <Route path="profile" element={<Profile />}></Route>
                <Route path="login" element={<Login setToken={setToken} setLoggedIn={props.setLoggedIn} setUsername={setUsername} />}></Route>
                <Route path=":cocktailId" element={<CocktailDetail toggleSavedCocktail={toggleSavedCocktail} savedCocktails={savedCocktails} />}></Route>
                <Route path="/" element={<Search myBar={myBar} searchByName={searchByName} setSearchByName={setSearchByName} addToMyBar={addToMyBar} removeFromMyBar={removeFromMyBar} />}></Route>
            </Routes>
        </div>
    );
}