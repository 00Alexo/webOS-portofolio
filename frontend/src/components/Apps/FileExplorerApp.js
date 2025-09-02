import { ChevronRight, X, Minus, Square, Plus } from "lucide-react";
import {useState, useEffect, useRef} from 'react';
import Draggable from 'react-draggable';
import useWindowSize from '../../hooks/useWindowSize';

const FileExplorerApp = ({setOpenApps, bringToFront, appId, openApps}) => {
    const windowSize = useWindowSize();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const draggableRef = useRef(null);
    
    const currentApp = openApps.find(app => app.id === appId);
    const isMaxSize = currentApp?.isMaxSize || false;

    const handleAppClick = () => {
        if (bringToFront && appId) {
            bringToFront(appId);
        }
    };

    const handleMaximizeToggle = (e) => {
        e.stopPropagation();
        
        setOpenApps(prev => prev.map(app => {
            if (app.name === 'FileExplorer') {
                const newMaxSize = !app.isMaxSize;
                
                if (newMaxSize) {
                    setPosition({ x: 0, y: 0 });

                    if (draggableRef.current) {
                        draggableRef.current.state.x = 0;
                        draggableRef.current.state.y = 0;
                    }
                }
                
                return { ...app, isMaxSize: newMaxSize };
            }
            return app;
        }));
    };

    const handleDrag = (e, data) => {
        setPosition({ x: data.x, y: data.y });
    };

    useEffect(() => {
        if (isMaxSize) {
            setPosition({ x: 0, y: 0 });
        }
    }, [isMaxSize]);

    const [screens, setScreens] = useState([{ name: "Home", id: 1 }]);

    return (
        <Draggable 
            bounds={{
                top: -25,
                left: windowSize.width < 1000 ? -300 : -500,
                right: windowSize.width < 1000 ? 300 : 500,
                bottom: windowSize.height < 700 ? windowSize.height - 525 : windowSize.height - 525
            }}
            disabled={isMaxSize}
            handle=".drag-handle"
            position={isMaxSize ? { x: 0, y: 0 } : position}
            onDrag={handleDrag}
            onStop={handleDrag}
            ref={draggableRef}
        >
            <div className={`bg-[#181818] backdrop-blur-sm border border-white/20 min-w-[500px] mx-auto min-h-[500px] max-h-full inset-4 flex flex-col
            max-w-full overflow-hidden shadow-lg shadow-black/80 text-white z-[1000] ${isMaxSize ? ' w-[100vw] h-[calc(100vh-58px)] rounded-none' : 'w-[50vw] h-[50vh] rounded-lg'}`} 
            onClick={handleAppClick}>
                <div className="bg-gray-800/50 border-b border-white/10 flex-shrink-0 drag-handle cursor-move">
                    <div className="flex justify-between px-2 pt-2">
                        <div className="flex items-end space-x-1">
                            {screens.map((screen) =>{ return (
                                <div key={screen.id} className="flex items-center text-xs bg-gray-700/50 
                                px-3 py-1.5 rounded-t-lg border-t border-l border-r border-white/10 min-w-[100px] opacity-70 hover:opacity-100 cursor-pointer transition-all duration-200">
                                    <ChevronRight size={14} className="mr-1.5"/>
                                    <span className="flex-1">{screen.name}</span>
                                    <button className="ml-2 hover:bg-white/10 rounded p-0.5 transition-all duration-200">
                                        <X size={12} onClick={() => {
                                            setScreens(prev => prev.filter(s => s.id !== screen.id));
                                        }}/>
                                    </button>
                                </div>
                            )})}
                            {screens.length < 4 &&
                                <button className="flex items-center justify-center w-8 h-8 rounded-t-lg 
                                hover:bg-white/10 transition-all duration-200 text-gray-400 hover:text-white" 
                                onClick={() => {
                                    const newId = screens.length > 0 ? screens[screens.length - 1].id + 1 : 1;
                                    if(screens.length < 4)
                                        setScreens(prev => [...prev, { name: `Screen ${newId}`, id: newId }]);
                                }}>
                                    <Plus size={14}/>
                                </button>
                            }
                        </div>
                        <div className="flex space-x-2 items-center pb-1">
                            <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 
                            shadow-inner border border-green-600 transition-all duration-150 hover:scale-110"
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenApps(prev => prev.map(app => {
                                    if (app.name === 'FileExplorer') {
                                        return { ...app, isMinimized: true };
                                    }
                                    return app;
                                }));
                            }}>
                            </button>
                            <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 
                            shadow-inner border border-yellow-600 transition-all duration-150 hover:scale-110"
                            onClick={handleMaximizeToggle}>
                            </button>
                            <button className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400
                            shadow-inner border border-red-600 transition-all duration-150 hover:scale-110"
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenApps(prev => prev.filter(app => app.name !== 'FileExplorer'));
                            }}>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col">
                    FileExplorer
                </div>
            </div>
        </Draggable>
    );
}
 
export default FileExplorerApp;