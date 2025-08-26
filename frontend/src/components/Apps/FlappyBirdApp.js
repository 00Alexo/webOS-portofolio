const FlappyBirdApp = ({setOpenApps, bringToFront, appId, openApps}) => {
    return (
        <div className="bg-blue w-screen h-[calc(100vh-60px)]">
            <div className="flex justify-end px-2 pt-2 bg-white/90 backdrop-blur-sm border-b border-white/20">
                <div className="flex space-x-2 items-center pb-1">
                    <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 
                    shadow-inner border border-green-600 transition-all duration-150 hover:scale-110"
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenApps(prev => prev.map(app => {
                            if (app.name === 'FlappyBird') {
                                return { ...app, isMinimized: true };
                            }
                            return app;
                        }));
                    }}>
                    </button>
                    {/* <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 
                    shadow-inner border border-yellow-600 transition-all duration-150 hover:scale-110"
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenApps(prev => prev.map(app => {
                            if (app.name === 'FlappyBird') {
                                return { ...app, isMaxSize: !app.isMaxSize };
                            }
                            return app;
                        }));
                    }}>
                    </button> */}
                    <button className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400
                    shadow-inner border border-red-600 transition-all duration-150 hover:scale-110"
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenApps(prev => prev.filter(app => app.name !== 'FlappyBird'));
                    }}>
                    </button>
                </div>
            </div>
            <iframe src="https://angryflappybird1.netlify.app" title="Flappy Bird" className="w-full h-full"/>
        </div>
    );
}
 
export default FlappyBirdApp;