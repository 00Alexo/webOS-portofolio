import { Power, UserCircle2 } from "lucide-react";

const WinBar = ({user, setUser}) => {
    return (
        <div className="absolute bottom-full left-0 mb-2 ml-2 backdrop-blur-xl border winbar-area
            rounded-xl flex flex-col bg-[#181818] border-white/15
            shadow-[0_20px_50px_0_rgba(0,0,0,0.6)] p-4 min-w-[400px] max-h-[400px] z-50 overflow-hidden
            transition-all duration-300 hover:shadow-[0_25px_60px_0_rgba(0,0,0,0.7)]">
            
            <div className="flex flex-row justify-between items-center w-full border-t border-white/10 pt-3">
                <div className="flex flex-row items-center gap-3">
                    <div className="relative">
                        <UserCircle2 size="36" className="text-slate-300 drop-shadow-lg"/>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-800 shadow-lg"></div>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold text-white text-lg">User</p>
                        <p className="text-slate-400 text-xs">Online</p>
                    </div>
                </div>
                <div>
                    <Power onClick={() => setUser(null)}
                        size="20" className="cursor-pointer text-slate-300 hover:text-red-400 transition-colors duration-200"
                    />
                </div>
            </div>
        </div>
    );
}

export default WinBar;