export function Login(){
    return (
        <div className="flex flex-col items-center justify-center bg-red mt-8 w-1/3 pb-10">
            <div className="mt-6 mb-6 text-center">
                <form className="flex flex-col items-start justify-center text-lg mt-4 text-black">
                    <label className="text-white" htmlFor="username">Username:</label>
                    <input className="m-2 w-60 pl-1" type="text" id="username"></input>
                    <label className="text-white"htmlFor="password">Password:</label>
                    <input className="m-2 w-60 pl-1 text-black" type="password"></input>
                </form>
            </div>
            <button className="w-32 text-lg text-white bg-cadetblue pl-4 pr-4 pt-1 pb-1.5 rounded-md hover:bg-white hover:text-red">Login</button>
            <br></br>
            <div className="text-lg font-bold mt-4 text-white">Or if you don't yet have an account,</div>
            <button className="w-32 mt-4 pl-4 pr-4 pt-1 pb-1.5 text-lg font-bold rounded-md bg-cadetblue text-white hover:bg-white hover:text-red">Sign up</button>
        </div>
    );
}