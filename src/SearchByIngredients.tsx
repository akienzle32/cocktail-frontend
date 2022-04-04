import React, { useState, ChangeEvent, EventHandler, ReactElement, FormEvent } from "react";

export function SearchByIngredients(props: any){
    const categories = ['Spirits', 'Liqueurs', 'Fruit juices'];
    const spirits = ['Bourbon', 'Gin', 'Tequila', 'Vodka', 'Rye whiskey', 'White rum'];
    const fruitJuices = ['Lemon juice', 'Lime juice', 'Grapefruit juice'];
    const liqueurs = ['Maraschino', 'Campari', 'Orange liqueur'];

    const [ ingredientButtons, setIngredientButtons ] = useState('Categories');
    //const [ myBar, setMyBar ] = useState<Array<string>>([]);

    function handleClick(e: React.MouseEvent){
        const button = e.currentTarget as HTMLButtonElement;
        const buttonName = button.value;
        if (categories.includes(buttonName)){
            setIngredientButtons(buttonName);
        } else {
            props.addToMyBar(buttonName);
        }
    }

    function createQueryString(){
        const currentBar: Array<string> = props.myBar;
        const queryString = currentBar.map(ingredient => {
            if (spirits.includes(ingredient))
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
        })
    }

    function displayIngredientButtons(): Array<ReactElement> {
        let labels = []

        switch(ingredientButtons){
            case 'Categories':
                labels = categories;
                break;
            case 'Spirits':
                labels = spirits;
                break;
            case 'Fruit juices':
                labels = fruitJuices;
                break;
            case 'Liqueurs':
                labels = liqueurs;
                break;
            default:
                labels = categories;
                break;
        }
        const nextIngredientButtons = labels.reduce((previous: Array<ReactElement>, current: string) => {
            let button: ReactElement;
            if (categories.includes(current))
                button = <button onClick={handleClick} value={current} key={current} className="w-full block text-lg text-left hover:bg-lightred transition duration-100"><div className="pl-2">{current}</div></button>
            else
                button = <button onClick={handleClick} value={current} key={current} className="w-full block text-lg text-left hover:bg-lightred transition duration-100"><div className="group pl-2 flex items-stretch justify-between"><div>{current}</div><div className="text-base -mr-10 text-red pt-0.5 pl-1.5 pr-2 group-hover:bg-darkred group-hover:text-white group-hover:-translate-x-10 transition duration-300">Add</div></div></button>
            previous.push(button);
            return previous;
        }, []);
        return nextIngredientButtons;
    }

    function displayBarButtons(): Array<ReactElement>{
        const currentBar: Array<string> = props.myBar;
        const barButtons = currentBar.map(ingredient => {
            return <button onClick={() => props.removeFromMyBar(ingredient)} key={ingredient} className="w-full block text-lg text-left hover:bg-lightred transition duration-100"><div className="group pl-2 flex items-stretch justify-between"><div>{ingredient}</div><div className="relative -mr-10 text-base text-red pl-2 pr-2 pt-0.5 group-hover:bg-darkred group-hover:text-white group-hover:-translate-x-10 origin-right transition duration-300">Remove</div></div></button>
        })
        return barButtons;
    }

    /*

    function createHiddenInputs(){
        const currentBar: Array<string> = props.myBar;
        const formInputs = currentBar.map(ingredient => {
            if (spirits.includes(ingredient))
                return <input type="hidden" name ="spirit" value={ingredient}></input>
            else
                return <input type="hidden" name="ingredient" value={ingredient}></input>
        })
        return formInputs;
    }

    */

    function goBack(e: React.MouseEvent){
        setIngredientButtons('Categories');
    }

    function displayGoBack(){
        const buttons = ingredientButtons;
        let text = '';
        if (buttons !== 'Categories')
            text = 'Go back';
        return text;
    }
    const categoryButtons = displayIngredientButtons();
    const barButtons = displayBarButtons();
    const backButton = displayGoBack();
    //const formInputs = createHiddenInputs();
    return (
        <div className="flex items-center justify-center text-white">
            <div>
                <p className="text-center text-xl">Ingredients</p>
                <div className="flex flex-col items-start justify-start overflow-scroll w-72 h-80 bg-red border-solid border-l border-r border-t border-b border-l-white">
                    <div className="w-full flex flex-col items-start justify-start">
                        {categoryButtons}
                        <br></br>
                    </div>
                    <button className="w-20 pr-1 text-lg bg-darkred hover:bg-lightred" onClick={goBack}>{backButton}</button>
                </div>
            </div>
            <div>
                <p className="text-center text-xl">My bar</p>
                <div className="flex flex-col items-start overflow-scroll justify-between w-72 h-80 bg-red border-solid border-r border-t border-b border-r-white">
                    <div className="w-full flex flex-col items-start justify-start">
                        {barButtons}
                    </div>
                    <button onClick={handleSubmit} className="w-full h-9 text-xl pl-2 bg-darkred hover:bg-lightred transition duration-100">Search for cocktails</button>
                </div>
            </div>
        </div>
    );
}