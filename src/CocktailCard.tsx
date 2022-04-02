import { Link } from 'react-router-dom';
import './App.css'

export function CocktailCard(props: any){

    return (
            <div className="flex justify-center items-center border border-transparent hover:border-white hover:bg-red transition duration-200">
                <div className="flex flex-col justify-center items-center m-2 mt-1">
                    <div className="text-white">{props.name}</div>
                    <img src={props.image} width="150" height="180"/>
                </div>
            </div>
    );
}