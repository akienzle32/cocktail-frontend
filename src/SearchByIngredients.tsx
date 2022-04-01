import React, { useState, ChangeEvent, EventHandler, ReactElement } from "react";

export function SearchByIngredients(){
    const categories = ['Spirits', 'Liqueurs', 'Fruit juices'];
    const spirits = ['Bourbon', 'Gin', 'Tequila', 'Vodka', 'Rye whiskey', 'White rum'];
    const fruitJuices = ['Lemon juice', 'Lime juice', 'Grapefruit juice'];
    const liqueurs = ['Maraschino', 'Campari', 'Orange liqueur'];

    const [ buttonsToDisplay, setButtonsToDisplay ] = useState('Categories');

    function handleClick(e: React.MouseEvent){
        const button = e.currentTarget as HTMLButtonElement;
        const buttonName = button.value;
        console.log(buttonName);
        setButtonsToDisplay(buttonName);
    }

    function displayButtons(): Array<ReactElement> {
        const nextButtonCategory = buttonsToDisplay;
        let labels = []

        switch(nextButtonCategory){
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

    const categoryButtons = displayButtons();
    return (
        <div className="flex items-center justify-center">
            <div>
                <p className="text-center text-xl">Ingredients</p>
                <div className="w-72 h-80 bg-rose-500 border border-solid border-x-white">
                    {categoryButtons}
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