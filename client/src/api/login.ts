
export default async function Login(username: string, password: string) : Promise<string> {

    const API = process.env.REACT_APP_BACKEND_URL;

    const authToken = await fetch(API+"/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then(res => res.json()).then(data => {
        return data;
    }
    ).catch(err => {
        console.log(err);
    });

    return authToken;
}