import { Link } from 'react-router-dom';
import { SavedCocktail } from './interfaces';

export function Profile(props: any){

    function createCocktailLinks(){
        const savedCocktails: Array<SavedCocktail> = props.savedCocktails;
        const cocktailLinks = savedCocktails.map(cocktail => {
            return <li key={cocktail.id} className="my-3 ml-4"><Link className="bg-lightred hover:bg-darkred border border-solid border-white pl-1 pr-1 pb-0.5 rounded" to={`/${cocktail.cocktail_pk}`}>{cocktail.cocktail_name}</Link></li>
        })
        return cocktailLinks;
    }

    function logout(){
        props.setUsername('');
        props.setToken('');
        props.setLoggedIn(false);
        props.setMyBar([]);
    }

    const cocktailLinks = createCocktailLinks();

    return (
        <div className="mt-10 w-full flex flex-col items-center justify-center">
            <div className="w-1/3 flex flex-col items-center justify-center pb-8 bg-darkred text-white rounded">
                <div className="text-3xl mt-4 font-extrabold">My Profile</div>
                <div className="text-xl mt-8 overflow-scroll">
                    <div className="w-full bg-cadetblue py-4 pl-6 pr-8 rounded">
                        <div className="text-xl flex items-start justify-start"><div className="">Username:</div><div className="ml-12">{props.username}</div></div>
                        <div className="text-xl mt-4">
                            <div className="mb-2">My saved cocktails:
                                <ul className="">
                                    {cocktailLinks}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={logout} className="text-2xl mt-8 px-4 pb-1 rounded bg-darkcadetblue hover:bg-lightcadetblue">Log out</button>
            </div>
        </div>
    );
}