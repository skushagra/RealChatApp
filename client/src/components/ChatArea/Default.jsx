import chatDefault from "../../ui/chatDefault.png";

export default function Default() {
    return (
        <div className="chatScreenHeader h-full bg-[#303d45] flex flex-col items-center justify-center gap-3">
                    <img src={chatDefault} alt="" className="h-[50%]" />
                    <div className="text-4xl text-gray-400 font-light">Campus Connect Web</div>
                    <div className="text-sm text-gray-500 font-light">Create Threads and connect with your peers and classmates, now on the web.</div>
                    <div className="text-sm text-gray-500 font-light">Send and recieve message on upto 4 devices and the Campus App, all in real time, without keeping your phone online</div>
        </div>
    );
}