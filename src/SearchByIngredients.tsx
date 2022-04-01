export function SearchByIngredients(){
    return (
        <div className="flex items-center justify-center">
            <div>
                <p className="text-center">Ingredients</p>
                <div className="w-72 h-80 bg-rose-500 pl-2 border border-solid border-x-white">
                    <button className="block">Spirits</button>
                    <button className="block">Liqueurs</button>
                    <button className="block">Fruit juices</button>
                </div>
            </div>
            <div>
                <p className="text-center">My bar</p>
                <div className="w-72 h-80 bg-rose-500 pl-2 border-solid border-r border-t border-b border-r-white">
                    <button>Remove</button>
                </div>
            </div>
        </div>
    );
}