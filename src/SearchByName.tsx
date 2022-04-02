import { useState, FormEvent, ChangeEvent } from 'react';

export function SearchByName(props: any){
    //const [ cocktailSearch, setCocktailSearch ] = useState('');

    function onSubmit(e: FormEvent): void {
        e.preventDefault();
        console.log(process.env)
        props.fetchCocktail(props.cocktailSearch);
    }

    function handleChange(e: ChangeEvent): void {
        const element = e.currentTarget as HTMLInputElement;
        const value = element.value;
        props.setCocktailSearch(value);
    }

    return (
        <form onSubmit={onSubmit}>
            <input onChange={handleChange} className="h-10 w-80 text-black text-center text-xl outline-red" type="text" placeholder="Search for a cocktail..."></input>
        </form>
    );
}