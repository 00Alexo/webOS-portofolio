import { ChevronRight, Plus, X } from "lucide-react";

const GoogleApp = ({setOpenApps, bringToFront, appId}) => {
    const handleAppClick = () => {
        if (bringToFront && appId) {
            bringToFront(appId); 
        }
    };

    return (
        <div className="flex flex-col" onClick={handleAppClick}>
            <div className="flex justify-end px-2 pt-2 items-center bg-white/90 backdrop-blur-sm border-b border-white/20 rounded-t-lg">
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
                    shadow-inner border border-yellow-600 transition-all duration-150 hover:scale-110">
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
            <iframe src="https://www.google.com/webhp?igu=1" className="min-w-[600px] min-h-[500px] h-[800px] mx-auto rounded-b-lg"></iframe>
        </div>
    );
}
 
export default GoogleApp;