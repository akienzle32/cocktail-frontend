import { ReactElement, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { Search } from './Search';
import { Login } from './Login';

export function Home(){
    const location = useLocation();
    const path = location.pathname;
    const [ myBar, setMyBar ] = useState<Array<string>>([]);

    function updateMyBar(ingredient: string){
        if (!myBar.includes(ingredient)){
          const newBar = myBar.concat(ingredient);
          setMyBar(newBar);  
        }
    }


    function componentToDisplay(): ReactElement {
        if (path === '/login')
            return <Login />
        else {
            return <Search myBar={myBar} updateMyBar={updateMyBar} />
        }
    }
 
    const searchComponent = componentToDisplay();

    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                {searchComponent}
            </div>
        </div>
    );
}