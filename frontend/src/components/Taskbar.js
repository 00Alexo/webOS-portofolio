import { useState, useEffect } from 'react';
import {ChevronDown, ChevronUp, Terminal, Globe2, BadgeHelp} from 'lucide-react';
import red from '../assets/Red.png';
import chess from '../assets/chess.png';
import cfr from '../assets/cfr.png';
import vending from '../assets/vending.png';
import QuickSettings from './QuickSettings';
import WinBar from './WinBar';

const Taskbar = ({ openApps, setOpenApps, apps, bringToFront, focusedAppId, volume, setVolume, brightness, setBrightness, isWinBarOpen, setIsWinBarOpen }) => {
    const [time, setTime] = useState(new Date());
    const [isArrowOpen, setIsArrowOpen] = useState(false);

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

            if(appName === "Terminal" || appName === "Google" || appName === "Help" || appName === "FileExplorer" || appName === "Calculator")
                newApp.isMaxSize = false;

            if(appName === "Terminal" || appName === "FileExplorer" || appName === "Help" || appName === "Calculator") {
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
                    <WinBar/>
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
                                        ) : app.name === 'FileExplorer' ? (
                                            <div className={`flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer transition-all duration-200 }`}>
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    xmlnsXlink="http://www.w3.org/1999/xlink" 
                                                    width={28} 
                                                    height={28}
                                                    viewBox="0 0 252 252" 
                                                    version="1.1"
                                                >
                                                <defs>
                                                    <linearGradient id="linear0" gradientUnits="userSpaceOnUse" x1="6" y1="2" x2="6" y2="8.5" gradientTransform="matrix(10.5,0,0,10.5,0,0)">
                                                    <stop offset="0" style={{stopColor:"rgb(0%,0%,0%)", stopOpacity:0}}/>
                                                    <stop offset="1" style={{stopColor:"rgb(0%,0%,0%)", stopOpacity:0.101961}}/>
                                                    </linearGradient>
                                                    <linearGradient id="linear1" gradientUnits="userSpaceOnUse" x1="10" y1="14" x2="16.5" y2="20.5" gradientTransform="matrix(10.5,0,0,10.5,0,0)">
                                                    <stop offset="0" style={{stopColor:"rgb(0%,0%,0%)", stopOpacity:0.101961}}/>
                                                    <stop offset="1" style={{stopColor:"rgb(0%,0%,0%)", stopOpacity:0}}/>
                                                    </linearGradient>
                                                    <linearGradient id="linear2" gradientUnits="userSpaceOnUse" x1="17.641174" y1="14.441162" x2="23.80711" y2="20.607098" gradientTransform="matrix(10.5,0,0,10.5,0,0)">
                                                    <stop offset="0" style={{stopColor:"rgb(0%,0%,0%)", stopOpacity:0.101961}}/>
                                                    <stop offset="1" style={{stopColor:"rgb(0%,0%,0%)", stopOpacity:0}}/>
                                                    </linearGradient>
                                                    <linearGradient id="linear3" gradientUnits="userSpaceOnUse" x1="-1.580572" y1="6.16727" x2="24.814522" y2="18.475504" gradientTransform="matrix(10.5,0,0,10.5,0,0)">
                                                    <stop offset="0" style={{stopColor:"rgb(100%,100%,100%)", stopOpacity:0.2}}/>
                                                    <stop offset="1" style={{stopColor:"rgb(100%,100%,100%)", stopOpacity:0}}/>
                                                    </linearGradient>
                                                </defs>
                                                <g id="surface1">
                                                    {/* Folder tab */}
                                                    <path 
                                                    style={{stroke:"none", fillRule:"nonzero", fill:"rgb(100%,89.803922%,36.862745%)", fillOpacity:1}} 
                                                    d="M 126 89.25 L 0 89.25 L 0 31.5 C 0 25.699219 4.699219 21 10.5 21 L 99.75 21 L 126 42 Z M 126 89.25 "
                                                    />
                                                    <path 
                                                    style={{stroke:"none", fillRule:"nonzero", fill:"url(#linear0)"}} 
                                                    d="M 126 89.25 L 0 89.25 L 0 31.5 C 0 25.699219 4.699219 21 10.5 21 L 99.75 21 L 126 42 Z M 126 89.25 "
                                                    />
                                                    <path 
                                                    style={{stroke:"none", fillRule:"nonzero", fill:"rgb(100%,100%,100%)", fillOpacity:0.2}} 
                                                    d="M 99.75 21 L 10.5 21 C 4.699219 21 0 25.699219 0 31.5 L 0 34.125 C 0 28.324219 4.699219 23.625 10.5 23.625 L 99.75 23.625 L 126 44.625 L 126 42 Z M 99.75 21 "
                                                    />
                                                    
                                                    {/* Main folder body */}
                                                    <path 
                                                    style={{stroke:"none", fillRule:"nonzero", fill:"rgb(100%,86.666667%,33.333333%)", fillOpacity:1}} 
                                                    d="M 241.5 42 L 126 42 L 99.75 63 L 10.5 63 C 4.699219 63 0 67.699219 0 73.5 L 0 210 C 0 215.800781 4.699219 220.5 10.5 220.5 L 241.5 220.5 C 247.300781 220.5 252 215.800781 252 210 L 252 52.5 C 252 46.699219 247.300781 42 241.5 42 Z M 241.5 42 "
                                                    />
                                                    <path 
                                                    style={{stroke:"none", fillRule:"nonzero", fill:"rgb(0%,0%,0%)", fillOpacity:0.101961}} 
                                                    d="M 241.5 217.875 L 10.5 217.875 C 4.699219 217.875 0 213.171875 0 207.375 L 0 210 C 0 215.796875 4.699219 220.5 10.5 220.5 L 241.5 220.5 C 247.300781 220.5 252 215.796875 252 210 L 252 207.375 C 252 213.171875 247.300781 217.875 241.5 217.875 Z M 241.5 217.875 "
                                                    />
                                                    
                                                    {/* House icon */}
                                                    <path 
                                                    style={{stroke:"none", fillRule:"nonzero", fill:"rgb(8.235294%,74.509804%,94.117647%)", fillOpacity:1}} 
                                                    d="M 199.5 126 L 52.5 126 C 46.699219 126 42 130.699219 42 136.5 L 42 225.75 C 42 228.648438 44.351562 231 47.25 231 L 78.75 231 C 81.648438 231 84 228.648438 84 225.75 L 84 168 L 168 168 L 168 225.75 C 168 228.648438 170.351562 231 173.25 231 L 204.75 231 C 207.648438 231 210 228.648438 210 225.75 L 210 136.5 C 210 130.699219 205.300781 126 199.5 126 Z M 199.5 126 "
                                                    />
                                                    
                                                    {/* Highlight effects */}
                                                    <path 
                                                    style={{stroke:"none", fillRule:"nonzero", fill:"rgb(100%,100%,100%)", fillOpacity:0.2}} 
                                                    d="M 241.5 42 L 126 42 L 99.75 63 L 10.5 63 C 4.699219 63 0 67.699219 0 73.5 L 0 76.125 C 0 70.324219 4.699219 65.625 10.5 65.625 L 99.75 65.625 L 126 44.625 L 241.5 44.625 C 247.300781 44.625 252 49.324219 252 55.125 L 252 52.5 C 252 46.699219 247.300781 42 241.5 42 Z M 241.5 42 "
                                                    />
                                                    <path 
                                                    style={{stroke:"none", fillRule:"nonzero", fill:"rgb(100%,100%,100%)", fillOpacity:0.2}} 
                                                    d="M 199.5 126 L 52.5 126 C 46.699219 126 42 130.699219 42 136.5 L 42 139.125 C 42 133.324219 46.699219 128.625 52.5 128.625 L 199.5 128.625 C 205.300781 128.625 210 133.324219 210 139.125 L 210 136.5 C 210 130.699219 205.300781 126 199.5 126 Z M 199.5 126 "
                                                    />
                                                    
                                                    {/* Shadow effects */}
                                                    <path 
                                                    style={{stroke:"none", fillRule:"nonzero", fill:"rgb(0%,0%,0%)", fillOpacity:0.101961}} 
                                                    d="M 204.75 228.375 L 173.25 228.375 C 170.351562 228.375 168 226.023438 168 223.125 L 168 225.75 C 168 228.648438 170.351562 231 173.25 231 L 204.75 231 C 207.648438 231 210 228.648438 210 225.75 L 210 223.125 C 210 226.023438 207.648438 228.375 204.75 228.375 Z M 204.75 228.375 "
                                                    />
                                                    <path 
                                                    style={{stroke:"none", fillRule:"nonzero", fill:"rgb(0%,0%,0%)", fillOpacity:0.101961}} 
                                                    d="M 78.75 228.375 L 47.25 228.375 C 44.351562 228.375 42 226.023438 42 223.125 L 42 225.75 C 42 228.648438 44.351562 231 47.25 231 L 78.75 231 C 81.648438 231 84 228.648438 84 225.75 L 84 223.125 C 84 226.023438 81.648438 228.375 78.75 228.375 Z M 78.75 228.375 "
                                                    />
                                                    <path 
                                                    style={{stroke:"none", fillRule:"nonzero", fill:"rgb(0%,0%,0%)", fillOpacity:0.101961}} 
                                                    d="M 84 165.375 L 168 165.375 L 168 168 L 84 168 Z M 84 165.375 "
                                                    />
                                                    
                                                    {/* Tab label area */}
                                                    <path 
                                                    style={{stroke:"none", fillRule:"nonzero", fill:"rgb(100%,100%,100%)", fillOpacity:1}} 
                                                    d="M 21 36.75 L 94.5 36.75 L 94.5 47.25 L 21 47.25 Z M 21 36.75 "
                                                    />
                                                    <path 
                                                    style={{stroke:"none", fillRule:"nonzero", fill:"rgb(50.980392%,76.470588%,25.490196%)", fillOpacity:1}} 
                                                    d="M 21 36.75 L 36.75 36.75 L 36.75 47.25 L 21 47.25 Z M 21 36.75 "
                                                    />
                                                    
                                                    {/* Additional gradient overlays */}
                                                    <path 
                                                    style={{stroke:"none", fillRule:"nonzero", fill:"url(#linear1)"}} 
                                                    d="M 84 168 L 136.5 220.5 L 168 220.5 L 168 168 "
                                                    />
                                                    <path 
                                                    style={{stroke:"none", fillRule:"nonzero", fill:"url(#linear2)"}} 
                                                    d="M 207.28125 129.582031 L 207.28125 129.601562 C 208.921875 131.453125 210 133.828125 210 136.5 L 210 220.5 L 241.5 220.5 C 247.300781 220.5 252 215.796875 252 210 L 252 174.300781 Z M 207.28125 129.582031 "
                                                    />
                                                    <path 
                                                    style={{stroke:"none", fillRule:"nonzero", fill:"url(#linear3)"}} 
                                                    d="M 241.5 42 L 126 42 L 99.75 21 L 10.5 21 C 4.699219 21 0 25.699219 0 31.5 L 0 210 C 0 215.796875 4.699219 220.5 10.5 220.5 L 42 220.5 L 42 225.75 C 42 228.648438 44.351562 231 47.25 231 L 78.75 231 C 81.648438 231 84 228.648438 84 225.75 L 84 220.5 L 168 220.5 L 168 225.75 C 168 228.648438 170.351562 231 173.25 231 L 204.75 231 C 207.648438 231 210 228.648438 210 225.75 L 210 220.5 L 241.5 220.5 C 247.300781 220.5 252 215.796875 252 210 L 252 52.5 C 252 46.699219 247.300781 42 241.5 42 Z M 241.5 42 "
                                                    />
                                                </g>
                                                </svg>
                                            </div>
                                        ) : app.name === 'Help' ? (
                                        <div className={`flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer ring-1 transition-all duration-200 ${
                                            isAppActive('Help') 
                                                ? 'bg-gray-100 ring-white/60' 
                                                : 'bg-white ring-white/40'
                                        }`}>
                                            <BadgeHelp size={20} color="black"/>
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
                                        ) : app.name === 'Calculator' ? (
                                            <div className="w-8 h-8 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                                                    <path fill="#cfd8dc" d="M42,37c0,2.762-2.238,5-5,5H11c-2.762,0-5-2.238-5-5V11c0-2.762,2.238-5,5-5h26c2.762,0,5,2.238,5,5	V37z"></path><path fill="#1f212b" d="M32,38H16c-1.105,0-2-0.895-2-2V12c0-1.105,0.895-2,2-2h16c1.105,0,2,0.895,2,2v24	C34,37.105,33.105,38,32,38z"></path><path fill="#757575" d="M30,18H18c-0.552,0-1-0.448-1-1v-4c0-0.552,0.448-1,1-1h12c0.552,0,1,0.448,1,1v4	C31,17.552,30.552,18,30,18z"></path><circle cx="18" cy="22" r="2" fill="#e0e0e0"></circle><circle cx="24" cy="22" r="2" fill="#e0e0e0"></circle><circle cx="30" cy="22" r="2" fill="#ffab40"></circle><circle cx="18" cy="28" r="2" fill="#e0e0e0"></circle><circle cx="24" cy="28" r="2" fill="#e0e0e0"></circle><circle cx="30" cy="28" r="2" fill="#ffab40"></circle><circle cx="30" cy="34" r="2" fill="#ffab40"></circle><path fill="#e0e0e0" d="M24,36h-6c-1.105,0-2-0.895-2-2v0c0-1.105,0.895-2,2-2h6c1.105,0,2,0.895,2,2v0	C26,35.105,25.105,36,24,36z"></path>
                                                </svg>
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