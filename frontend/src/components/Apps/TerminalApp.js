import { ChevronRight, X, Minus, Square, Plus } from "lucide-react";
import {useState, useEffect, useRef} from 'react';

const TerminalApp = ({setOpenApps, bringToFront, appId, openApps}) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'output', content: 'Welcome to the terminal! v1.0.0' },
        { type: 'output', content: 'Type "help" for a list of available commands.' }
    ]);

    const terminalRef = useRef(null);
    const inputRef = useRef(null);
    
    const currentApp = openApps.find(app => app.id === appId);
    const isMaxSize = currentApp?.isMaxSize || false;
    
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            executeCommand(input);
            setInput('');
        }
    };

    const handleTerminalClick = () => {
        if (bringToFront && appId) {
            bringToFront(appId);
        }
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const executeCommand = (commandLine) =>{
        const command = commandLine.trim().toLowerCase();
        if(!command)
            return;

        setHistory(prev => [...prev, { type: 'command', content: `user@webos: ${command}` }]);

        switch (command) {
            case 'help':
                setHistory(prev => [...prev, { 
                    type: 'output', 
                    content: 'Available commands:\n  help - Show this help message\n  clear - Clear terminal\n  whoami - Show current user' 
                }]);
                break;
            
            case 'clear':
                setHistory([]);
                break;

            case 'whoami':
                setHistory(prev => [...prev, { type: 'output', content: 'user@User' }]);
                break;

            default:
            setHistory(prev => [...prev, { 
                type: 'error', 
                content: `Command not found: ${command}` 
            }]);
            break;
        }
    }

    return (
        <div className={`rounded-lg bg-black/90 backdrop-blur-sm border border-white/20
        min-w-[500px] w-[50vw] mx-auto min-h-[500px] h-[50vh] max-h-full inset-4 flex flex-col
        max-w-full overflow-hidden shadow-lg shadow-black/80 text-white z-[1000] ${isMaxSize ? ' w-[100vw] h-[calc(100vh-61px)] rounded-none' : ' '}`} 
        onClick={handleTerminalClick}>
            <div className="bg-gray-800/50 border-b border-white/10 flex-shrink-0">
                <div className="flex justify-between px-2 pt-2">
                    <div className="flex items-end space-x-1">
                        <div className="flex items-center text-xs bg-gray-700/50 
                        px-3 py-1.5 rounded-t-lg border-t border-l border-r border-white/10 min-w-[100px] opacity-70 hover:opacity-100 cursor-pointer transition-all duration-200">
                            <ChevronRight size={14} className="mr-1.5"/>
                            <span className="flex-1">PowerShell</span>
                            <button className="ml-2 hover:bg-white/10 rounded p-0.5 transition-all duration-200">
                                <X size={12} />
                            </button>
                        </div>
                        <button className="flex items-center justify-center w-8 h-8 rounded-t-lg 
                        hover:bg-white/10 transition-all duration-200 text-gray-400 hover:text-white">
                            <Plus size={14} />
                        </button>
                    </div>
                    <div className="flex space-x-2 items-center pb-1">
                        <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 
                        shadow-inner border border-green-600 transition-all duration-150 hover:scale-110"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenApps(prev => prev.map(app => {
                                if (app.name === 'Terminal') {
                                    return { ...app, isMinimized: true };
                                }
                                return app;
                            }));
                        }}>
                        </button>
                        <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 
                        shadow-inner border border-yellow-600 transition-all duration-150 hover:scale-110"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenApps(prev => prev.map(app => {
                                if (app.name === 'Terminal') {
                                    return { ...app, isMaxSize: !app.isMaxSize };
                                }
                                return app;
                            }));
                        }}>
                        </button>
                        <button className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400
                        shadow-inner border border-red-600 transition-all duration-150 hover:scale-110"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenApps(prev => prev.filter(app => app.name !== 'Terminal'));
                        }}>
                        </button>
                    </div>
                </div>
            </div>
            <div ref={terminalRef} onClick={handleTerminalClick}
            className="flex-1 p-4 overflow-y-auto font-mono text-sm text-green-400 cursor-text min-h-0 select-text
                [&::-webkit-scrollbar]:w-1
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-gray-800/80
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb:hover]:bg-gray-800/80"
            >
                {history.map((entry, index) => (
                    <div key={index} className="whitespace-pre-wrap">
                        {entry.type === 'command' && (
                            <span className="text-white">{entry.content}</span>
                        )}
                        {entry.type === 'output' && (
                            <span className="text-green-400">{entry.content}</span>
                        )}
                        {entry.type === 'error' && (
                            <span className="text-red-400">{entry.content}</span>
                        )}
                    </div>
                ))}

                <div className="flex items-center">
                    <span className="text-white mr-2">user@webos:~$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="flex-1 bg-transparent text-green-400 outline-none font-mono"
                        autoComplete="off"
                        spellCheck="false"
                    />
                </div>
            </div>
        </div>
    );
}
 
export default TerminalApp;