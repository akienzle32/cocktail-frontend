import React, { useState, ChangeEvent, EventHandler, ReactElement } from "react";

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
                button = <button onClick={handleClick} value={current} key={current} className="w-full block text-lg text-left hover:bg-rose-400 transition duration-100"><div className="pl-2">{current}</div></button>
            else if (spirits.includes(current))
                button = <button onClick={handleClick} value={current} key={current} className="w-full block text-lg text-left hover:bg-rose-400 transition duration-100"><div className="group pl-2 pr-2 flex items-stretch justify-between"><div>{current}</div><div className="text-base text-rose-500 pt-0.5 group-hover:text-white transition duration-100">Add</div></div></button>
            else if (fruitJuices.includes(current))
                button = <button onClick={handleClick} value={current} key={current} className="w-full block text-lg text-left hover:bg-rose-400 transition duration-100"><div className="group pl-2 pr-2 flex items-stretch justify-between"><div>{current}</div><div className="text-base text-rose-500 pt-0.5 group-hover:text-white transition duration-100">Add</div></div></button>
            else if (liqueurs.includes(current))
                button = <button onClick={handleClick} value={current} key={current} className="w-full block text-lg text-left hover:bg-rose-400 transition duration-100"><div className="group pl-2 pr-2 flex items-stretch justify-between"><div>{current}</div><div className="text-base text-rose-500 pt-0.5 group-hover:text-white transition duration-100">Add</div></div></button>
            else
                button = <button></button>
            previous.push(button);
            return previous;
        }, []);
        return nextIngredientButtons;
    }

    function displayBarButtons(): Array<ReactElement>{
        const currentBar: Array<string> = props.myBar;
        const barButtons = currentBar.map(ingredient => {
            return <button onClick={() => props.removeFromMyBar(ingredient)} key={ingredient} className="w-full block text-lg text-left hover:bg-rose-400 transition duration-100"><div className="group pl-2 pr-2 flex items-stretch justify-between"><div>{ingredient}</div><div className="text-base text-rose-500 pt-0.5 group-hover:text-white transition duration-100">Remove</div></div></button>
        })
        return barButtons;
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
    const barButtons = displayBarButtons();
    const backButton = displayGoBack();
    return (
        <div className="flex items-center justify-center">
            <div>
                <p className="text-center text-xl">Ingredients</p>
                <div className="flex flex-col items-start overflow-scroll justify-between w-72 h-80 bg-rose-500 border-solid border-l border-r border-t border-b border-l-white">
                    <div className="w-full flex flex-col items-start justify-start">
                        {categoryButtons}
                        <br></br>
                    </div>
                    <button onClick={goBack}><div className="w-full hover:bg-rose-400 text-lg pl-2 pr-3">{backButton}</div></button>
                </div>
            </div>
            <div>
                <p className="text-center text-xl">My bar</p>
                <div className="flex flex-col items-start overflow-scroll justify-between w-72 h-80 bg-rose-500 border-solid border-r border-t border-b border-r-white">
                    <div className="w-full flex flex-col items-start justify-start">
                        {barButtons}
                    </div>
                    <button className="w-full pl-2 hover:bg-rose-400">Search for cocktails</button>
                </div>
            </div>
        </div>
    );
}