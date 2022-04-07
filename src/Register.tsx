import { useState, ReactElement } from "react";

export function Register(){
    const [ registerSuccess, setRegisterSuccess ] = useState<boolean>(false);

    function createSuccessDiv(): ReactElement {
        if (registerSuccess)
            return <div>Success!</div>
        else
            return <div></div>
    }

    const successDiv = createSuccessDiv();

    return (
        <div className="w-1/3 flex flex-col items-center justify-center">
            <div className="text-2xl text-darkcadetblue font-extrabold mt-4">Create a new account</div>
            <div className="w-full flex flex-col items-center justify-center bg-darkred mt-4 w-1/3 pb-6 rounded">
                <div className="mt-6 mb-6 text-center">
                    <form className="flex flex-col items-start justify-center text-lg mt-4 text-black">
                        <label className="text-white" htmlFor="username">Enter a username:</label>
                        <input className="m-2 w-60 pl-1 rounded outline-cadetblue" name="username" type="text"></input>
                        <label className="text-white" htmlFor="email">Enter an email :</label>
                        <input className="m-2 w-60 pl-1 rounded outline-cadetblue" name="email" type="text"></input> 
                        <label className="text-white"htmlFor="password1">Create a password:</label>
                        <input className="m-2 w-60 pl-1 text-black rounded outline-cadetblue" name="password1" type="password"></input>
                        <label className="text-white"htmlFor="password2">Re-enter password:</label>
                        <input className="m-2 w-60 pl-1 text-black rounded outline-cadetblue" name="password2" type="password"></input>
                        <button type="submit" className="w-32 text-lg text-white bg-cadetblue ml-16 mt-6 pl-4 pr-4 pt-1 pb-1.5 rounded-md hover:bg-lightcadetblue">Register</button>
                    </form>
                </div>
            </div>
            {successDiv}
        </div>
    );
}