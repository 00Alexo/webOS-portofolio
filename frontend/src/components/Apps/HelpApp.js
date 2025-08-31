import { ChevronRight, X, Minus, Square, Plus } from "lucide-react";
import {useState, useEffect, useRef} from 'react';
import Draggable from 'react-draggable';
import useWindowSize from '../../hooks/useWindowSize';

const HelpApp = ({setOpenApps, bringToFront, appId, openApps}) => {
    const windowSize = useWindowSize();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const draggableRef = useRef(null);
    
    const currentApp = openApps.find(app => app.id === appId);
    const isMaxSize = currentApp?.isMaxSize || false;

    const handleHelpClick = () => {
        if (bringToFront && appId) {
            bringToFront(appId);
        }
    };

    const handleMaximizeToggle = (e) => {
        e.stopPropagation();
        
        setOpenApps(prev => prev.map(app => {
            if (app.name === 'Help') {
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
            <div className={`bg-gray-300 backdrop-blur-sm border border-white/20 min-w-[500px] mx-auto min-h-[500px] max-h-full inset-4 flex flex-col
            max-w-full overflow-hidden shadow-lg shadow-black/80 text-white z-[1000] ${isMaxSize ? ' w-[100vw] h-[calc(100vh-58px)] rounded-none' : 'w-[50vw] h-[50vh] rounded-lg'}`} 
            onClick={handleHelpClick}>
                <div className="bg-gray-800/50 border-b border-white/10 flex-shrink-0 drag-handle cursor-move">
                    <div className="flex space-x-2 items-center px-2 pt-2 pb-1 justify-end">
                        <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 
                        shadow-inner border border-green-600 transition-all duration-150 hover:scale-110"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenApps(prev => prev.map(app => {
                                if (app.name === 'Help') {
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
                            setOpenApps(prev => prev.filter(app => app.name !== 'Help'));
                        }}>
                        </button>
                    </div>
                </div>
                <div className="flex w-full flex-col">
                    <div className="mx-auto mt-5 text-gray-800">
                        <p className="font-bold text-xl">WebOS Help Center</p>
                    </div>
                    <div className="mx-auto text-gray-800">
                        <p> Learn keyboard shortcuts and system commands</p>
                    </div>
                    <div className="p-2 mt-2 flex flex-col">
                        <div>
                            <h2 class="text-xl font-semibold text-black flex items-center gap-2">
                                <span class="w-2 h-2 bg-black rounded-full"></span>
                                Keyboard Shortcuts
                            </h2>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-400/30 py-2">
                            <div className="bg-slate-400 p-3 rounded-lg flex flex-row justify-between w-[40%]">
                                <p> Open WinBar</p>
                                <div className="flex gap-1">
                                    <kbd className="px-2 py-1 bg-gray-700/50 rounded text-xs border border-gray-600">Shift</kbd>
                                        <span className="text-gray-700">+</span>
                                    <kbd className="px-2 py-1 bg-gray-700/50 rounded text-xs border border-gray-600">W</kbd>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    );
}
 
export default HelpApp;