import { useState, useEffect } from 'react';
import {ChevronDown, ChevronUp, Wifi, Battery, Settings, Volume2, LayoutGrid, Terminal} from 'lucide-react';
import TerminalApp from './Apps/TerminalApp';
import GoogleApp from './Apps/GoogleApp';
import FlappyBirdApp from './Apps/FlappyBirdApp';
import red from '../assets/Red.png';
import chess from '../assets/chess.png';

const Taskbar = ({ openApps, setOpenApps, apps, bringToFront, focusedAppId }) => {
    const [time, setTime] = useState(new Date());
    const [isArrowOpen, setIsArrowOpen] = useState(false);
    console.log(openApps);

    useEffect(() =>{
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

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

    const handleGoogleClick = () => {
        if(!openApps.some(app => app.name === 'Google')) {
            const newAppId = Date.now();
            const newApp = {
                id: newAppId,
                name: 'Google',
                component: null, 
                isMinimized: false,
                isMaxSize: false
            }
            setOpenApps([...openApps, newApp]);
            bringToFront(newAppId);
        } else if(openApps.some(app => app.name === 'Google' && app.isMinimized)) {
            const googleApp = openApps.find(app => app.name === 'Google');
            setOpenApps(prev => prev.map(app => 
                app.name === 'Google' ? { ...app, isMinimized: false } : app
            ));
            bringToFront(googleApp.id);
        } else {
            const googleApp = openApps.find(app => app.name === 'Google');
            if (focusedAppId === googleApp.id) {
                setOpenApps(prev => prev.map(app => 
                    app.name === 'Google' ? {...app, isMinimized: true} : app
                ));
            } else {
                bringToFront(googleApp.id);
            }
        }
    };

    const handleTerminalClick = () => {
        if(!openApps.some(app => app.name === 'Terminal')) {
            const newAppId = Date.now();
            const newApp = {
                id: newAppId,
                name: 'Terminal',
                component: null,
                isMinimized: false,
                isMaxSize: false
            }
            setOpenApps([...openApps, newApp]);
            bringToFront(newAppId);
        } else if(openApps.some(app => app.name === 'Terminal' && app.isMinimized)) {
            const terminalApp = openApps.find(app => app.name === 'Terminal');
            setOpenApps(prev => prev.map(app => 
                app.name === 'Terminal' ? { ...app, isMinimized: false } : app
            ));
            bringToFront(terminalApp.id);
        } else {
            const terminalApp = openApps.find(app => app.name === 'Terminal');
            if (focusedAppId === terminalApp.id) {
                setOpenApps(prev => prev.map(app => 
                    app.name === 'Terminal' ? {...app, isMinimized: true} : app
                ));
            } else {
                bringToFront(terminalApp.id);
            }
        }
    };

    const handleFlappyBirdClick = () => {
        if(!openApps.some(app => app.name === 'FlappyBird')) {
            const newAppId = Date.now();
            const newApp = {
                id: newAppId,
                name: 'FlappyBird',
                component: null,
                isMinimized: false,
                isMaxSize: false
            }
            setOpenApps([...openApps, newApp]);
            bringToFront(newAppId);
        } else if(openApps.some(app => app.name === 'FlappyBird' && app.isMinimized)) {
            const flappyBirdApp = openApps.find(app => app.name === 'FlappyBird');
            setOpenApps(prev => prev.map(app => 
                app.name === 'FlappyBird' ? { ...app, isMinimized: false } : app
            ));
            bringToFront(flappyBirdApp.id);
        } else {
            const FlappyBirdApp = openApps.find(app => app.name === 'FlappyBird');
            if (focusedAppId === FlappyBirdApp.id) {
                setOpenApps(prev => prev.map(app => 
                    app.name === 'FlappyBird' ? {...app, isMinimized: true} : app
                ));
            } else {
                bringToFront(FlappyBirdApp.id);
            }
        }
    };

    const handleChessBirdClick = () => {
        if(!openApps.some(app => app.name === 'ChessBird')) {
            const newAppId = Date.now();
            const newApp = {
                id: newAppId,
                name: 'ChessBird',
                component: null,
                isMinimized: false,
                isMaxSize: false
            }
            setOpenApps([...openApps, newApp]);
            bringToFront(newAppId);
        } else if(openApps.some(app => app.name === 'ChessBird' && app.isMinimized)) {
            const ChessBirdApp = openApps.find(app => app.name === 'ChessBird');
            setOpenApps(prev => prev.map(app => 
                app.name === 'ChessBird' ? { ...app, isMinimized: false } : app
            ));
            bringToFront(ChessBirdApp.id);
        } else {
            const ChessBirdApp = openApps.find(app => app.name === 'ChessBird');
            if (focusedAppId === ChessBirdApp.id) {
                setOpenApps(prev => prev.map(app => 
                    app.name === 'ChessBird' ? {...app, isMinimized: true} : app
                ));
            } else {
                bringToFront(ChessBirdApp.id);
            }
        }
    };


    const isAppActive = (appName) => {
        const app = openApps.find(app => app.name === appName);
        return app && focusedAppId === app.id && !app.isMinimized;
    };

    const isAppOpen = (appName) => {
        return openApps.some(app => app.name === appName);
    };

    return (
        <div className="fixed flex bottom-0 w-full bg-black/50 backdrop-blur-2xl border-t z-[100000] max-h-[60px]
        border-white/10 shadow-[0_-2px_16px_0_rgba(0,0,0,0.25)] text-white pr-3 pl-3 pt-1 pb-1 justify-between">
            <div className='flex items-center hover:bg-white/5 rounded-lg p-1.5 cursor-pointer'>
                <div className='w-full h-full hover:scale-110 flex items-center justify-center'>
                    <svg width="34" height="34" viewBox="0 0 16 16" className="text-white/80 group-hover:text-white 
                    transition-colors duration-300">
                        <path
                            d="M2 2h5v5H2V2zm7 0h5v5H9V2zM2 9h5v5H2V9zm7 0h5v5H9V9z"
                            fill="currentColor"
                            className="group-hover:scale-110 transition-transform duration-300"
                        />
                    </svg>
                </div>
            </div>
            <div className='flex flex-row items-center space-x-2'>
                <div className={`rounded-lg p-2 cursor-pointer relative transition-all duration-200 ${
                    isAppActive('Google') 
                        ? 'bg-white/20 border border-white/30' 
                        : 'hover:bg-white/5'
                }`}>
                    <div className='hover:scale-110 transition-transform duration-300'>
                        <svg width="34" height="34" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"  onClick={handleGoogleClick}>
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                    </div>
                    {isAppOpen('Google') && (
                        <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-full mb-1 transition-all duration-200 ${
                            isAppActive('Google') ? 'bg-blue-400' : 'bg-white   '
                        }`}></div>
                    )}
                </div>
                
                <div className={`rounded-lg p-2 cursor-pointer relative transition-all duration-200 ${
                    isAppActive('Terminal') 
                        ? 'bg-white/20 border border-white/30' 
                        : 'hover:bg-white/5'
                }`}>
                    <div className='hover:scale-110 transition-transform duration-300'>
                        <div className={`flex items-center p-3 rounded-lg w-fit cursor-pointer ring-1 transition-all duration-200 ${
                            isAppActive('Terminal') 
                                ? 'bg-zinc-700 ring-white/60' 
                                : 'bg-zinc-800 ring-white/40'
                        }`} onClick={handleTerminalClick}>
                            <Terminal size={12} color="white"/>
                        </div>
                    </div>
                    {isAppOpen('Terminal') && (
                        <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-full mb-1 transition-all duration-200 ${
                            isAppActive('Terminal') ? 'bg-blue-400' : 'bg-white'
                        }`}></div>
                    )}
                </div>

                {openApps.some(app => app.name === 'FlappyBird') && ( 
                    <div className={`rounded-lg p-2 cursor-pointer relative transition-all duration-200 ${
                        isAppActive('FlappyBird') 
                            ? 'bg-white/20 border border-white/30' 
                            : 'hover:bg-white/5'
                    }`}>
                        <div className='hover:scale-110 transition-transform duration-300'>
                            <div className={`flex items-center p-1 rounded-lg w-fit cursor-pointer transition-all duration-200`} 
                            onClick={handleFlappyBirdClick}>
                                <img src={red} width="28" height="28" className="scale-[140%]" />
                            </div>
                        </div>
                        {isAppOpen('FlappyBird') && (
                            <div className={`absolute -bottom-1 transform translate-x-1/4 w-6 h-0.5 rounded-full mb-1 transition-all duration-200 ${
                                isAppActive('FlappyBird') ? 'bg-blue-400' : 'bg-white'
                            }`}></div>
                        )}
                    </div>
                )}

                {openApps.some(app => app.name === 'ChessBird') && ( 
                    <div className={`rounded-lg p-2 cursor-pointer relative transition-all duration-200 ${
                        isAppActive('ChessBird') 
                            ? 'bg-white/20 border border-white/30' 
                            : 'hover:bg-white/5'
                    }`}>
                        <div className='hover:scale-110 transition-transform duration-300'>
                            <div className={`flex items-center p-1 rounded-lg w-fit cursor-pointer transition-all duration-200`} 
                            onClick={handleChessBirdClick}>
                                <img src={chess} width="28" height="28" className="scale-[140%]" />
                            </div>
                        </div>
                        {isAppOpen('ChessBird') && (
                            <div className={`absolute -bottom-1 transform translate-x-1/4 w-6 h-0.5 rounded-full mb-1 transition-all duration-200 ${
                                isAppActive('ChessBird') ? 'bg-blue-400' : 'bg-white'
                            }`}></div>
                        )}
                    </div>
                )}
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
                    <div className="absolute bottom-full right-0 mb-2 mr-2 backdrop-blur-xl border border-white/20 rounded-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] p-4 min-w-[320px] max-h-[400px] z-50 overflow-hidden">
                        <div className="absolute top-full right-8 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-gray-900/95"></div>
                        
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-medium text-white">Quick Settings</h3>
                                <button className="text-xs text-gray-400 hover:text-white">All settings</button>
                            </div>
                            
                            <div className="grid grid-cols-4 gap-2 mb-4">
                                <button className="flex flex-col items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200">
                                    <Volume2 size={20} className="mb-1" />
                                    <span className="text-xs">Sound</span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-medium text-white">Active applications</h3>
                                <button className="text-xs text-gray-400 hover:text-white">Close all</button>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors duration-200">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                            <span className="text-xs font-bold">VS</span>
                                        </div>
                                        <div className="flex">
                                            <div className="text-sm font-medium text-white">Visual Studio Code</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors duration-200">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                            <span className="text-xs font-bold">SP</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-white">Spotify</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default Taskbar;