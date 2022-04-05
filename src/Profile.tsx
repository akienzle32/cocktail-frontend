import { useEffect } from "react";
import { SavedCocktail } from "./interfaces";

export function Profile(props: any){
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}cocktails/profile`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': `Token ${props.token}`,
            },
            //credentials: 'include',
        })
        .then(request => request.json())
        .then(data => {
            let cocktailIdArray: Array<Number> = [];
            data.forEach((object: SavedCocktail) => {
                cocktailIdArray.push(object.cocktail);
            })
            props.setSavedCocktails(cocktailIdArray);
        })
    }, [])


    return (
        <div className="flex align-center justify-center">
            <button>Profile</button>
        </div>
    );
}