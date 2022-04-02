import { useState, ReactElement } from "react";
import { SearchByIngredients } from './SearchByIngredients';
import { SearchByName } from './SearchByName';
import { SearchResults } from "./SearchResults";

export function Search(props: any){
    const [ searchByName, setSearchByName ] = useState(true);
    const [ cocktailSearch, setCocktailSearch ] = useState('');
    const [ searchResults, setSearchResults ] = useState([]);

    // add fetchCocktail function here and pass it down as a prop to SearchByName

    function fetchCocktail(search: string) {
        fetch(`${process.env.REACT_APP_API}cocktails/${search}`, {
            method: 'GET',
            mode: 'cors',
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }

    // add fetchByIngredients function here and pass it down as a prop to SearchByIngredients

    function displaySearchComponent(){
        if (searchByName)
            return <SearchByName cocktailSearch={cocktailSearch} setCocktailSearch={setCocktailSearch} fetchCocktail={fetchCocktail} />
        else 
            return <SearchByIngredients myBar={props.myBar} addToMyBar={props.addToMyBar} removeFromMyBar={props.removeFromMyBar} />
    }

    function displaySearchResults(): ReactElement {
        if (searchResults.length)
            return <SearchResults />
        else
            return <div></div>
    }

    const searchComponent = displaySearchComponent();
    const searchResultsComponent = displaySearchResults();

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center text-white">
                <button onClick={() => setSearchByName(true)} className="w-40 h-16 m-10 p-4 rounded bg-red hover:bg-lightred text-lg">Search by Name</button>
                <button name="search-by-ingredients-btn" onClick={() => setSearchByName(false)} className="w-50 h-16 m-10 p-4 rounded bg-red hover:bg-lightred text-lg">Search by Ingredients</button>
            </div>
            {searchComponent}
            {searchResultsComponent}
        </div>
    );
}