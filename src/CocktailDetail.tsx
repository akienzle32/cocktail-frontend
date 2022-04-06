import { useEffect, useState, ReactElement } from "react";
import { useLocation } from "react-router";
import { Cocktail, SavedCocktail } from "./interfaces";

export function CocktailDetail(props: any){
    const location = useLocation();
    const cocktailId = location.pathname.slice(1);

    const [ details, setDetails ] = useState<Cocktail>({});

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

    function toggleSavedCocktail(cocktailId: string, cocktailName: string){
        const oldSavedCocktails: Array<SavedCocktail> = props.savedCocktails; 
        const savedIds: Array<number> = oldSavedCocktails.map(cocktail => cocktail.cocktail_pk);
        const intId = parseInt(cocktailId)
        let newSavedCocktails;

        if (savedIds.includes(intId)){
            // DELETE request
            const formData = new FormData()
            formData.append('cocktail_pk', cocktailId);
            formData.append('cocktail_name', details.name)
            formData.append('user', props.username);

            fetch(`${process.env.REACT_APP_API}cocktails/remove-cocktail`, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Authorization': `Token ${props.token}`,
                },
                body: formData,
            })
            .then(response => {
                if (response.status === 200){
                    newSavedCocktails = oldSavedCocktails.filter(object => object.cocktail_pk !== intId);
                    props.setSavedCocktails(newSavedCocktails);
                }
            })
        } else {
            // POST request
            const formData = new FormData()
            formData.append('cocktail_pk', cocktailId);
            formData.append('cocktail_name', details.name)
            formData.append('user', props.username);

            fetch(`${process.env.REACT_APP_API}cocktails/save-cocktail`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Authorization': `Token ${props.token}`,
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const newSavedCocktails = oldSavedCocktails.concat(data);
                props.setSavedCocktails(newSavedCocktails);
            })
        }
    }

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

    function createSaveBtn(): ReactElement {
        const loggedIn: boolean = props.loggedIn;
        const btnColor: string = getSaveBtnColor();

        if (loggedIn)
            return <button onClick={() => toggleSavedCocktail(cocktailId, details.name)} className={`${btnColor} inline-block ml-12 px-2 py-1 hover:bg-darkcadetblue rounded`}>Save</button>
        else
            return <div className="inline-block ml-24 px-1 py-1"></div>
    }

    function getSaveBtnColor(): string {
        const intId = parseInt(cocktailId);
        const savedIds = props.savedCocktails.map((cocktail: SavedCocktail) => cocktail.cocktail_pk);
        const saved = savedIds.includes(intId);
        const color = saved ? "bg-darkcadetblue" : "bg-cadetblue";
        return color;
    }

    const name = details.name;
    const image = details.image;
    const instructions = details.instructions;
    const ingredients: Array<string> = extractValuesFromJson(details, "ingredient");
    const measures: Array<string> = extractValuesFromJson(details, "measure");
    const ingredientsAndMeasures: Array<Array<string>> = zip(ingredients, measures);
    const ingredientsAndMeasuresList = createIngredientsAndMeasuresList(ingredientsAndMeasures);
    const saveBtn = createSaveBtn();

    return (
        <div className="overflow-scroll flex flex-col items-center justify-center">
            <div className="w-1/2 flex flex-col items-center justify-center bg-red pb-16">
                <div className="w-2/3 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center text-white">
                        <div>
                            <div className="text-3xl mt-6 mb-4 ml-32 mr-8 inline-block">{name}</div>
                            {saveBtn}
                        </div>
                        <div className="bg-cadetblue p-6 rounded"><img src={image} width="350" height="425" /></div>
                    </div>
                    <div className="flex flex-col items-start justify-start mt-4 text-white text-lg">
                        <ul className="list-disc ml-8">
                            {ingredientsAndMeasuresList}
                        </ul>
                        <div className="mt-4 ml-6">{instructions}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}