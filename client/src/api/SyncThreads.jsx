import React, { useEffect, useState } from "react";
import initializeFirebase from "./FirebaseConfig.ts";
import { getDatabase, ref, onValue } from "firebase/database";
import Sending from "../ui/Sending.jsx";
import Sent from "../ui/Sent.jsx";
import Recieved from "../ui/Recieved.jsx";
import Read from "../ui/Read.jsx";


export default function SyncThreads({chatArea, chat}) {
    const [threads, setThreads] = useState([]);

    useEffect(() => {

    }, []);

    useEffect(() => {
        const app = initializeFirebase();
        const db = getDatabase(app);
        const threadsRef = ref(db, 'threads/');

        const unsubscribe = onValue(threadsRef, (snapshot) => {
            const data = snapshot.val();
            const ths = [];
            for (const key in data) {
                data[key].key = key;
                ths.push(data[key]);
            }
            setThreads(ths);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            {threads.map((thread, index) => {
                var threadName = thread.thread.split(" ").join("+");
                var threadImg = "https://avatar.oxro.io/avatar.svg?name=" + threadName;
                return (
                    <div className="flex h-20 w-full hover:bg-slate-800 cursor-pointer" key={index} onClick={() => {chatArea("chat"); chat({thread: thread, img: threadImg})}}>
                        <div className="left w-[20%] h-full  flex justify-center items-center">
                            <img src={threadImg} alt="" className="rounded-[50%] h-[70%]" />
                        </div>
                        <div className="center w-[60%] flex flex-col justify-center border-b-2 border-slate-800">
                            <div className="name text-slate-400 text-lg">{thread.thread}</div>
                            <div className="status text-slate-600 text-sm ">
                                {thread.lastMessage &&  thread.lastMessage.status && thread.lastMessage.status == "sending" && <div className="flex items-center gap-2"><Sending className="fill-slate-400" height={14} /> Your last message</div>}
                                {thread.lastMessage &&  thread.lastMessage.status && thread.lastMessage.status == "sent" && <div className="flex items-center gap-2"><Sent className="fill-slate-400" height={14} /> Your last message</div>}
                                {thread.lastMessage &&  thread.lastMessage.status && thread.lastMessage.status == "recieved" && <div className="flex items-center gap-2"><Recieved className="fill-slate-400" height={14} /> Your last message</div>}
                                {thread.lastMessage &&  thread.lastMessage.status && thread.lastMessage.status == "read" && <div className="flex items-center gap-2"><Read className="fill-blue-400" height={14} /> Your last message</div>}
                                {!thread.lastMessage && <div className="flex items-center gap-2">Join Code : {thread.code}</div>}
                            </div>
                        </div>
                        <div className="right w-[20%] h-full border-b-2 border-slate-800">
                        </div>
                    </div>
                )
                })}
        </div>
    );
}
