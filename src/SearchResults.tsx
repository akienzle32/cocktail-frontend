import { ReactElement } from 'react';
import { CocktailCard } from './CocktailCard';
import Cocktail from './interfaces';

export function SearchResults(props: any){

    function createCocktailCards(): Array<ReactElement> {
        const cocktailDetails: Array<Cocktail> = props.searchResults;
        const cards = cocktailDetails.map(detail => {
            return <CocktailCard name={detail.name} image={detail.image} />
        })
        return cards;
    }

    const cards = createCocktailCards();

    return (
        <div className="mt-8 flex flex-wrap justify-center items-center pb-20">
            {cards}
        </div>
    );
}