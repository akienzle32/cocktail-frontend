import { useState, useEffect, ReactElement } from "react";
import { SearchByIngredients } from './SearchByIngredients';
import { SearchByName } from './SearchByName';
import { SearchResults } from "./SearchResults";
import { Ingredient, Cocktail } from "./interfaces";

const useMountEffect = (func: any) => useEffect(func, []);

export function Search(props: any){
    const [ cocktailSearch, setCocktailSearch ] = useState('');
    const [ searchResults, setSearchResults ] = useState<Array<Cocktail>>([]);
    const [ noResults, setNoResults ] = useState<boolean>(false);
    const [ spirits, setSpirits ] = useState<Array<string>>([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}cocktails/ingredients/spirits`, {
            method: 'GET',
            mode: 'cors',
        })
        .then(request => request.json())
        .then(data => {
            const spirits = data.map((object: Ingredient) => object.name);
            setSpirits(spirits);
        })
    }, [])

    function fetchSavedCocktails(): void {
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
    }

    useMountEffect(fetchSavedCocktails);

    function fetchCocktail(search: string): void {
        fetch(`${process.env.REACT_APP_API}cocktails/${search}`, {
            method: 'GET',
            mode: 'cors',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setSearchResults(data);
            if (!data.length)
                setNoResults(true);
        })
    }

    function addToMyBar(ingredient: string){
        // Add conditional POST request
        const myBar: Array<string> = props.myBar;
        let newBar = []
        if (!myBar.includes(ingredient)){
            if (!props.loggedIn){
                newBar = myBar.concat(ingredient);
                props.setMyBar(newBar);
            } else {
                const formData = new FormData();
                formData.append('ingredient', ingredient);
                formData.append('user', props.username)

                fetch(`${process.env.REACT_APP_API}cocktails/save-ingredient`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Authorization': `Token ${props.token}`,
                    },
                    body: formData,
                })
                .then(response => response.json())
                .then(data => {
                    const newIngredient: string = data.ingredient;
                    newBar = myBar.concat(newIngredient);
                    props.setMyBar(newBar);
                })
            }  
        }
    }

    function removeFromMyBar(ingredientToRemove: string){
        // Add conditional DELETE request
        const myBar: Array<string> = props.myBar;
        let newBar = [];
        if (myBar.includes(ingredientToRemove)){
            if (!props.loggedIn){
                newBar = myBar.filter(ingredient => ingredient !== ingredientToRemove);
                props.setMyBar(newBar);
            } else {
                const formData = new FormData();
                formData.append('ingredient', ingredientToRemove);
                formData.append('user', props.username);

                fetch(`${process.env.REACT_APP_API}cocktails/remove-ingredient`, {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        'Authorization': `Token ${props.token}`,
                    },
                    body: formData,
                })
                .then(response => {
                    if (response.status === 200){
                        newBar = myBar.filter(ingredient => ingredient !== ingredientToRemove);
                        props.setMyBar(newBar);
                    }
                })
            }
        }
    }


    function switchToSearchByIngredients(){
        props.setSearchByName(false);
        setNoResults(false);
        setCocktailSearch('');
        setSearchResults([]);
    }

    function switchToSearchByName(){
        props.setSearchByName(true);
        setNoResults(false);
        setSearchResults([]);
    }

    function displaySearchComponent(){
        if (props.searchByName)
            return <SearchByName cocktailSearch={cocktailSearch} setCocktailSearch={setCocktailSearch} fetchCocktail={fetchCocktail} noResults={noResults} setNoResults={setNoResults} />
        else 
            return <SearchByIngredients loggedIn={props.loggedIn} token={props.token} myBar={props.myBar} setMyBar={props.setMyBar} addToMyBar={addToMyBar} removeFromMyBar={removeFromMyBar} searchResults={searchResults} setSearchResults={setSearchResults} spirits={spirits} noResults={noResults} setNoResults={setNoResults} />
    }

    function displaySearchResults(): ReactElement {
        if (searchResults.length)
            return <SearchResults searchResults={searchResults} />
        else if (noResults)
            return <div className="mt-6 text-xl font-extrabold text-darkcadetblue">No results.</div>
        else
            return <div></div>
    }

    const searchComponent = displaySearchComponent();
    const searchResultsComponent = displaySearchResults();

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center text-white">
                <button onClick={switchToSearchByName} className="w-40 h-16 m-10 p-4 rounded shadow-xl bg-darkred hover:bg-red text-lg transition duration-200"
                >
                    Search by Name
                </button>
                <button name="search-by-ingredients-btn" onClick={switchToSearchByIngredients} className="w-50 h-16 m-10 p-4 rounded shadow-xl bg-darkred hover:bg-red text-lg transition duration-200"
                >
                    Search by Ingredients
                </button>
            </div>
            {searchComponent}
            {searchResultsComponent}
        </div>
    );
}