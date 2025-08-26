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
        console.log('test');
        bringToFront(appId);
    };

    const openTerminal = () => {
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
            setOpenApps(prev => prev.map(app => 
                app.name === 'Terminal' ? {...app, isMinimized: !app.isMinimized} : app
            ));
        }
    };

    const openFlappyBird = () => {
        if(!openApps.some(app => app.name === 'FlappyBird')) {
            const newAppId = Date.now();
            const newApp = {
                id: newAppId,
                name: 'FlappyBird',
                component: null, 
                isMinimized: false,
                isMaxSize: true
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
            setOpenApps(prev => prev.map(app => 
                app.name === 'FlappyBird' ? {...app, isMinimized: !app.isMinimized} : app
            ));
        }
    };

    const openChessBird = () => {
        if(!openApps.some(app => app.name === 'ChessBird')) {
            const newAppId = Date.now();
            const newApp = {
                id: newAppId,
                name: 'ChessBird',
                component: null, 
                isMinimized: false,
                isMaxSize: true
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
            setOpenApps(prev => prev.map(app => 
                app.name === 'ChessBird' ? {...app, isMinimized: !app.isMinimized} : app
            ));
        }
    };

    const openCfr = () => {
        if(!openApps.some(app => app.name === 'CfrApp')) {
            const newAppId = Date.now();
            const newApp = {
                id: newAppId,
                name: 'CfrApp',
                component: null, 
                isMinimized: false,
                isMaxSize: true
            }
            setOpenApps([...openApps, newApp]);
            bringToFront(newAppId);
        } else if(openApps.some(app => app.name === 'CfrApp' && app.isMinimized)) {
            const CfrApp = openApps.find(app => app.name === 'CfrApp');
            setOpenApps(prev => prev.map(app => 
                app.name === 'CfrApp' ? { ...app, isMinimized: false } : app
            ));
            bringToFront(CfrApp.id);
        } else {
            setOpenApps(prev => prev.map(app => 
                app.name === 'CfrApp' ? {...app, isMinimized: !app.isMinimized} : app
            ));
        }
    };

    const openMeowFeeder = () => {
        if(!openApps.some(app => app.name === 'MeowFeeder')) {
            const newAppId = Date.now();
            const newApp = {
                id: newAppId,
                name: 'MeowFeeder',
                component: null, 
                isMinimized: false,
                isMaxSize: true
            }
            setOpenApps([...openApps, newApp]);
            bringToFront(newAppId);
        } else if(openApps.some(app => app.name === 'MeowFeeder' && app.isMinimized)) {
            const MeowFeeder = openApps.find(app => app.name === 'MeowFeeder');
            setOpenApps(prev => prev.map(app => 
                app.name === 'MeowFeeder' ? { ...app, isMinimized: false } : app
            ));
            bringToFront(MeowFeeder.id);
        } else {
            setOpenApps(prev => prev.map(app => 
                app.name === 'MeowFeeder' ? {...app, isMinimized: !app.isMinimized} : app
            ));
        }
    };

    const openGeoExplorer = () => {
        if(!openApps.some(app => app.name === 'GeoExplorer')) {
            const newAppId = Date.now();
            const newApp = {
                id: newAppId,
                name: 'GeoExplorer',
                component: null, 
                isMinimized: false,
                isMaxSize: true
            }
            setOpenApps([...openApps, newApp]);
            bringToFront(newAppId);
        } else if(openApps.some(app => app.name === 'GeoExplorer' && app.isMinimized)) {
            const GeoExplorer = openApps.find(app => app.name === 'GeoExplorer');
            setOpenApps(prev => prev.map(app => 
                app.name === 'GeoExplorer' ? { ...app, isMinimized: false } : app
            ));
            bringToFront(GeoExplorer.id);
        } else {
            setOpenApps(prev => prev.map(app => 
                app.name === 'GeoExplorer' ? {...app, isMinimized: !app.isMinimized} : app
            ));
        }
    };

    const openMyVendingMachine = () => {
        if(!openApps.some(app => app.name === 'MyVendingMachine')) {
            const newAppId = Date.now();
            const newApp = {
                id: newAppId,
                name: 'MyVendingMachine',
                component: null, 
                isMinimized: false,
                isMaxSize: true
            }
            setOpenApps([...openApps, newApp]);
            bringToFront(newAppId);
        } else if(openApps.some(app => app.name === 'MyVendingMachine' && app.isMinimized)) {
            const MyVendingMachine = openApps.find(app => app.name === 'MyVendingMachine');
            setOpenApps(prev => prev.map(app => 
                app.name === 'MyVendingMachine' ? { ...app, isMinimized: false } : app
            ));
            bringToFront(MyVendingMachine.id);
        } else {
            setOpenApps(prev => prev.map(app => 
                app.name === 'MyVendingMachine' ? {...app, isMinimized: !app.isMinimized} : app
            ));
        }
    };
    
    return (
        <div>
            <div className="p-3 flex gap-4 flex-wrap">
                <div className="flex items-center p-3 rounded-lg bg-zinc-800 w-fit cursor-pointer
                ring-1 ring-white/40 hover:bg-white/10 transition-all duration-200"
                onClick={openTerminal}>
                    <Terminal size={28} color="white"/>
                </div>

                <div className="flex items-center p-3 rounded-lg w-fit cursor-pointer hover:bg-white/10 transition-all duration-200"
                onClick={openFlappyBird}>
                    <img src={red} width="28" height="28" className="scale-150"/>
                </div>

                <div className="flex items-center p-3 rounded-lg w-fit cursor-pointer hover:bg-white/10 transition-all duration-200"
                onClick={openChessBird}>
                    <img src={chess} width="28" height="28" className="scale-150"/>
                </div>

                <div className="flex items-center p-3 rounded-lg w-fit cursor-pointer hover:bg-white/10 transition-all duration-200"
                onClick={openCfr}>
                    <img src={cfr} width="22" height="22" className="scale-150"/>
                </div>

                <div className="flex items-center py-1 px-2 rounded-lg w-fit cursor-pointer hover:bg-white/10 transition-all duration-200"
                onClick={openMeowFeeder}>
                    <div className="w-10 h-10 rounded-lg bg-pink-300 flex items-center justify-center">
                        <span className="text-white font-bold text-sm p-0">MF</span>
                    </div>
                </div>

                <div className="flex items-center py-1 px-2 rounded-lg w-fit cursor-pointer hover:bg-white/10 transition-all duration-200"
                onClick={openGeoExplorer}>
                    <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-lg border border-[#5F5FDF] scale-110">
                        <Globe2 className="text-xl text-[#5F5FDF]" />
                    </div>
                </div>

                <div className="flex items-center p-3 rounded-lg w-fit cursor-pointer hover:bg-white/10 transition-all duration-200"
                onClick={openMyVendingMachine}>
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
                        <div 
                            className={`flex absolute left-[50%] -translate-x-1/2 ${app.isMaxSize ? 'top-0 w-[100vw] h-[calc(100vh-58px)]' : 'top-5'}`}
                            key={app.id} 
                            style={{ 
                                display: app.isMinimized ? 'none' : 'block',
                                zIndex: getAppZIndex(app.id)
                            }}
                            onClick={() => handleAppClick(app.id)}
                        >
                            {updatedComponent}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
 
export default Main;