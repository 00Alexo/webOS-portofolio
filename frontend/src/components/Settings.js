import { UserCircle2 } from "lucide-react";
import { useState } from "react";
import Home from "./Settings/Home";
import Display from "./Settings/Display";
import System from "./Settings/System";
import Apps from "./Settings/Apps";

const Settings = ({setAreSettingsOpen}) => {
    const [activeTab, setActiveTab] = useState('Home');

    return (
        <div className="absolute left-1/2 transform -translate-x-1/2 rounded-lg bg-[#1e1e1e] border-white/15 z-50
        text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] w-[90%] max-w-8xl h-[80vh] top-10 flex flex-col">
            <div className="flex justify-end w-full p-3">
                <button className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400
                    shadow-inner border border-red-600 transition-all duration-150 hover:scale-110"
                    onClick={(e) => {
                        e.stopPropagation();
                        setAreSettingsOpen(false);
                    }}>
                </button>
            </div>
            <div className="flex flex-row">
                <div className="flex flex-col w-[15%] h-full px-4">
                    <div className="flex flex-row items-center gap-3">
                        <div className="relative">
                            <UserCircle2 size="72" className="text-slate-300 drop-shadow-lg"/>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-800 shadow-lg"></div>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-semibold text-white text-2xl">User</p>
                            <p className="text-slate-400 text-md">Online</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 mt-5">
                        <div className={`items-center flex flex-row hover:bg-white/10 p-2 rounded-md cursor-pointer transition-colors duration-150
                        relative ${activeTab === 'Home' ? 'bg-white/10' : ''}`} onClick={() => setActiveTab('Home')}>
                            <p className="ml-1"> Home </p>
                            {activeTab === 'Home' &&
                                <div className ="h-full bg-blue-500 w-0.5 absolute left-0 rounded-lg"/>
                            }
                        </div>
                        <div className={`items-center flex flex-row hover:bg-white/10 p-2 rounded-md cursor-pointer transition-colors duration-150
                        relative ${activeTab === 'Display' ? 'bg-white/10' : ''}`} onClick={() => setActiveTab('Display')}>
                            <p className="ml-1"> Display </p>
                            {activeTab === 'Display' &&
                                <div className ="h-full bg-blue-500 w-0.5 absolute left-0 rounded-lg"/>
                            }
                        </div>
                        <div className={`items-center flex flex-row hover:bg-white/10 p-2 rounded-md cursor-pointer transition-colors duration-150
                        relative ${activeTab === 'System' ? 'bg-white/10' : ''}`} onClick={() => setActiveTab('System')}>
                            <p className="ml-1"> System </p>
                            {activeTab === 'System' &&
                                <div className ="h-full bg-blue-500 w-0.5 absolute left-0 rounded-lg"/>
                            }
                        </div>
                        <div className={`items-center flex flex-row hover:bg-white/10 p-2 rounded-md cursor-pointer transition-colors duration-150
                        relative ${activeTab === 'Apps' ? 'bg-white/10' : ''}`} onClick={() => setActiveTab('Apps')}>
                            <p className="ml-1"> Apps </p>
                            {activeTab === 'Apps' &&
                                <div className ="h-full bg-blue-500 w-0.5 absolute left-0 rounded-lg"/>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex w-[85%] items-center justify-center">
                    <div className="w-[70%] h-full">
                        {activeTab === 'Home' && (
                            <Home/>
                        )}
                        {activeTab === 'Display' && (
                            <Display/>
                        )}
                        {activeTab === 'System' && (
                            <System/>
                        )}
                        {activeTab === 'Apps' && (
                            <Apps/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Settings;