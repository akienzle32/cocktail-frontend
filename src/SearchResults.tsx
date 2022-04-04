import { ReactElement, RefObject, useRef, useEffect } from 'react';
import { CocktailCard } from './CocktailCard';
import Cocktail from './interfaces';

export function SearchResults(props: any){

    const resultsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (props.searchResults.length)
            resultsRef.current?.scrollIntoView({behavior: "smooth"});
    })

    function createCocktailCards(): Array<ReactElement> {
        const cocktailDetails: Array<Cocktail> = props.searchResults;
        const cards = cocktailDetails.map(detail => {
            return <CocktailCard id={detail.id} name={detail.name} image={detail.image} />
        })
        return cards;
    }

    const cards = createCocktailCards();

    return (
        <div ref={resultsRef} className="mt-8 flex flex-wrap justify-center items-center pb-20">
            {cards}
        </div>
    );
}