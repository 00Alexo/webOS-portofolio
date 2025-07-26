import { useState, useEffect } from 'react';
import {ChevronDown, ChevronUp, Wifi, Battery, Settings, Volume2, LayoutGrid} from 'lucide-react';

const Taskbar = () => {
    const [time, setTime] = useState(new Date());
    const [isArrowOpen, setIsArrowOpen] = useState(false);

    useEffect(() =>{
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isArrowOpen && !event.target.closest('.notification-area')) {
                setIsArrowOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isArrowOpen]);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        });
    };


    return (
        <div className="fixed flex bottom-0 w-full bg-black/30 backdrop-blur-xl border-t z-[100000]
        border-white/10 shadow-[0_-2px_16px_0_rgba(0,0,0,0.25)] text-white pr-3 pl-3 pt-1 pb-1 justify-between">
            <div className='flex items-center hover:bg-white/5 rounded-lg p-1.5 cursor-pointer'>
                <div className='w-full h-full hover:scale-110'>
                    <svg width="28" height="28" viewBox="0 0 16 16" className="text-white/80 group-hover:text-white 
                    transition-colors duration-300">
                        <path
                            d="M2 2h5v5H2V2zm7 0h5v5H9V2zM2 9h5v5H2V9zm7 0h5v5H9V9z"
                            fill="currentColor"
                            className="group-hover:scale-110 transition-transform duration-300"
                        />
                    </svg>
                </div>
            </div>
            <div className='flex flex-row'>
                <div className='flex items-center justify-center'>
                    <button 
                        className="text-white hover:text-gray-300 focus:outline-none hover:bg-white/5 rounded-lg p-2"
                        onClick={() => setIsArrowOpen(!isArrowOpen)}
                    >
                        {isArrowOpen ? <ChevronDown size={18}/> : <ChevronUp size={18}/>}
                    </button>
                </div>
                <div className="flex flex-col justify-center items-end text-xs hover:bg-white/5 rounded-lg pt-1 pb-1 pr-2 pl-2 cursor-pointer">
                    <div>
                        {formatTime(time)}
                    </div>
                    <div>
                        {formatDate(time)}
                    </div>
                </div>

                {isArrowOpen && (
                    <div className="absolute bottom-full right-0 mb-2 mr-2 backdrop-blur-xl border border-white/20 rounded-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] p-4 min-w-[320px] max-h-[400px] z-50 overflow-hidden">
                        <div className="absolute top-full right-8 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-gray-900/95"></div>
                        
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-medium text-white">Quick Settings</h3>
                                <button className="text-xs text-gray-400 hover:text-white">All settings</button>
                            </div>
                            
                            <div className="grid grid-cols-4 gap-2 mb-4">
                                <button className="flex flex-col items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200">
                                    <Volume2 size={20} className="mb-1" />
                                    <span className="text-xs">Sound</span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-medium text-white">Active applications</h3>
                                <button className="text-xs text-gray-400 hover:text-white">Close all</button>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors duration-200">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                            <span className="text-xs font-bold">VS</span>
                                        </div>
                                        <div className="flex">
                                            <div className="text-sm font-medium text-white">Visual Studio Code</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors duration-200">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                            <span className="text-xs font-bold">SP</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-white">Spotify</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default Taskbar;