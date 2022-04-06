
import { Link } from 'react-router-dom';

export function Profile(props: any){
    //const margarita = savedCocktails[0];

    function createCocktailLinks(){
        const savedCocktails: Array<Number> = props.savedCocktails;
        const cocktailLinks = savedCocktails.map(cocktail => {
            return <li><Link to={`/${cocktail}`}>Margarita</Link></li>
        })
        return cocktailLinks;
    }

    function logout(){

    }

    const cocktailLinks = createCocktailLinks();

    return (
        <div className="mt-10 w-full flex flex-col items-center justify-center">
            <div className="w-1/3 flex flex-col items-start justify-start pb-8 bg-darkred text-white rounded">
                <div className="text-3xl mt-4 ml-44 w-full">My Profile</div>
                <div className="text-xl mt-8 ml-24">
                    <div className="bg-cadetblue py-4 pl-6 pr-8 rounded">
                        <div className="text-xl flex items-start justify-start"><div className="">Username:</div><div className="ml-16">{props.username}</div></div>
                        <div className="text-xl mt-4">
                            <div className="mb-2">My saved cocktails:</div>
                            <ul className="list-disc ml-8">
                                {cocktailLinks}
                            </ul>
                        </div>
                    </div>
                    <button onClick={logout} className="text-2xl mt-8 ml-24 px-4 pb-1 rounded bg-cadetblue hover:bg-lightcadetblue">Log out</button>
                </div>
            </div>
        </div>
    );
}