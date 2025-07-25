import { Terminal } from "lucide-react";
import TerminalApp from "../components/TerminalApp";

const Main = ({apps, openApps, setOpenApps}) => {
    return (
        <div>
            <div className="p-3 flex">
                <div className="flex items-center p-3 rounded-lg bg-zinc-800 w-fit cursor-pointer
                ring-1 ring-white/40 hover:bg-white/10 transition-all duration-200">
                    <Terminal size={24} color="white" 
                        onClick={() => { 
                            if(!openApps.includes('Terminal')) {
                                setOpenApps([...openApps, 'Terminal'])
                            }
                            else {
                                setOpenApps(openApps.filter(app => app !== 'Terminal'));
                            }
                        }}
                    />
                </div>
            </div>
            <div>
                {openApps.includes('Terminal') && <TerminalApp />}
            </div>
        </div>
    );
}
 
export default Main;