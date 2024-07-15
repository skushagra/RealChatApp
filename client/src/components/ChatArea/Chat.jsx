import Emoji from "../../ui/Emoji";
import Plus from "../../ui/Plus";
import Mic from "../../ui/Mic";
import Picker from "emoji-picker-react";
import { useState } from "react";
import pushMessagetoThread from "../../api/pushMessagetoThread.ts"
import SyncConversations from "../../api/SyncConversations.jsx";
import { serverTimestamp } from "firebase/database";
import UpdateConversationStatus from "../../api/UpdateConversationStatus.jsx";

export default function Chat({chat}) {
    const thread = chat.thread;
    const img = chat.img;
    const [showPicker, setShowPicker] = useState(false);
    const [inputStr, setInputStr] = useState("");
    const user = localStorage.getItem("email");
    if(!user) return null;

    const onEmojiClick = (event, emojiObject) => {
        setInputStr((prevInput) => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    const handleMessage = async (event) => {
        event.preventDefault();
        const message = inputStr;
        const messageData = {
            message: message,
            sender: user,
            status: "sending",
            createdAt: serverTimestamp(),
            recievedBy: [user],
            readBy: [user]
        }
        const res = await pushMessagetoThread(thread.key, messageData);
        setInputStr("");
        console.log("ABC", res);
        if(res.message == "Message sent") {
            const out = await UpdateConversationStatus(res.threadId, res.key, "sent", messageData);
            console.log(out);
        }
    }


    return (
        <div className="w-full h-full">
            {showPicker && (
                <Picker className="" pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} />
            )}
            <div className="banner w-full h-[10%] flex items-center pl-4">
                <img src={img} alt="" className="h-12 rounded-[50%]" />
                <div className="name text-white text-lg ml-4">{thread.thread}</div>

            </div>
            <div className="chatArea w-full h-[80%] bg-[#19242d] flex flex-col gap-5 items-center pt-5 overflow-scroll ">
                <SyncConversations threadId={thread.key} />
            </div>

            <div className="input w-full h-[10%] flex justify-around items-center bg-[#1f2c34]">
                <div className="">
                    <Emoji className="w-6 h-6 fill-slate-400" onclick={() => setShowPicker((val) => !val)} />
                </div>
                <div className="">
                    <Plus className="w-6 h-6 fill-slate-400" />
                </div>
                <form className="w-[80%] h-[70%]" onSubmit={handleMessage}>
                <input type="text" className="outline-none pl-4 text-white w-full h-full bg-[#2b3942] rounded-lg font-light" placeholder="Type a message"  value={inputStr} onChange={(e) => setInputStr(e.target.value)}/>
                </form>
                <div className="">
                    <Mic className="w-6 h-6 fill-slate-400" />
                </div>
            </div>
        </div>
    );
}