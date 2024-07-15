import { useEffect, useRef, useState } from "react";
import {useUser} from "../../hooks/User/User";
import createThread from "../../api/createThread.ts";
export default function CreateChat({action}) {
    const email = localStorage.getItem('email');
    const {user} = useUser();
    const [maxParitcipants, setMaxParitcipants] = useState(2);
    const [imgUrl , setImgUrl] = useState("https://avatar.oxro.io/avatar.svg?name=New+Thread");
    const [threadName, setThreadName] = useState("New Thread");
    const [desc, setDesc] = useState(`A new thread by ${email}`);

    const tnameRef= useRef("");
    const joinCodeRef= useRef("");
    const maxParitcipantsRef= useRef(2);
    
    const handleThreadName = (e) => {
        let name = e.target.value;
        if (name.length == 0) {
            name = "New Thread";
        }
        let nameArr = name.split(" ");
        let tname = nameArr[0] + "+" +nameArr[1];
        setImgUrl(`https://avatar.oxro.io/avatar.svg?name=${tname}`);
        setThreadName(name);

        if (name.length > 0) {
            tnameRef.current.classList.remove("border-red-700");
            tnameRef.current.classList.add("border-slate-700");
        }
    }

    const handleCreateThread = async (e) => {
        const threadName = tnameRef.current.value;
        const joinCode = joinCodeRef.current.value;
        const maxParitcipants = maxParitcipantsRef.current.innerText;

        if (threadName.length <= 5) {
            tnameRef.current.classList.remove("border-slate-700");
            tnameRef.current.classList.add("border-red-700");
            return;
        }

        if (joinCode.length < 4) {
            joinCodeRef.current.classList.remove("border-slate-700");
            joinCodeRef.current.classList.add("border-red-700");
            return;
        }

        const threadData = {
            thread: threadName,
            code: joinCode,
            maxParitcipants: maxParitcipants,
            email: email,
            userToken: user
        }

        const newThread = await createThread(threadData);
        console.log(newThread);
        action("null");
    }

    const addPariticpant = () => {
        setMaxParitcipants(maxParitcipants + 1);
    }

    const removePariticpant = () => {
        if(maxParitcipants > 2) {
            setMaxParitcipants(maxParitcipants - 1);
        }
    }


    return (
        <div className="w-full h-full flex flex-col gap-14 p-10">
            <div className="text-slate-400 text-3xl font-light">Create Thread</div>
            <div className="profile w-full h-fit flex">
                <div className="left w-[15%] h-full"><img src={imgUrl} alt="" className="h-full w-full rounded-[50%]" /></div>
                <div className="right w-[30%] h-full">
                    <div className="top w-full h-1/2 text-slate-300 text-3xl flex items-center justify-start px-5">{threadName}</div>
                    <div className="bottom w-full h-1/2 text-slate-500 text-sm px-5">{desc}</div>
                </div>
            </div>
            <div className="w-[45%]">
                <input ref={tnameRef} type="text" className="w-[100%] h-15 outline-none p-2 rounded-lg border-2 border-slate-700 bg-transparent text-white placeholder:" placeholder="Thread Name" onChange={handleThreadName} />
            </div>
            <div className="w-[45%]">
                <input ref={joinCodeRef} type="number" className="w-[100%] h-15 outline-none p-2 rounded-lg border-2 border-slate-700 bg-transparent text-white placeholder:" placeholder="Join Code" min={1000} max={99999999} />
            </div>
            <div className="text-slate-500 w-[45%] flex gap-10 items-center justify-center">
                Maximum Paritcipants 
                <button onClick={removePariticpant} className="minus font-bold text-xl bg-slate-900 w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer">-</button>
                <div ref={maxParitcipantsRef} className="count font-bold text-xl">{maxParitcipants}</div>
                <button onClick={addPariticpant} className="plus font-bold text-xl bg-slate-900 w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer">+</button>
            </div>
            <button className="create w-[45%] h-14 rounded-xl text-white bg-blue-500" onClick={handleCreateThread}>Create Thread</button>
        </div>
    );
}