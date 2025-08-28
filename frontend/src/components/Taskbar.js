import { useState, useEffect } from 'react';
import {ChevronDown, ChevronUp, Terminal, Globe2} from 'lucide-react';
import red from '../assets/Red.png';
import chess from '../assets/chess.png';
import cfr from '../assets/cfr.png';
import vending from '../assets/vending.png';
import QuickSettings from './QuickSettings';
import WinBar from './WinBar';

const Taskbar = ({ openApps, setOpenApps, apps, bringToFront, focusedAppId, volume, setVolume, brightness, setBrightness, user, setUser }) => {
    const [time, setTime] = useState(new Date());
    const [isArrowOpen, setIsArrowOpen] = useState(false);
    const [isWinBarOpen, setIsWinBarOpen] = useState(false);

    useEffect(() =>{
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isWinBarOpen && !event.target.closest('.winbar-area')) {
                setIsWinBarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isWinBarOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isArrowOpen && !event.target.closest('.notification-area')) {
                setIsArrowOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isArrowOpen]);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        });
    };

    const handleAppClick = (appName) =>{
        if(!openApps.some(app => app.name === appName)){
            const newAppId = Date.now();

            const newApp = {
                id: newAppId,
                name: appName,
                component: null, 
                isMinimized: false,
                isMaxSize: true,
                isLoading: true
            }

            if(appName === "Terminal" || appName === "Google")
                newApp.isMaxSize = false;

            if(appName === "Terminal") {
                newApp.isLoading = false;
            }

            setTimeout(() =>{
                setOpenApps(prev => prev.map(app => 
                    app.id === newAppId ? { ...app, isLoading: false } : app
                ));
            }, 3000);

            setOpenApps([...openApps, newApp]);
            bringToFront(newAppId);
        }else if(openApps.some(app => app.name === appName && app.isMinimized)){
            const minApp = openApps.find(app => app.name === appName);

            setOpenApps(prev => prev.map(app =>
                app.name === appName ? { ...app, isMinimized: false } : app
            ));

            bringToFront(minApp.id);
        }else{
            const bringApp = openApps.find(app => app.name === appName);

            if(focusedAppId === bringApp.id){
                setOpenApps(prev => prev.map(app =>
                    app.name === appName ? {...app, isMinimized: true} : app
                ));
            } else {
                bringToFront(bringApp.id);
            }
        }
    }

    const isAppActive = (appName) => {
        const app = openApps.find(app => app.name === appName);
        return app && focusedAppId === app.id && !app.isMinimized;
    };

    const isAppOpen = (appName) => {
        return openApps.some(app => app.name === appName);
    };

    return (
        <div className="fixed flex bottom-0 w-full bg-black/50 backdrop-blur-2xl border-t z-[100000] h-[60px]
        border-white/10 shadow-[0_-2px_16px_0_rgba(0,0,0,0.25)] text-white pr-3 pl-3 pt-1 pb-1 justify-between">
            <div className='flex items-center hover:bg-white/5 rounded-lg p-1.5 cursor-pointer'>
                <div className='w-full h-full hover:scale-110 flex items-center justify-center'
                onClick={() => setIsWinBarOpen(prev => !prev)}>
                    <svg width="34" height="34" viewBox="0 0 16 16" className="text-white/80 group-hover:text-white 
                    transition-colors duration-300 winbar-area">
                        <path
                            d="M2 2h5v5H2V2zm7 0h5v5H9V2zM2 9h5v5H2V9zm7 0h5v5H9V9z"
                            fill="currentColor"
                            className="group-hover:scale-110 transition-transform duration-300"
                        />
                    </svg>
                </div>

                {isWinBarOpen && (
                    <WinBar user={user} setUser={setUser}/>
                )}
            </div>

            <div className='flex flex-row items-center space-x-2'>
                {(() => {
                    const alwaysVisibleApps = [
                        { name: 'Google' },
                        { name: 'Terminal' }
                    ];
                    
                    const otherApps = openApps.filter(app => !["Terminal", "Google"].includes(app.name));
                    
                    const allApps = [...alwaysVisibleApps, ...otherApps];
                    
                    return allApps.map((app) => {
                        return (
                            <div key={app.id} className={`rounded-lg cursor-pointer relative transition-all duration-200 ${
                                isAppActive(app.name) 
                                    ? 'bg-white/20 border border-white/30' 
                                    : 'hover:bg-white/5'
                            }`}>
                                <div className='p-2 hover:scale-110 transition-transform duration-300 flex items-center justify-center'>
                                    <div className={`flex items-center rounded-lg cursor-pointer transition-all duration-200`} 
                                    onClick={() => handleAppClick(app.name)}>
                                        {app.name === 'FlappyBird' ? (
                                            <div className="w-8 h-8 flex items-center justify-center">
                                                <img src={red} width="28" height="28" className="scale-[140%]" />
                                            </div>
                                        ) : app.name === 'ChessBird' ? (
                                            <div className="w-8 h-8 flex items-center justify-center">
                                                <img src={chess} width="28" height="28" className="scale-[140%]" />
                                            </div>
                                        ) : app.name === 'CfrApp' ? (
                                            <div className="w-8 h-8 flex items-center justify-center">
                                                <img src={cfr} width="22" height="22" className="scale-[140%]" />
                                            </div>
                                        ) : app.name === 'MeowFeeder' ? (
                                            <div className="w-8 h-8 flex items-center justify-center">
                                                <div className="w-8 h-8 rounded-lg bg-pink-300 flex items-center justify-center">
                                                    <span className="text-white font-bold text-sm">MF</span>
                                                </div>
                                            </div>
                                        ) : app.name === 'Terminal' ? (
                                            <div className={`flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer ring-1 transition-all duration-200 ${
                                                isAppActive('Terminal') 
                                                    ? 'bg-zinc-700 ring-white/60' 
                                                    : 'bg-zinc-800 ring-white/40'
                                            }`}>
                                                <Terminal size={12} color="white"/>
                                            </div>
                                        ) : app.name === 'GeoExplorer' ? (
                                            <div className="w-8 h-8 flex items-center justify-center">
                                                <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center shadow-lg border border-[#5F5FDF]">
                                                    <Globe2 className="text-base text-[#5F5FDF]" />
                                                </div>
                                            </div>
                                        ) : app.name === 'MyVendingMachine' ? (
                                            <div className="w-8 h-8 flex items-center justify-center">
                                                <img src={vending} width="22" height="22" className="scale-[140%]" />
                                            </div>
                                        ) : app.name === 'Google' ? (
                                            <div className="w-8 h-8 flex items-center justify-center">
                                                <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                                </svg>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                {isAppOpen(app.name) && (
                                    <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-full transition-all duration-200 ${
                                        isAppActive(app.name) ? 'bg-blue-400' : 'bg-white'
                                    }`}></div>
                                )}
                            </div>
                        )
                    })
                })()}
            </div>

            <div className='flex flex-row'>
                <div className='flex items-center justify-center'>
                    <button 
                        className="text-white hover:text-gray-300 focus:outline-none hover:bg-white/5 rounded-lg p-2"
                        onClick={() => setIsArrowOpen(!isArrowOpen)}
                    >
                        {isArrowOpen ? <ChevronDown size={22}/> : <ChevronUp size={22}/>}
                    </button>
                </div>
                <div className="flex flex-col justify-center items-end text-sm hover:bg-white/5 rounded-lg pt-1 pb-1 pr-2 pl-2 cursor-pointer">
                    <div>
                        {formatTime(time)}
                    </div>
                    <div>
                        {formatDate(time)}
                    </div>
                </div>

                {isArrowOpen && (
                    <QuickSettings 
                        volume={volume} 
                        setVolume={setVolume} 
                        brightness={brightness} 
                        setBrightness={setBrightness} 
                        openApps={openApps} 
                        setOpenApps={setOpenApps} 
                    />
                )}
            </div>
        </div>
    );
}
 
export default Taskbar;