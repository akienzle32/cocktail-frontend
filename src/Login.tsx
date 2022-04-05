import { FormEvent } from "react";

export function Login(){

    function onSubmit(e: FormEvent){
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        
        fetch(`${process.env.REACT_APP_API}cocktails/api-token-auth/`, {
            method: 'POST',
            mode: 'cors',
            body: formData,
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }

    return (
        <div className="flex flex-col items-center justify-center bg-darkred mt-8 w-1/3 pb-10 rounded">
            <div className="mt-6 mb-6 text-center">
                <form onSubmit={onSubmit} className="flex flex-col items-start justify-center text-lg mt-4 text-black">
                    <label className="text-white" htmlFor="username">Username:</label>
                    <input className="m-2 w-60 pl-1 rounded outline-cadetblue" name="username" type="text" id="username"></input>
                    <label className="text-white"htmlFor="password">Password:</label>
                    <input className="m-2 w-60 pl-1 text-black rounded outline-cadetblue" name="password" type="password"></input>
                    <button type="submit" className="w-32 text-lg text-white bg-cadetblue pl-4 pr-4 pt-1 pb-1.5 rounded-md hover:bg-lightcadetblue">Login</button>
                </form>
            </div>
            <br></br>
            <div className="text-lg font-bold mt-4 text-white">Or if you don't yet have an account,</div>
            <button className="w-32 mt-4 pl-4 pr-4 pt-1 pb-1.5 text-lg font-bold rounded-md bg-cadetblue text-white hover:bg-lightcadetblue">Sign up</button>
        </div>
    );
}