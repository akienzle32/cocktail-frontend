import { useState, ReactElement, ChangeEvent } from "react";
import { Link } from "react-router-dom";

export function Register(){
    const [ registerSuccess, setRegisterSuccess ] = useState<boolean>(false);
    const [ username, setUsername ] = useState<string>();
    const [ email, setEmail ] = useState<string>();
    const [ password1, setPassword1 ] = useState<string>();
    const [ password2, setPassword2 ] = useState<string>();

    function handleChange(e: ChangeEvent, field: string){
        const element = e.currentTarget as HTMLInputElement;
        const value = element.value;
        
        switch(field){
            case 'username':
                setUsername(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password1':
                setPassword1(value);
                break;
            case 'password2':
                setPassword2(value);
                break;
            default:
                break;
        }
    }

    function createSuccessDiv(): ReactElement {
        if (registerSuccess)
            return <div className="h-full w-full z-10 fixed bg-lightcadetblue bg-opacity-75">
                    <div className="h-1/5 flex flex-col items-center justify-center mt-16">
                        <div className="h-3/4 w-2/5 pt-1 bg-darkred text-white text-xl rounded">
                            <div className="pr-2">
                                <button onClick={closeModal} className="float-right bg-lightcadetblue hover:bg-darkcadetblue border border-solid rounded-full h-6 w-6 text-base">&#10005;</button>
                                <div className="flex flex-col items-center justify-center pt-5 ml-8">
                                    <div>Registration successful!</div>
                                    <div>Go to <Link className="font-extrabold underline hover:bg-lightcadetblue hover:no-underline rounded px-0.5" to="/login">Log In</Link> to sign in with your new credentials.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        else
            return <div></div>
    }

    function activateRegisterBtn(): boolean {
        if (!username || !email || !password1 || !password2 || password1 !== password2)
            return true
        else
            return false;
    }

    function passwordsDoNotMatchAlert(): ReactElement {
        if (password1 && password2 && password1 !== password2)
            return <div className="text-white text-base">Passwords do not match.</div>
        else
            return <div className="text-darkred text-base">Filler</div>
    }

    function closeModal(){
        setRegisterSuccess(false);
    }

    const disabledFlag: boolean = activateRegisterBtn();
    const successDiv = createSuccessDiv();
    const passwordAlert = passwordsDoNotMatchAlert();

    return (
        <div className="h-full w-full">
            {successDiv}
            <div className="w-full flex flex-col items-center justify-center">
                <div className="w-1/3 flex flex-col items-center justify-center">
                    <div className="text-2xl text-darkcadetblue font-extrabold mt-4">Create a new account</div>
                    <div className="w-full flex flex-col items-center justify-center bg-darkred mt-4 w-1/3 pb-6 rounded">
                        <div className="mt-6 mb-6 text-center">
                            <form className="flex flex-col items-start justify-center text-lg mt-3 text-black">
                                <label className="text-white" htmlFor="username">Enter a username:</label>
                                <input onChange={(e) => handleChange(e, 'username')} className="m-2 w-60 pl-1 rounded outline-cadetblue font-bold" name="username" type="text"></input>
                                <label className="text-white" htmlFor="email">Enter an email:</label>
                                <input onChange={(e) => handleChange(e, 'email')}className="m-2 w-60 pl-1 rounded outline-cadetblue font-bold" name="email" type="text"></input> 
                                <label className="text-white"htmlFor="password1">Create a password:</label>
                                <input onChange={(e) => handleChange(e, 'password1')}className="m-2 w-60 pl-1 text-black rounded outline-cadetblue" name="password1" type="password"></input>
                                <label className="text-white"htmlFor="password2">Re-enter password:</label>
                                <input onChange={(e) => handleChange(e, 'password2')}className="m-2 w-60 pl-1 text-black rounded outline-cadetblue" name="password2" type="password"></input>
                                <div className="flex flex-col items-center justify-center">
                                    {passwordAlert}
                                    <button disabled={disabledFlag} type="submit" className="w-32 text-lg text-white bg-cadetblue ml-16 mt-2 pl-4 pr-4 pt-1 pb-1.5 rounded-md hover:bg-lightcadetblue disabled:bg-grey">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}