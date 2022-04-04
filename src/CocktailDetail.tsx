import { useEffect, useState, ReactElement } from "react";
import { useLocation } from "react-router";
import Cocktail from "./interfaces";

export function CocktailDetail(props: any){
    const location = useLocation();
    const cocktailId = location.pathname.slice(1);

    const [ details, setDetails ] = useState<Cocktail>({});

    // add fetch request here to get cocktail ingredients by id

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}cocktails/${cocktailId}`, {
            method: 'GET',
            mode: 'cors',
        })
        .then(response => response.json())
        .then(data => {
            setDetails(data);
        })
    }, [])

    function extractValuesFromJson(cocktailJson: Cocktail, key: string): Array<string>{
        const entries: Array<Array<string>> = Object.entries(cocktailJson);
        const values = entries.reduce((prev: Array<string>, curr: Array<string>) => {
            let field: string;
            if (curr[0].includes(key) && curr[1]){
                field = curr[1];
                prev.push(field);
            }
            return prev;
        }, []);
        return values;
    }

    function zip(ingredients: Array<string>, measures: Array<string>): Array<Array<string>>{
        const tuples = ingredients.map((ingredient, index) => {
            return [ingredient, measures[index]];
        })
        return tuples;
    }

    function createIngredientsAndMeasuresList(tuples: Array<Array<string>>): Array<ReactElement>{
        const ingredientsAndMeasuresList = tuples.map((tuple: Array<string>, index) => {
            if (tuple[1])
                return <li className="ml-6" key={index}>{tuple[0]}: {tuple[1]}</li>;
            else
                return <li className="ml-6" key={index}>{tuple[0]}</li>;
        })
        return ingredientsAndMeasuresList;
    }

    function getSaveBtnColor(){
        const saved = props.savedCocktails.includes(cocktailId)
        const color = saved ? "bg-darkcadetblue" : "bg-cadetblue";
        return color;
    }

    function getSaveBtnText(){
        const saved = props.savedCocktails.includes(cocktailId);
        const text = saved ? "Saved" : "Save";
        return text;
    }

    const name = details.name;
    const image = details.image;
    const instructions = details.instructions;
    const ingredients: Array<string> = extractValuesFromJson(details, "ingredient");
    const measures: Array<string> = extractValuesFromJson(details, "measure");
    const ingredientsAndMeasures: Array<Array<string>> = zip(ingredients, measures);
    const ingredientsAndMeasuresList = createIngredientsAndMeasuresList(ingredientsAndMeasures);
    const saveBtnColor = getSaveBtnColor();
    const saveBtnText = getSaveBtnText();

    return (
        <div className="overflow-scroll flex flex-col items-center justify-center">
            <div className="w-1/2 flex flex-col items-center justify-center bg-red pb-16">
                <div className="w-2/3 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center text-white">
                        <div>
                            <div className="text-3xl mt-6 mb-4 ml-32 mr-8 inline-block">{name}</div>
                            <button onClick={() => props.toggleSavedCocktail(cocktailId)} className={`${saveBtnColor} inline-block ml-14 px-2 py-1 hover:bg-darkcadetblue rounded`}>{saveBtnText}</button>
                        </div>
                        <div className="bg-cadetblue p-6 rounded"><img src={image} width="350" height="425" /></div>
                    </div>
                    <div className="flex flex-col items-start justify-start mt-4 text-white text-lg">
                        <ul className="list-disc ml-6">
                            {ingredientsAndMeasuresList}
                        </ul>
                        <div className="mt-4 ml-4">{instructions}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}