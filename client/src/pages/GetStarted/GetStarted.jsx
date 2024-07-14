import { useTheme } from "../../hooks/Theme/Theme";


export default function GetStarted() {

    const {theme, toggleTheme} = useTheme();

    return (
        <div className="w-screen h-[90%] flex">
            <div className="w-1/2 h-full ">
                {/* <img src="https://i.postimg.cc/TYxQxbqR/pexels-ollivves-931007.jpg" alt="" className="" /> */}
            </div>
            <div className="w-1/2 h-full flex justify-center items-center">
                <form action="" className="w-full">
                    <div className="flex flex-col items-center gap-5">
                        <h1 className="text-[2rem] font-semibold" style={{color: theme == "light" ? "#1a1a1a" : "#fafafa"}}>Log In</h1>
                        <input type="text" placeholder="Email" className="outline-none w-[80%] h-[2.5rem] border-2 border-[#bc1e51] bg-transparent rounded-lg pl-5" required />
                        <input type="password" placeholder="Password" className="outline-none w-[80%] h-[2.5rem] border-2 border-[#bc1e51] bg-transparent rounded-lg pl-5" required />
                        <button className="w-[80%] h-[2.5rem] bg-[#bc1e51] text-[#fafafa] font-semibold rounded-lg cursor-pointer">Log In</button>
                        <div className="flex items-center gap-5">
                            <input type="checkbox" />
                            <label htmlFor="">Remember Me</label>
                        </div>
                        <div className="flex items-center gap-5">
                            <div>Alreafy have an account?</div>
                            <div className="cursor-pointer">Login In</div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}