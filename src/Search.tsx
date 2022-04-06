import { useState, useEffect, ReactElement } from "react";
import { SearchByIngredients } from './SearchByIngredients';
import { SearchByName } from './SearchByName';
import { SearchResults } from "./SearchResults";
import { SavedCocktail } from "./interfaces";

export function Search(props: any){
    const [ cocktailSearch, setCocktailSearch ] = useState('');
    const [ searchResults, setSearchResults ] = useState([]);

    useEffect(() => {
        if (props.loggedIn){
            fetch(`${process.env.REACT_APP_API}cocktails/profile`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Authorization': `Token ${props.token}`,
                },
            })
            .then(request => request.json())
            .then(data => {
                props.setSavedCocktails(data);
            })
        }
    }, [])

    function fetchCocktail(search: string) {
        fetch(`${process.env.REACT_APP_API}cocktails/${search}`, {
            method: 'GET',
            mode: 'cors',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setSearchResults(data);
        })
    }

    function addToMyBar(ingredient: string){
        const myBar = props.myBar;
        if (!myBar.includes(ingredient)){
          const newBar = myBar.concat(ingredient);
          props.setMyBar(newBar);  
        }
    }

    function removeFromMyBar(ingredientToRemove: string){
        const myBar: Array<string> = props.myBar;
        const newBar = myBar.filter(ingredient => ingredient !== ingredientToRemove);
        props.setMyBar(newBar);
    }


    function switchToSearchByIngredients(){
        props.setSearchByName(false);
        setCocktailSearch('');
        setSearchResults([]);
    }

    function switchToSearchByName(){
        props.setSearchByName(true);
        setSearchResults([]);
    }

    function displaySearchComponent(){
        if (props.searchByName)
            return <SearchByName cocktailSearch={cocktailSearch} setCocktailSearch={setCocktailSearch} fetchCocktail={fetchCocktail} />
        else 
            return <SearchByIngredients loggedIn={props.loggedIn} token={props.token} myBar={props.myBar} setMyBar={props.setMyBar} addToMyBar={addToMyBar} removeFromMyBar={removeFromMyBar} searchResults={searchResults} setSearchResults={setSearchResults} />
    }

    function displaySearchResults(): ReactElement {
        if (searchResults.length)
            return <SearchResults searchResults={searchResults} />
        else
            return <div></div>
    }

    const searchComponent = displaySearchComponent();
    const searchResultsComponent = displaySearchResults();

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center text-white">
                <button onClick={switchToSearchByName} className="w-40 h-16 m-10 p-4 rounded bg-darkred hover:bg-red text-lg">Search by Name</button>
                <button name="search-by-ingredients-btn" onClick={switchToSearchByIngredients} className="w-50 h-16 m-10 p-4 rounded bg-darkred hover:bg-red text-lg">Search by Ingredients</button>
            </div>
            {searchComponent}
            {searchResultsComponent}
        </div>
    );
}