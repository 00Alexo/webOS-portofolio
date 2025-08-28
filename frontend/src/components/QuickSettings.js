import {Volume2, Terminal, Globe2, X, VolumeX, Volume1, SunMedium, SunDim, Sun} from 'lucide-react';
import red from '../assets/Red.png';
import chess from '../assets/chess.png';
import cfr from '../assets/cfr.png';
import vending from '../assets/vending.png';

const QuickSettings = ({volume, setVolume, brightness, setBrightness, openApps, setOpenApps}) => {
    const closeApp = (appId) => {
        setOpenApps(prev => prev.filter(app => app.id !== appId));
    }

    const closeAll = () =>{
        setOpenApps([]);
    }

    return (
        <div className="absolute bottom-full right-0 mb-2 mr-2 backdrop-blur-xl border notification-area
        rounded-lg bg-gradient-to-br bg-[#181818] border-white/15
        shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] p-4 min-w-[320px] max-h-[400px] z-50 overflow-hidden">
            <div className="absolute top-full right-8 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-gray-900/95"></div>
            
            <div className="mb-4 flex flex-col gap-2">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-white">Quick Settings</h3>
                    <button className="text-xs text-gray-400 hover:text-white">All settings</button>
                </div>
                
                <div className='flex w-full justify-center items-center gap-3'>
                    {volume === 0 ? (
                        <VolumeX size={24} />
                    ) : volume < 50 ? (
                        <Volume1 size={24} />
                    ) : (
                        <Volume2 size={24} />
                    )}
                    <div className="relative w-full">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) => setVolume(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <style jsx>{`
                            .slider::-webkit-slider-thumb {
                                appearance: none;
                                width: 16px;
                                height: 16px;
                                border-radius: 50%;
                                background: #ffffff;
                                cursor: pointer;
                                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                            }
                            
                            .slider::-moz-range-thumb {
                                width: 16px;
                                height: 16px;
                                border-radius: 50%;
                                background: #ffffff;
                                cursor: pointer;
                                border: none;
                                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                            }
                            
                            .slider::-webkit-slider-track {
                                background: linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume}%, #4b5563 ${volume}%, #4b5563 100%);
                                height: 8px;
                                border-radius: 4px;
                            }
                            
                            .slider::-moz-range-track {
                                background: linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume}%, #4b5563 ${volume}%, #4b5563 100%);
                                height: 8px;
                                border-radius: 4px;
                                border: none;
                            }
                        `}</style>
                    </div>
                </div>

                <div className='flex w-full justify-center items-center gap-3'>
                    {brightness < 33 ? (
                        <SunDim size={24} />
                    ) : brightness < 66 ? (
                        <SunMedium size={24} />
                    ) : (
                        <Sun size={24} />
                    )}
                    <div className="relative w-full">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={brightness}
                            onChange={(e) => setBrightness(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <style jsx>{`
                            .slider::-webkit-slider-thumb {
                                appearance: none;
                                width: 16px;
                                height: 16px;
                                border-radius: 50%;
                                background: #ffffff;
                                cursor: pointer;
                                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                            }
                            
                            .slider::-moz-range-thumb {
                                width: 16px;
                                height: 16px;
                                border-radius: 50%;
                                background: #ffffff;
                                cursor: pointer;
                                border: none;
                                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                            }
                            
                            .slider::-webkit-slider-track {
                                background: linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume}%, #4b5563 ${volume}%, #4b5563 100%);
                                height: 8px;
                                border-radius: 4px;
                            }
                            
                            .slider::-moz-range-track {
                                background: linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume}%, #4b5563 ${volume}%, #4b5563 100%);
                                height: 8px;
                                border-radius: 4px;
                                border: none;
                            }
                        `}</style>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-white">Active applications</h3>
                    <button className="text-xs text-gray-400 hover:text-white" onClick={closeAll}>
                        Close all
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3 max-h-[180px] overflow-y-auto" 
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}>
                    {openApps.map(app => {
                        return(
                            <div className="bg-white/5 rounded-lg px-3 py-2 gap-3 flex flex-row justify-between items-center
                            hover:bg-white/10 transition-colors duration-200" key={app.id}>
                                <div className="flex items-center space-x-3">
                                    {app.name === 'FlappyBird' ?
                                    <img src={red} width="22" height="22" className="drop-shadow-lg"/>
                                    : app.name === 'ChessBird' ?
                                    <img src={chess} width="22" height="22" className="drop-shadow-lg"/>
                                    : app.name === 'CfrApp' ?
                                    <img src={cfr} width="22" height="22" className="drop-shadow-lg"/>
                                    : app.name === 'MeowFeeder' ?
                                    <div className="w-8 h-8 rounded-lg bg-pink-300 flex items-center justify-center">
                                        <span className="text-white font-bold text-sm p-0">MF</span>
                                    </div>
                                    : app.name === 'GeoExplorer' ?
                                    <div className="h-22 w-22 bg-white rounded-xl flex items-center justify-center shadow-lg border border-[#5F5FDF]">
                                        <Globe2 className="text-xl text-[#5F5FDF]" />
                                    </div>
                                    : app.name === 'MyVendingMachine' ? 
                                    <img src={vending} width="22" height="22"/>
                                    : app.name === 'Google' ?
                                    <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                    </svg>
                                    : app.name === 'Terminal' ?
                                    <div className='flex items-center p-1.5 rounded-lg w-fit cursor-pointer 
                                    ring-1 transition-all duration-200 ring-slate-400'>
                                        <Terminal size={10} color="white"/>
                                    </div>
                                    : null
                                    }
                                    <div className="flex">
                                        <div className="text-sm font-medium text-white">{app.name}</div>
                                    </div>
                                </div>
                                <div className="group" onClick={() => closeApp(app.id)}>
                                    <div className="p-2 rounded-lg transition-all duration-200 ease-out
                                    hover:bg-gradient-to-br hover:from-red-500/25 hover:to-red-600/30 
                                    hover:shadow-lg hover:shadow-red-500/20 hover:scale-105
                                    border border-transparent hover:border-red-400/40 cursor-pointer
                                    flex items-center justify-center min-w-[32px] min-h-[32px]
                                    active:scale-95 active:bg-red-600/40">
                                        <X size={16} className="text-gray-400 group-hover:text-red-200 group-active:text-white 
                                        transition-all duration-200 drop-shadow-sm"/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    {openApps.length === 0 && (
                        <div className="text-sm text-gray-400">
                            No open applications
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
 
export default QuickSettings;