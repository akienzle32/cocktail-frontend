import { useState } from "react";
import { SearchByIngredients } from './SearchByIngredients';
import { SearchByName } from './SearchByName';

export function Search(props: any){
    const [ searchByName, setSearchByName ] = useState(true);

    function searchToDisplay(){
        if (searchByName)
            return <SearchByName />
        else 
            return <SearchByIngredients myBar={props.myBar} updateMyBar={props.updateMyBar} />
    }

    const searchComponent = searchToDisplay();
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
                <button onClick={() => setSearchByName(true)} className="w-40 h-16 m-10 p-4 rounded bg-rose-500 hover:bg-rose-400 text-lg">Search by Name</button>
                <button name="search-by-ingredients-btn" onClick={() => setSearchByName(false)} className="w-50 h-16 m-10 p-4 rounded bg-rose-500 hover:bg-rose-400 text-lg">Search by Ingredients</button>
            </div>
            {searchComponent}
        </div>
    );
}