import { Terminal } from "lucide-react";
import TerminalApp from "../components/Apps/TerminalApp";
import GoogleApp from "../components/Apps/GoogleApp";
import FlappyBirdApp from "../components/Apps/FlappyBirdApp";
import red from '../assets/Red.png';

const Main = ({apps, openApps, setOpenApps, bringToFront, getAppZIndex}) => {
    const handleAppClick = (appId) => {
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
    
    return (
        <div>
            <div className="p-3 flex gap-4">
                <div className="flex items-center p-3 rounded-lg bg-zinc-800 w-fit cursor-pointer
                ring-1 ring-white/40 hover:bg-white/10 transition-all duration-200"
                onClick={openTerminal}>
                    <Terminal size={28} color="white"/>
                </div>

                <div className="flex items-center p-3 rounded-lg w-fit cursor-pointer hover:bg-white/10 transition-all duration-200"
                onClick={openFlappyBird}>
                    <img src={red} width="28" height="28" className="scale-150"/>
                </div>
            </div>
            <div>
                {/* {openApps.some(app => app.name === 'Terminal') && <TerminalApp setOpenApps={setOpenApps}/>} */}
                {openApps.map(app => {
                    let updatedComponent = app.component;
                    if (app.name === 'Terminal') {
                        updatedComponent = <TerminalApp setOpenApps={setOpenApps} bringToFront={bringToFront} appId={app.id} openApps={openApps} />;
                    } else if (app.name === 'Google') {
                        updatedComponent = <GoogleApp setOpenApps={setOpenApps} bringToFront={bringToFront} appId={app.id} openApps={openApps} />;
                    } else if (app.name === "FlappyBird"){
                        updatedComponent = <FlappyBirdApp setOpenApps={setOpenApps} bringToFront={bringToFront} appId={app.id} openApps={openApps} />;
                    }
                    
                    return (
                        <div 
                            className={`flex absolute left-[50%] -translate-x-1/2 ${app.isMaxSize ? 'top-0' : 'top-5'}`}
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