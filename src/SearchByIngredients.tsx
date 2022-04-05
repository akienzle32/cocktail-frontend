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
                button = <button onClick={handleClick} value={current} key={current} className="w-full truncate block text-lg text-left hover:bg-lightred transition duration-100"><div className="group pl-2 flex items-stretch justify-between"><div>{current}</div><div className="text-base -mr-12 text-cadetblue pt-0.5 pl-1.5 pr-2 group-hover:bg-darkred group-hover:text-white group-hover:-translate-x-12 transition duration-300">Add</div></div></button>
            previous.push(button);
            return previous;
        }, []);
        return nextIngredientButtons;
    }

    function displayBarButtons(): Array<ReactElement>{
        const currentBar: Array<string> = props.myBar;
        const barButtons = currentBar.map(ingredient => {
            return <button onClick={() => props.removeFromMyBar(ingredient)} key={ingredient} className="w-full truncate block text-lg text-left hover:bg-lightred transition duration-100"><div className="group pl-2 flex items-stretch justify-between"><div>{ingredient}</div><div className="relative -mr-12 text-base text-cadetblue pl-2 pr-2 pt-0.5 group-hover:bg-darkred group-hover:text-white group-hover:-translate-x-12 origin-right transition duration-300">Remove</div></div></button>
        })
        return barButtons;
    }

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
            <div className="mr-4">
                <p className="text-center text-xl text-darkcadetblue font-bold mb-1">Ingredients</p>
                <div className="flex flex-col items-start justify-start overflow-scroll w-72 h-80 bg-cadetblue border-solid border-2 border-darkcadetblue">
                    <div className="w-full flex flex-col items-start justify-start">
                        {categoryButtons}
                        <br></br>
                    </div>
                    <button className="w-20 ml-1.5 pr-1 rounded text-lg bg-darkred hover:bg-red" onClick={goBack}>{backButton}</button>
                </div>
            </div>
            <div>
                <p className="text-center text-xl text-darkcadetblue font-bold mb-1">My bar</p>
                <div className="flex flex-col items-start overflow-scroll justify-between w-72 h-80 bg-cadetblue border-solid border-2 border-darkcadetblue">
                    <div className="w-full flex flex-col items-start justify-start">
                        {barButtons}
                    </div>
                    <button onClick={handleSubmit} className="w-full h-9 text-xl pl-2 border-2 border-solid border-l-transparent border-r-transparent border-b-transparent border-t-darkcadetblue bg-darkred hover:bg-lightred hover:border-t-darkcadetblue">Search for cocktails</button>
                </div>
            </div>
        </div>
    );
}