import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Token } from './interfaces';

export function Login(props: any){

    const formRef = useRef<HTMLFormElement>(null);

    const [ loginFailure, setLoginFailure ] = useState<boolean>(false);

    function onSubmit(e: FormEvent){
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const username = formData.get('username');

        fetch(`${process.env.REACT_APP_API}cocktails/api-token-auth/`, {
            method: 'POST',
            mode: 'cors',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                setLoginFailure(true);
                return response.statusText;
            }
        })
        .then((data: Token | string) => {
            if (typeof data === 'object') {
                props.setToken(data.token);
                props.setLoggedIn(true);
                props.setUsername(username);
                formRef.current?.reset();
            }
            else
                return console.log(data);
        })
        .catch(error => console.log(error))
    }

    function closeModal(){
        setLoginFailure(false);
    }

    function displayModal(){
        if (loginFailure)
            return <div className="h-full w-full z-10 fixed bg-lightcadetblue bg-opacity-75">
            <div className="h-1/5 flex flex-col items-center justify-center mt-16">
                <div className="h-3/4 w-2/5 pt-1 bg-darkred text-white text-xl rounded">
                    <div className="">
                        <button onClick={closeModal} className="mr-2 float-right bg-lightcadetblue hover:bg-darkcadetblue border border-solid rounded-full h-6 w-6 text-base">&#10005;</button>
                        <div className="flex items-center justify-center">
                            <div className="mt-8 ml-10">Your credentials were not recognized.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    const modalBox = displayModal();

    return (
        <div className="w-full">
            {modalBox}
            <div className="w-full flex flex-col items-center justify-center">
                <div className="w-1/3 flex flex-col items-center justify-center">
                    <div className="text-2xl mt-4 text-darkcadetblue font-extrabold">Log into your account</div>
                    <div className="w-full flex flex-col items-center justify-center bg-darkred mt-4 w-1/3 pb-10 rounded">
                        <div className="mt-6 mb-6 text-center">
                            <form ref={formRef} onSubmit={onSubmit} className="flex flex-col items-start justify-center text-lg mt-4 text-black">
                                <label className="text-white" htmlFor="username">Username:</label>
                                <input className="m-2 w-60 pl-1 rounded outline-cadetblue" name="username" type="text" id="username"></input>
                                <label className="text-white"htmlFor="password">Password:</label>
                                <input className="m-2 w-60 pl-1 text-black rounded outline-cadetblue" name="password" type="password"></input>
                                <button type="submit" className="w-32 text-lg text-white bg-cadetblue ml-16 mt-4 pl-4 pr-4 pt-1 pb-1.5 rounded-md hover:bg-lightcadetblue">Log in</button>
                            </form>
                        </div>
                        <br></br>
                        <div className="text-lg font-bold text-white">Or if you don't have an account yet,</div>
                        <Link to="/register" className="w-32 mt-4 pl-4 pr-4 pt-1 pb-1.5 text-lg text-center font-bold rounded-md bg-cadetblue text-white hover:bg-lightcadetblue">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}