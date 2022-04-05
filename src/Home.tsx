import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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
        const oldSavedCocktails = savedCocktails;
        let newSavedCocktails;
        const intId = parseInt(cocktailId)
        if (oldSavedCocktails.includes(intId)){
            // DELETE request
            const formData = new FormData()
            formData.append('cocktail', cocktailId);
            formData.append('username', username);

            fetch(`${process.env.REACT_APP_API}cocktails/remove-cocktail`, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: formData,
            })
            .then(response => {
                if (response.status === 200){
                    newSavedCocktails = oldSavedCocktails.filter(id => id !== intId);
                    setSavedCocktails(newSavedCocktails);
                }
            })

        } else {
            // POST request
            const formData = new FormData()
            formData.append('cocktail', cocktailId);
            formData.append('username', username);

            fetch(`${process.env.REACT_APP_API}cocktails/save-cocktail`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.cocktail);
                const newSavedCocktails = oldSavedCocktails.concat(data.cocktail);
                setSavedCocktails(newSavedCocktails);
            })
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <Routes>
                <Route path="profile" element={<Profile token={token} setSavedCocktails={setSavedCocktails} />}></Route>
                <Route path="login" element={<Login setToken={setToken} setLoggedIn={props.setLoggedIn} setUsername={setUsername} />}></Route>
                <Route path=":cocktailId" element={<CocktailDetail toggleSavedCocktail={toggleSavedCocktail} savedCocktails={savedCocktails} loggedIn={props.loggedIn} />}></Route>
                <Route path="/" element={<Search myBar={myBar} searchByName={searchByName} setSearchByName={setSearchByName} addToMyBar={addToMyBar} removeFromMyBar={removeFromMyBar} />}></Route>
            </Routes>
        </div>
    );
}