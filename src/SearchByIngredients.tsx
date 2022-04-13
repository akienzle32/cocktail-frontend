import React, { useState, ReactElement, FormEvent, useEffect } from "react";
import { Category, Ingredient, SavedIngredient } from './interfaces';

export function SearchByIngredients(props: any){
    const [ categories, setCategories ] = useState<Array<string>>([]);
    const [ leftButtonText, setLeftButtonText ] = useState<Array<string>>([]);

    // Fetch for initial ingredient categories
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}cocktails/ingredients/categories`, {
            method: 'GET',
            mode: 'cors',
        })
        .then(response => response.json())
        .then((data: Array<Category>) => {
            const categories: Array<string> = data.map(category => category.category)
            setCategories(categories);
            setLeftButtonText(categories);
        })
    }, [])

    useEffect(() => {
        if (props.loggedIn){
            fetch(`${process.env.REACT_APP_API}cocktails/get-ingredients`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Authorization': `Token ${props.token}`,
                },
            })
            .then(request => request.json())
            .then(data => {
                const bar = data.map((ingredient: SavedIngredient) => ingredient.ingredient);
                props.setMyBar(bar);
            })
        }
    }, [])

    // Fetch for particular ingredients within subcategory
    function fetchIngredients(e: React.MouseEvent, category: string){
        fetch(`${process.env.REACT_APP_API}cocktails/ingredients/${category}`, {
            method: 'GET',
            mode: 'cors',
        })
        .then(response => response.json())
        .then((data: Array<Ingredient>) => {
            const ingredients: Array<string> = data.map(ingredient => ingredient.name);
            setLeftButtonText(ingredients);
        })
    }

    function createQueryString(){
        const currentBar: Array<string> = props.myBar;
        const queryString = currentBar.map(ingredient => {
            if (props.spirits.includes(ingredient))
                return encodeURIComponent('spirit') + '=' + encodeURIComponent(ingredient);
            else
                return encodeURIComponent('ingredient') + '=' + encodeURIComponent(ingredient);
        }).join('&');
        
        return queryString;
    }

    function handleSubmit(e: FormEvent){
        e.preventDefault();
        const queryString = createQueryString();

        fetch(`${process.env.REACT_APP_API}cocktails/search?${queryString}`, {
            method: 'GET',
            mode: 'cors',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            props.setSearchResults(data);
            if (!data.length){
                props.setNoResults(true);
            }
        })
    }

    function displayLeftButtons(): Array<ReactElement> {
        const currentleftButtonText = leftButtonText;
        const nextLeftButtons = currentleftButtonText.map((ingredient: string) => {
            if (categories.includes(ingredient))
                return <button onClick={(e) => fetchIngredients(e, ingredient)} value={ingredient} key={ingredient} className="w-full block text-lg text-left hover:bg-lightred transition duration-100"><div className="pl-2">{ingredient}</div></button>
            else
                return <button onClick={() => props.addToMyBar(ingredient)} value={ingredient} key={ingredient} className="w-full truncate block text-lg text-left hover:bg-lightred transition duration-100"><div className="group pl-2 flex items-stretch justify-between"><div>{ingredient}</div><div className="text-base -mr-12 text-cadetblue pt-0.5 pl-1.5 pr-2 group-hover:bg-darkred group-hover:text-white group-hover:-translate-x-12 transition duration-300">Add</div></div></button>
        })
        return nextLeftButtons;
    }

    function displayRightButtons(): Array<ReactElement>{
        const currentBar: Array<string> = props.myBar;
        const rightButtons = currentBar.map(ingredient => {
            return <button onClick={() => props.removeFromMyBar(ingredient)} key={ingredient} className="w-full truncate block text-lg text-left hover:bg-lightred transition duration-100"><div className="group pl-2 flex items-stretch justify-between"><div>{ingredient}</div><div className="relative -mr-12 text-base text-cadetblue pl-2 pr-2 pt-0.5 group-hover:bg-darkred group-hover:text-white group-hover:-translate-x-12 origin-right transition duration-300">Remove</div></div></button>
        })
        return rightButtons;
    }

    function goBack(e: React.MouseEvent){
        setLeftButtonText(categories);
    }

    function displayGoBack() {
        const buttons = leftButtonText;
        if (buttons.length && !buttons.includes('Spirits'))
            return <button className="w-20 ml-1.5 pr-1 rounded text-lg bg-darkred hover:bg-red" onClick={goBack}>Go back</button>
    }

    const leftButtons = displayLeftButtons();
    const rightButtons = displayRightButtons();
    const backButton = displayGoBack();

    return (
        <div className="flex items-center justify-center text-white">
            <div className="mr-4">
                <p className="text-center text-xl text-darkcadetblue font-bold mb-1">Ingredients</p>
                <div className="flex flex-col items-start justify-start overflow-scroll w-72 h-80 bg-cadetblue border-solid border-2 border-darkcadetblue rounded">
                    <div className="w-full flex flex-col items-start justify-start">
                        {leftButtons}
                        <br></br>
                        {backButton}
                    </div>
                </div>
            </div>
            <div>
                <p className="text-center text-xl text-darkcadetblue font-bold mb-1">My bar</p>
                <div className="flex flex-col items-start overflow-scroll justify-between w-72 h-80 bg-cadetblue border-solid border-2 border-darkcadetblue rounded">
                    <div className="w-full flex flex-col items-start justify-start">
                        {rightButtons}
                    </div>
                    <button onClick={handleSubmit} className="w-full h-9 text-xl pl-2 border-2 border-solid border-l-transparent border-r-transparent border-b-transparent border-t-darkcadetblue bg-darkred hover:bg-lightred hover:border-t-darkcadetblue">Search for cocktails</button>
                </div>
            </div>
        </div>
    );
}