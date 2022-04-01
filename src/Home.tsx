import { ReactElement, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { Profile } from './Profile';
import { Login } from './Login';
import { SearchByIngredients } from './SearchByIngredients';
import { SearchByName } from './SearchByName';

export function Home(){
    const location = useLocation();
    const path = location.pathname;
    const [ searchByName, setSearchByName ] = useState(true);
    const [ myBar, setMyBar ] = useState<Array<string>>([]);

    function updateMyBar(ingredient: string){
        if (!myBar.includes(ingredient)){
          const newBar = myBar.concat(ingredient);
          setMyBar(newBar);  
        }
    }

    function searchToDisplay(): ReactElement{
        if (path === '/login')
            return <Login />
        else {
            if (searchByName)
                return <SearchByName />
            else
                return <SearchByIngredients myBar={myBar} updateMyBar={updateMyBar} />
        }
    }
    

    const searchComponent = searchToDisplay();

    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                <div>
                    <button onClick={() => setSearchByName(true)} className="w-40 h-16 m-10 p-4 rounded bg-rose-500 hover:bg-rose-400 text-lg">Search by Name</button>
                    <button name="search-by-ingredients-btn" onClick={() => setSearchByName(false)} className="w-50 h-16 m-10 p-4 rounded bg-rose-500 hover:bg-rose-400 text-lg">Search by Ingredients</button>
                </div>
                {searchComponent}
            </div>
        </div>
    );
}