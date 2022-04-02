export function Login(){
    return (
        <div className="flex flex-col items-center justify-center bg-rose-500 mt-8 w-1/3 pb-10">
            <div className="mt-6 mb-6 text-center">
                <form className="flex flex-col items-start justify-center text-lg mt-4">
                    <label htmlFor="username">Username:</label>
                    <input className="m-2 w-60 pl-1 text-black" type="text" id="username"></input>
                    <label htmlFor="password">Password:</label>
                    <input className="m-2 w-60 pl-1 text-black" type="password"></input>
                </form>
            </div>
            <button className="text-lg bg-rose-500 pl-4 pr-4 pt-1 pb-1.5 rounded-md hover:bg-white hover:text-rose-500">Login</button>
            <br></br>
            <div className="text-lg font-bold mt-4">Or if you don't yet have an account,</div>
            <button className="mt-4 pl-4 pr-4 pt-1 pb-1.5 text-lg font-bold rounded-md bg-white text-rose-500 hover:bg-rose-500 hover:text-white">Sign up</button>
        </div>
    );
}