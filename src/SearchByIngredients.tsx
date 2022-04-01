import React, { useState, ChangeEvent, EventHandler, ReactElement } from "react";

export function SearchByIngredients(){
    const categories = ['Spirits', 'Liqueurs', 'Fruit juices'];
    const spirits = ['Bourbon', 'Gin', 'Tequila', 'Vodka', 'Rye whiskey', 'White rum'];
    const fruitJuices = ['Lemon juice', 'Lime juice', 'Grapefruit juice'];
    const liqueurs = ['Maraschino', 'Campari', 'Orange liqueur'];

    const [ ingredientButtons, setIngredientButtons ] = useState('Categories');
    const [ myBar, setMyBar ] = useState<Array<string>>([]);

    function handleClick(e: React.MouseEvent){
        const button = e.currentTarget as HTMLButtonElement;
        const buttonName = button.value;
        if (categories.includes(buttonName)){
            setIngredientButtons(buttonName);
        } else {
            const lastBar: Array<string> = myBar;
            if (!myBar.includes(buttonName)){
                const nextBar: Array<string> = lastBar.concat(buttonName);
                setMyBar(nextBar);
            }
        }
    }

    function displayIngredientButtons(): Array<ReactElement> {
        const nextIngredientButtons = ingredientButtons;
        let labels = []

        switch(nextIngredientButtons){
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
        const nextButtons = labels.map((label, index) => {
            return <button onClick={handleClick} value={label} key={index} className="w-full block text-lg text-left hover:bg-rose-400"><p className="pl-2">{label}</p></button>
        })
        return nextButtons;
    }

    function goBack(e: React.MouseEvent){
        setIngredientButtons('Categories');
    }

    function displayGoBack(){
        const buttons = ingredientButtons;
        let text = '';
        if (buttons != 'Categories')
            text = 'Go back';
        return text;
    }
    const categoryButtons = displayIngredientButtons();
    const backButton = displayGoBack();
    return (
        <div className="flex items-center justify-center">
            <div>
                <p className="text-center text-xl">Ingredients</p>
                <div className="w-72 h-80 bg-rose-500 border border-solid border-x-white">
                    {categoryButtons}
                    <br></br>
                    <button onClick={goBack}><div className="hover:bg-rose-400 text-lg pl-2 pr-3">{backButton}</div></button>
                </div>
            </div>
            <div>
                <p className="text-center text-xl">My bar</p>
                <div className="w-72 h-80 bg-rose-500 pl-2 border-solid border-r border-t border-b border-r-white">
                    <button className="text-lg">Remove</button>
                </div>
            </div>
        </div>
    );
}