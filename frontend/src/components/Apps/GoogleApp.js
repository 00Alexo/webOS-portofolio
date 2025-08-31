import { ChevronRight, Plus, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Draggable from 'react-draggable';
import useWindowSize from '../../hooks/useWindowSize';

const GoogleApp = ({setOpenApps, bringToFront, appId, openApps, focusedAppId}) => {
    const windowSize = useWindowSize();
    const [allowInteraction, setAllowInteraction] = useState(true);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const iframeRef = useRef(null);
    const draggableRef = useRef(null);

    useEffect(() => {
        if (focusedAppId === appId) {
            setAllowInteraction(true);
        }
    }, [focusedAppId, appId]);

    const handleAppClick = () => {
        if (bringToFront && appId) {
            bringToFront(appId); 
        }
    };

    const enableInteraction = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleAppClick();
        setAllowInteraction(true);
        
        if (iframeRef.current) {
            iframeRef.current.focus();
        }
    };

    const handleGlobalClick = (e) => {
        if (!e.target.closest(`[data-google-app="${appId}"]`)) {
            setAllowInteraction(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleGlobalClick);
        return () => {
            document.removeEventListener('mousedown', handleGlobalClick);
        };
    }, [appId]);

    const currentApp = openApps.find(app => app.id === appId);
    const isMaxSize = currentApp?.isMaxSize || false;

    const handleMaximizeToggle = (e) => {
        e.stopPropagation();
        
        setOpenApps(prev => prev.map(app => {
            if (app.name === 'Google') {
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
            ref={draggableRef}
            bounds={{
                top: -25,
                left: windowSize.width < 1000 ? -300 : -700,
                right: windowSize.width < 1000 ? 300 : 700,
                bottom: windowSize.height < 700 ? windowSize.height - 525 : windowSize.height - 525
            }}
            disabled={isMaxSize}
            handle=".drag-handle"
            position={isMaxSize ? { x: 0, y: 0 } : position}
            onDrag={handleDrag}
            onStop={handleDrag}
        >
            <div 
                className={`flex flex-col ${isMaxSize ? 'w-[100vw] h-[calc(100vh-58px)] rounded-none' : ' '}`}
                data-google-app={appId}
            >
                <div className={`flex px-2 pt-2 justify-end bg-white/90 backdrop-blur-sm border-b border-white/20 ${isMaxSize ? 'rounded-none' : 'rounded-t-lg drag-handle cursor-move'}`}>
                    <div className="flex space-x-2 items-center pb-1">
                        <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 
                        shadow-inner border border-green-600 transition-all duration-150 hover:scale-110"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenApps(prev => prev.map(app => {
                                if (app.name === 'Google') {
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
                            setOpenApps(prev => prev.filter(app => app.name !== 'Google'));
                        }}>
                        </button>
                    </div>
                </div>
                <div className="relative h-full w-full">
                    <iframe 
                        ref={iframeRef}
                        src="https://www.google.com/webhp?igu=1" 
                        className={`mx-auto ${
                            isMaxSize 
                                ? 'w-full h-[calc(100vh-85px)] rounded-none' 
                                : 'min-w-[600px] min-h-[500px] h-[800px] rounded-b-lg'
                        }`}
                        style={{ 
                            pointerEvents: allowInteraction ? 'auto' : 'none'
                        }}
                    ></iframe>
                    
                    <div 
                        className="absolute inset-0 cursor-pointer z-10"
                        style={{
                            backgroundColor: allowInteraction ? 'transparent' : 'rgba(0,0,0,0.01)',
                            pointerEvents: allowInteraction ? 'none' : 'auto'
                        }}
                        onClick={enableInteraction}
                        onMouseDown={enableInteraction}
                    >
                        {!allowInteraction && (
                            <div className="absolute inset-0 flex items-center justify-center">
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Draggable>
    );
}
 
export default GoogleApp;