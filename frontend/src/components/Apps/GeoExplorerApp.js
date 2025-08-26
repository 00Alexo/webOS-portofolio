import { useState, useRef, useEffect } from "react";

const GeoExplorerApp = ({setOpenApps, bringToFront, appId, openApps, focusedAppId}) => {
    const [allowInteraction, setAllowInteraction] = useState(true);
    const iframeRef = useRef(null);

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
        if (!e.target.closest(`[data-geoexplorer-app="${appId}"]`)) {
            setAllowInteraction(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleGlobalClick);
        return () => {
            document.removeEventListener('mousedown', handleGlobalClick);
        };
    }, [appId]);

    return (
        <div className="bg-blue w-screen h-[calc(100vh-60px)]" data-geoexplorer-app={appId}>
            <div className="flex justify-end px-2 pt-2 bg-white/90 backdrop-blur-sm border-b border-white/20">
                <div className="flex space-x-2 items-center pb-1">
                    <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 
                    shadow-inner border border-green-600 transition-all duration-150 hover:scale-110"
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenApps(prev => prev.map(app => {
                            if (app.name === 'GeoExplorer') {
                                return { ...app, isMinimized: true };
                            }
                            return app;
                        }));
                    }}>
                    </button>
                    <button className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400
                    shadow-inner border border-red-600 transition-all duration-150 hover:scale-110"
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenApps(prev => prev.filter(app => app.name !== 'GeoExplorer'));
                    }}>
                    </button>
                </div>
            </div>
            <div className="relative w-full h-full">
                <iframe 
                    ref={iframeRef}
                    src="https://geografie.vercel.app"
                    className="w-full h-full"
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
    );
}
 
export default GeoExplorerApp;