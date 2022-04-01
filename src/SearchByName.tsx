import { useState, FormEvent, ChangeEvent } from 'react';

export function SearchByName(){
    const [ cocktailSearch, setCocktailSearch ] = useState('');

    function onSubmit(e: FormEvent): void {
        e.preventDefault();
    }

    function handleChange(e: ChangeEvent): void {
        const element = e.currentTarget as HTMLInputElement;
        const value = element.value;
        setCocktailSearch(value);
    }

    return (
        <form onSubmit={onSubmit}>
            <input onChange={handleChange} className="h-10 w-80 text-black text-center text-xl outline-rose-500" type="text" placeholder="Search for a cocktail..."></input>
        </form>
    );
}