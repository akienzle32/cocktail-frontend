import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { Search } from './Search';
import { CocktailDetail } from './CocktailDetail';
import { Login } from './Login';
import { Profile } from './Profile';

export function Home(props: any){
    const [ myBar, setMyBar ] = useState<Array<string>>([]);
    const [ savedCocktails, setSavedCocktails ] = useState<Array<Number>>([]);
    const [ searchByName, setSearchByName ] = useState<boolean>(true);
    const [ token, setToken ] = useState<string>();
    const [ username, setUsername ] = useState<string>('');

    // These functions can probably be moved to SearchByIngredients component
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
                <Route path="profile" element={<Profile token={token} savedCocktails={savedCocktails} />}></Route>
                <Route path="login" element={props.loggedIn ? <Navigate replace to="/" /> : <Login setToken={setToken} setLoggedIn={props.setLoggedIn} setUsername={setUsername} />}></Route>
                <Route path=":cocktailId" element={<CocktailDetail loggedIn={props.loggedIn} username={username} token={token} savedCocktails={savedCocktails} setSavedCocktails={setSavedCocktails} />}></Route>
                <Route path="/" element={<Search username={username} token={token} loggedIn={props.loggedIn} myBar={myBar} searchByName={searchByName} setSearchByName={setSearchByName} addToMyBar={addToMyBar} setSavedCocktails={setSavedCocktails} removeFromMyBar={removeFromMyBar} />}></Route>
            </Routes>
        </div>
    );
}