import { useState, FormEvent, ChangeEvent } from 'react';

export function SearchByName(props: any){
    //const [ cocktailSearch, setCocktailSearch ] = useState('');

    function onSubmit(e: FormEvent): void {
        e.preventDefault();
        props.fetchCocktail(props.cocktailSearch);
    }

    function handleChange(e: ChangeEvent): void {
        const element = e.currentTarget as HTMLInputElement;
        const value = element.value;
        props.setCocktailSearch(value);
    }

    return (
        <div className="w-full mt-6 bg-cadetblue pt-6 pb-6 rounded">
            <form className="w-full flex flex-col items-center justify-center" onSubmit={onSubmit}>
                <input onChange={handleChange} className="h-10 w-3/4 rounded text-center outline-red text-xl outline-red" type="text" placeholder="Search for a cocktail..."></input>
            </form>
        </div>
    );
}