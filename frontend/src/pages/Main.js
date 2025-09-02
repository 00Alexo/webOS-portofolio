import { BadgeHelp, Globe2, Terminal } from "lucide-react";
import TerminalApp from "../components/Apps/TerminalApp";
import GoogleApp from "../components/Apps/GoogleApp";
import ChessBirdApp from "../components/Apps/ChessBirdApp";
import FlappyBirdApp from "../components/Apps/FlappyBirdApp";
import MeowFeederApp from "../components/Apps/MeowFeederApp";
import GeoExplorerApp from "../components/Apps/GeoExplorerApp";
import MyVendingMachineApp from "../components/Apps/MyVendingMachineApp";
import CfrApp from "../components/Apps/CfrApp";
import red from '../assets/Red.png';
import chess from '../assets/chess.png';
import cfr from '../assets/cfr.png';
import vending from '../assets/vending.png';
import HelpApp from "../components/Apps/HelpApp";
import FileExplorerApp from "../components/Apps/FileExplorerApp";

const Main = ({apps, openApps, setOpenApps, bringToFront, getAppZIndex, focusedAppId}) => {
    const handleAppClick = (appId) => {
        bringToFront(appId);
    };

    const openApp = (appName) =>{
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

            if(appName === "Terminal" || appName === "Google" || appName === "Help" || appName === "FileExplorer")
                newApp.isMaxSize = false;

            if(appName === "Terminal" || appName === "Help" || appName === "FileExplorer") {
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
    
    return (
        <div>
            <div className="grid grid-cols-3 w-fit gap-5 p-3">
                <div className="flex items-center p-3 rounded-lg bg-zinc-800 w-fit cursor-pointer
                ring-1 ring-white/40 hover:bg-white/10 transition-all duration-200"
                onClick={() => openApp('Terminal')}>
                    <Terminal size={28} color="white"/>
                </div>

                <div className="flex items-center p-2.5 rounded-lg w-fit bg-white border-2 border-black cursor-pointer
                hover:bg-gray-400 hover:border-gray-800 transition-all duration-200"  onClick={() => openApp('Help')}>
                    <BadgeHelp size={28} color="black"/>
                </div>

                <div className="flex items-center p-2 rounded-lg w-fit cursor-pointer hover:bg-white/10 transition-all duration-200"
                onClick={() => openApp('FileExplorer')}>
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


                <div className="flex items-center p-3 rounded-lg w-fit cursor-pointer hover:bg-white/10 transition-all duration-200"
                onClick={() => openApp('FlappyBird')}>
                    <img src={red} width="28" height="28" className="scale-150"/>
                </div>

                <div className="flex items-center p-3 rounded-lg w-fit cursor-pointer hover:bg-white/10 transition-all duration-200"
                onClick={() => openApp('ChessBird')}>
                    <img src={chess} width="28" height="28" className="scale-150"/>
                </div>

                <div className="flex items-center p-3 rounded-lg w-fit cursor-pointer hover:bg-white/10 transition-all duration-200"
                onClick={() => openApp('CfrApp')}>
                    <img src={cfr} width="22" height="22" className="scale-150"/>
                </div>

                <div className="flex items-center py-1 px-2 rounded-lg w-fit cursor-pointer hover:bg-white/10 transition-all duration-200"
                onClick={() => openApp('MeowFeeder')}>
                    <div className="w-10 h-10 rounded-lg bg-pink-300 flex items-center justify-center">
                        <span className="text-white font-bold text-sm p-0">MF</span>
                    </div>
                </div>

                <div className="flex items-center py-1 px-2 rounded-lg w-fit cursor-pointer hover:bg-white/10 transition-all duration-200"
                onClick={() => openApp('GeoExplorer')}>
                    <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-lg border border-[#5F5FDF] scale-110">
                        <Globe2 className="text-xl text-[#5F5FDF]" />
                    </div>
                </div>

                <div className="flex items-center p-3 rounded-lg w-fit cursor-pointer hover:bg-white/10 transition-all duration-200"
                onClick={() => openApp('MyVendingMachine')}>
                    <img src={vending} width="28" height="28" className="scale-150"/>
                </div>
            </div>
            <div>
                {openApps.map(app => {
                    let updatedComponent = app.component;
                    if (app.name === 'Terminal') {
                        updatedComponent = <TerminalApp setOpenApps={setOpenApps} bringToFront={bringToFront} appId={app.id} openApps={openApps} focusedAppId={focusedAppId}/>;
                    } else if (app.name === 'Google') {
                        updatedComponent = <GoogleApp setOpenApps={setOpenApps} bringToFront={bringToFront} appId={app.id} openApps={openApps} focusedAppId={focusedAppId}/>;
                    } else if (app.name === "FlappyBird"){
                        updatedComponent = <FlappyBirdApp setOpenApps={setOpenApps} bringToFront={bringToFront} appId={app.id} openApps={openApps} focusedAppId={focusedAppId}/>;
                    } else if (app.name === "ChessBird"){
                        updatedComponent = <ChessBirdApp setOpenApps={setOpenApps} bringToFront={bringToFront} appId={app.id} openApps={openApps} focusedAppId={focusedAppId}/>;
                    } else if (app.name === "CfrApp"){
                        updatedComponent = <CfrApp setOpenApps={setOpenApps} bringToFront={bringToFront} appId={app.id} openApps={openApps} focusedAppId={focusedAppId}/>;
                    } else if (app.name === "MeowFeeder"){
                        updatedComponent = <MeowFeederApp setOpenApps={setOpenApps} bringToFront={bringToFront} appId={app.id} openApps={openApps} focusedAppId={focusedAppId} />;
                    } else if (app.name === "GeoExplorer"){
                        updatedComponent = <GeoExplorerApp setOpenApps={setOpenApps} bringToFront={bringToFront} appId={app.id} openApps={openApps} focusedAppId={focusedAppId} />;
                    } else if (app.name === "MyVendingMachine"){
                        updatedComponent = <MyVendingMachineApp setOpenApps={setOpenApps} bringToFront={bringToFront} appId={app.id} openApps={openApps} focusedAppId={focusedAppId} />;
                    } else if (app.name === "Help"){
                        updatedComponent = <HelpApp setOpenApps={setOpenApps} bringToFront={bringToFront} appId={app.id} openApps={openApps} focusedAppId={focusedAppId} />;
                    } else if (app.name === "FileExplorer"){
                        updatedComponent = <FileExplorerApp setOpenApps={setOpenApps} bringToFront={bringToFront} appId={app.id} openApps={openApps} focusedAppId={focusedAppId} />;
                    }
                    
                    return (
                        <div key={app.id}>
                            <div 
                                className={`
                                    flex absolute left-[50%] -translate-x-1/2 
                                    ${app.isLoading ? 'hidden' : ''}
                                    ${openApps.some(openApp => openApp.id === app.id) ? ' ' : 'hidden'}
                                    ${app.isMaxSize ? 'top-0 w-[100vw] h-[calc(100vh-58px)]' : 'top-5'}
                                `}
                                style={{ 
                                    display: app.isMinimized ? 'none' : '',
                                    zIndex: getAppZIndex(app.id)
                                }}
                                onClick={() => handleAppClick(app.id)}
                            >
                                {updatedComponent}
                            </div>
                            <div 
                                className={`
                                    absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-3/4 
                                    text-white flex flex-col items-center justify-center
                                    bg-gradient-to-br from-[#1e2936] to-[#0f1419] 
                                    p-6 rounded-xl border border-white/10
                                    shadow-2xl shadow-black/50 backdrop-blur-sm
                                    min-w-[200px] min-h-[150px]
                                    ${app.isLoading ? ' ' : 'hidden'}
                                `}
                                style={{ 
                                    display: app.isMinimized ? 'none' : ' ',
                                    zIndex: getAppZIndex(app.id)
                                }}
                                onClick={() => bringToFront(app.id)}
                            >
                                <div className="mb-4 animate-pulse">
                                    {app.name === 'FlappyBird' ?
                                    <img src={red} width="64" height="64" className="drop-shadow-lg"/>
                                    : app.name === 'ChessBird' ?
                                    <img src={chess} width="64" height="64" className="drop-shadow-lg"/>
                                    : app.name === 'CfrApp' ?
                                    <img src={cfr} width="64" height="64" className="drop-shadow-lg"/>
                                    : app.name === 'MeowFeeder' ?
                                    <div className="w-16 h-16 rounded-lg bg-pink-300 flex items-center justify-center">
                                        <span className="text-white font-bold text-sm p-0">MF</span>
                                    </div>
                                    : app.name === 'GeoExplorer' ?
                                    <div className="h-16 w-16 bg-white rounded-xl flex items-center justify-center shadow-lg border border-[#5F5FDF]">
                                        <Globe2 className="text-xl text-[#5F5FDF]" />
                                    </div>
                                    : app.name === 'MyVendingMachine' ? 
                                    <img src={vending} width="64" height="64"/>
                                    : app.name === 'Google' ?
                                    <svg width="64" height="64" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                    </svg>
                                    : null
                                    }
                                </div>
                                <p className="text-lg font-medium text-white/90 mb-2">Loading App...</p>
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
 
export default Main;