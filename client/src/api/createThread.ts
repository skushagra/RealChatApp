
export default async function createThread(threadData: any) : Promise<string> {

    const API = process.env.REACT_APP_BACKEND_URL;

    const response = await fetch(API+"/thread/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(threadData)
    }).then(res => res.json()).then(data => {
        if (data.error) {
            console.log(data.error);
            return "";
        }
        return data;
    }
    ).catch(err => {
        console.log(err);
    });

    return response;
}