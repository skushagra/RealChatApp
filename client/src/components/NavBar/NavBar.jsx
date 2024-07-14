import { useTheme } from "../../hooks/Theme/Theme";

export default function NavBar() {

    const {theme, toggleTheme} = useTheme();

    return (
        <nav className="flex w-100 h-[10%]">
            <div className="w-1/3 h-full flex items-center pl-10 text-[1.4rem] font-semibold text-[#bc1e51] cursor-pointer" >
                Campus Connect
            </div>
            <div className="w-1/3 h-full flex items-center justify-around text-[1rem]" style={{color: theme == "light" ? "#1a1a1a": "#cacaca"}}>
                <div className="action cursor-pointer">Features</div>
                <div className="action cursor-pointer">Pricing</div>
                <div className="action cursor-pointer">Blog</div>
            </div>
            <div className="w-1/3 h-full flex items-center justify-end pr-10 gap-10">
                <div className="cursor-pointer" style={{color: theme == "light" ? "#bc1e51": "#cacaca"}}>Log In</div>
                <div className="cursor-pointer p-3 rounded-xl bg-[#bc1e51] text-[#fafafa]">Get Started</div>
            </div>
        </nav>
    );
}