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
            props.updateMyBar(buttonName);
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
                button = <button onClick={handleClick} value={current} key={current} className="w-full block text-lg text-left hover:bg-rose-400"><p className="pl-2">{current}</p></button>
            else if (spirits.includes(current))
                button = button = <button onClick={handleClick} value={current} key={current} className="w-full block text-lg text-left hover:bg-rose-400"><div className="group pl-2 pr-2 flex items-stretch justify-between"><div>{current}</div><div className="text-rose-500 group-hover:text-white">Add</div></div></button>
            else if (fruitJuices.includes(current))
                button = button = <button onClick={handleClick} value={current} key={current} className="w-full block text-lg text-left hover:bg-rose-400"><p className="pl-2">{current}</p></button>
            else if (liqueurs.includes(current))
                button = button = <button onClick={handleClick} value={current} key={current} className="w-full block text-lg text-left hover:bg-rose-400"><p className="pl-2">{current}</p></button>
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
            return <button key={ingredient} className="w-full block text-lg text-left hover:bg-rose-400"><p className="pl-2">{ingredient}</p></button>
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
                <div className="w-72 h-80 bg-rose-500 border border-solid border-x-white">
                    {categoryButtons}
                    <br></br>
                    <button onClick={goBack}><div className="hover:bg-rose-400 text-lg pl-2 pr-3">{backButton}</div></button>
                </div>
            </div>
            <div>
                <p className="text-center text-xl">My bar</p>
                <div className="w-72 h-80 bg-rose-500 border-solid border-r border-t border-b border-r-white">
                    {barButtons}
                </div>
            </div>
        </div>
    );
}