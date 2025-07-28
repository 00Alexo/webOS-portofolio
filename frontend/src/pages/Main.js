import { Terminal } from "lucide-react";
import TerminalApp from "../components/Apps/TerminalApp";

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
                component: <TerminalApp setOpenApps={setOpenApps} bringToFront={bringToFront} appId={newAppId} />,
                isMinimized: false
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
    
    return (
        <div>
            <div className="p-3 flex">
                <div className="flex items-center p-3 rounded-lg bg-zinc-800 w-fit cursor-pointer
                ring-1 ring-white/40 hover:bg-white/10 transition-all duration-200"
                onClick={openTerminal}>
                    <Terminal size={24} color="white"/>
                </div>
            </div>
            <div>
                {/* {openApps.some(app => app.name === 'Terminal') && <TerminalApp setOpenApps={setOpenApps}/>} */}
                {openApps.map(app => (
                    <div 
                        className="flex absolute top-5 left-[50%] -translate-x-1/2"
                        key={app.id} 
                        style={{ 
                            display: app.isMinimized ? 'none' : 'block',
                            zIndex: getAppZIndex(app.id)
                        }}
                        onClick={() => handleAppClick(app.id)}
                    >
                        {app.component}
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default Main;