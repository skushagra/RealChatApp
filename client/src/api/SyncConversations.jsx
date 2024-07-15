import React, { useEffect, useState } from "react";
import initializeFirebase from "./FirebaseConfig.ts";
import { getDatabase, ref, onValue, orderByChild } from "firebase/database";
import {format} from "timeago.js";
import Sending from "../ui/Sending.jsx";
import Sent from "../ui/Sent.jsx";
import Recieved from "../ui/Recieved.jsx";
import Read from "../ui/Read.jsx";
import UpdateConversationStatus from "./UpdateConversationStatus.jsx";

export default function SyncConversations({threadId}) {

    const user = localStorage.getItem("email");
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const app = initializeFirebase();
        const db = getDatabase(app);
        const messagesRef = ref(db, 'messages/'+threadId, orderByChild("createdAt"));

        const unsubscribe = onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            const msgs = [];
            for (const key in data) {
                data[key].key = key;
                if(data[key].status == "sending" || data[key].status == "sent" || data[key].status == "recieved") {
                    if(!data[key].recievedBy.includes(user)) {
                        data[key].status = "read";
                        data[key].recievedBy.push(user);
                        UpdateConversationStatus(threadId, key, "read", data[key]);
                    }
                }
                msgs.push(data[key]);
            }
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [])


    return (
        <>
        {
            messages.map((message, index) => {
                let dateObj = new Date(message.createdAt * 1000);
                let utcString = dateObj.toUTCString();

                return (
                    <div key={index} className="w-[90%] flex flex-col gap-0 h-fit rounded-xl" style={{background: message.sender == user ? "#2b39423    f" : "", alignItems: message.sender == user ? "flex-end": ""}}>
                        <div className="text-slate-500  h-[30%] pt-2 pl-5">{message.sender}</div>
                        <div className="text-white h-[70%] pl-5 pt-3">{message.message}</div>
                        <div className=""></div>
                        {message.status == "sending" && <div className="flex items-center gap-2 pl-5 text-slate-600 mb-1"><Sending className="fill-slate-600" height={14} />{utcString}</div>}
                        {message.status == "sent" && <div className="flex items-center gap-2 pl-5 text-slate-600 mb-1"><Sent className="fill-slate-600" height={14} />{utcString}</div>}
                        {message.status == "recieved" && <div className="flex items-center gap-2 pl-5 text-slate-600 mb-1"><Recieved className="fill-slate-600" height={14} />{utcString}</div>}
                        {message.status == "read" && <div className="flex items-center gap-2 pl-5 text-slate-600 mb-1"><Recieved className="fill-blue-600" height={14} />{utcString}</div>}
                    </div>
                );
            })
        }
        </>
    );
}