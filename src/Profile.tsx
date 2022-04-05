
export function Profile(props: any){
    return (
        <div className="flex align-center justify-center">
            <div>Profile</div>
            <div>{props.savedCocktails}</div>
        </div>
    );
}