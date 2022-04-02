import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Cocktail from "./interfaces";

export function CocktailDetail(){
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
            console.log(data);
            setDetails(data);
        })
    }, [])

    const name = details.name;

    return (
        <div className="text-white">{name}</div>
    );
}