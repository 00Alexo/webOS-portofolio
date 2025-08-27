import { Globe, Globe2, Terminal } from "lucide-react";
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
    
    return (
        <div>
            <div className="p-3 flex gap-4 flex-wrap">
                <div className="flex items-center p-3 rounded-lg bg-zinc-800 w-fit cursor-pointer
                ring-1 ring-white/40 hover:bg-white/10 transition-all duration-200"
                onClick={() => openApp('Terminal')}>
                    <Terminal size={28} color="white"/>
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