import { useEffect } from "react";

export function Profile(props: any){
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}cocktails/profile`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': `Token ${props.token}`,
            },
            //credentials: 'include',
        })
        .then(request => request.json())
        .then(data => console.log(data))
    })


    return (
        <div className="flex align-center justify-center">
            <button>Profile</button>
        </div>
    );
}