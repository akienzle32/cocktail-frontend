import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { Search } from './Search';
import { CocktailDetail } from './CocktailDetail';
import { Login } from './Login';
import { Profile } from './Profile';
import { Register } from './Register';

export function Home(props: any){
    const [ myBar, setMyBar ] = useState<Array<string>>([]);
    const [ savedCocktails, setSavedCocktails ] = useState<Array<number>>([]);
    const [ searchByName, setSearchByName ] = useState<boolean>(true);
    const [ token, setToken ] = useState<string>();
    const [ username, setUsername ] = useState<string>();

    // These functions can probably be moved to SearchByIngredients component

    return (
        <div className="flex flex-col items-center justify-center">
            <Routes>
                <Route path="profile" element={!props.loggedIn ? <Navigate replace to="/" /> : <Profile username={username} setUsername={setUsername} token={token} setToken={setToken} setLoggedIn={props.setLoggedIn} savedCocktails={savedCocktails} myBar={myBar} setMyBar={setMyBar} />}></Route>
                <Route path="login" element={props.loggedIn ? <Navigate replace to="/" /> : <Login setToken={setToken} setLoggedIn={props.setLoggedIn} setUsername={setUsername} />}></Route>
                <Route path="register" element={<Register />} />
                <Route path=":cocktailId" element={<CocktailDetail loggedIn={props.loggedIn} username={username} token={token} savedCocktails={savedCocktails} setSavedCocktails={setSavedCocktails} />}></Route>
                <Route path="/" element={<Search username={username} token={token} loggedIn={props.loggedIn} myBar={myBar} searchByName={searchByName} setMyBar={setMyBar} setSearchByName={setSearchByName} setSavedCocktails={setSavedCocktails} />}></Route>
            </Routes>
        </div>
    );
}