import { ChevronRight, X, Minus, Square, Plus } from "lucide-react";
import {useState, useEffect, useRef} from 'react';
import Draggable from 'react-draggable';
import useWindowSize from '../../hooks/useWindowSize';
import { fileSystem, FileSystemManager } from '../../utils/fileSystem';

const TerminalApp = ({setOpenApps, bringToFront, appId, openApps}) => {
    const [managers, setManagers] = useState({});

    const windowSize = useWindowSize();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const draggableRef = useRef(null);

    const [screens, setScreens] = useState([
        { 
            name: "PowerShell", 
            id: 1, 
            history: [
                { type: 'output', content: 'Welcome to the terminal! v1.0.0' },
                { type: 'output', content: 'Type "help" for a list of available commands.' }
            ]
        }
    ]);
    const [activeScreen, setActiveScreen] = useState(screens[0]);

    const [input, setInput] = useState('');

    const terminalRef = useRef(null);
    const inputRef = useRef(null);
    
    const currentApp = openApps.find(app => app.id === appId);
    const isMaxSize = currentApp?.isMaxSize || false;
    
    const getManagerForScreen = (screenId) => {
        if (!managers[screenId]) {
            const newManager = new FileSystemManager(fileSystem);
            setManagers(prev => ({
                ...prev,
                [screenId]: newManager
            }));
            return newManager;
        }
        return managers[screenId];
    };

    useEffect(() => {
        if (screens.length > 0 && !managers[screens[0].id]) {
            setManagers(prev => ({
                ...prev,
                [screens[0].id]: new FileSystemManager(fileSystem)
            }));
        }
    }, []);
    
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [activeScreen, screens]);

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
        const currentManager = getManagerForScreen(activeScreen.id);
        
        let command = commandLine.trim().toLowerCase();
        let orgcommand = command;
        let dirName = '';

        if(!command)
            return;

        if(command.startsWith('cd')){
            const parts = command.split(' ');
            command = parts[0];
            dirName = parts[1];
        }

        const updatedScreen = { ...activeScreen, history: [...activeScreen.history, { type: 'command', content: `user@webos: ${orgcommand}` }] };
        setActiveScreen(updatedScreen);
        setScreens(prev => prev.map(screen => screen.id === activeScreen.id ? updatedScreen : screen));

        switch (command) {
            case 'help':
                setScreens(prev => prev.map(screen => screen.id === activeScreen.id ? { ...screen, history: [...screen.history, { type: 'output', content: 'Available commands:\n  help - Show this help message\n  clear - Clear terminal\n  whoami - Show current user\n  ls - List directory contents\n  cd - Change directory\n  cb - Go back one directory\n  pwd - Show current directory' }] } : screen));
                setActiveScreen(previous => ({ ...previous, history: [...previous.history, { type: 'output', content: 'Available commands:\n  help - Show this help message\n  clear - Clear terminal\n  whoami - Show current user\n  ls - List directory contents\n  cd - Change directory\n  cb - Go back one directory\n  pwd - Show current directory' }] }));
                break;
            
            case 'clear':
                setScreens(prev => prev.map(screen => screen.id === activeScreen.id ? { ...screen, history: [] } : screen));
                setActiveScreen({ ...activeScreen, history: [] });
                break;

            case 'whoami':
                setScreens(prev => prev.map(screen => screen.id === activeScreen.id ? { ...screen, history: [...screen.history, { type: 'output', content: 'user' }] } : screen));
                setActiveScreen(prev => ({...prev, history: [...prev.history, { type: 'output', content: 'user' }] }));
                break;

            case 'ls':
                const lsOutput = currentManager.ls();

                const formattedOutput = lsOutput.length > 0 
                    ? lsOutput.map(item => `${item.type === 'directory' ? 'D:' : ''} ${item.name} ${item.extension ? item.extension : ''}`)
                    : 'Directory is empty';

                setScreens(prev => prev.map(screen => screen.id === activeScreen.id ? {...screen, history: [...screen.history, { type: 'output', content: formattedOutput }] } : screen));
                setActiveScreen(prev => ({ ...prev, history: [...prev.history, { type: 'output', content: formattedOutput }] }));
                break;

            case 'cd':
                const cdOutput = currentManager.cd(dirName);

                if(cdOutput.error){
                    setScreens(prev => prev.map(screen => screen.id === activeScreen.id ? { ...screen, history: [...screen.history, { type: 'error', content: cdOutput.error }] } : screen));
                    setActiveScreen(prev => ({...prev, history: [...prev.history, { type: 'error', content: cdOutput.error }] }));
                }
                break;

            case 'cb':
                const cbOutput = currentManager.cb();

                if(cbOutput && cbOutput.newPath){
                    setScreens(prev => prev.map(screen => screen.id === activeScreen.id ? {...screen, history: [...screen.history, { type: 'output', content: `Moved back to: ${cbOutput.newPath}` }] } : screen));
                    setActiveScreen(prev => ({...prev, history: [...prev.history, { type: 'output', content: `Moved back to: ${cbOutput.newPath}` }] }));
                } else if(cbOutput && cbOutput.error) {
                    setScreens(prev => prev.map(screen => screen.id === activeScreen.id ? {...screen, history: [...screen.history, { type: 'error', content: cbOutput.error }] } : screen));
                    setActiveScreen(prev => ({...prev, history: [...prev.history, { type: 'error', content: cbOutput.error }] }));
                } else {
                    setScreens(prev => prev.map(screen => screen.id === activeScreen.id ? {...screen, history: [...screen.history, { type: 'error', content: `Already at root directory` }] } : screen));
                    setActiveScreen(prev => ({...prev, history: [...prev.history, { type: 'error', content: `Already at root directory` }] }));
                }
                break;

            case 'pwd':
                const pwdOutput = currentManager.getCurrentPath();
                const pwdarr = pwdOutput.split('/');
                const outputdir = pwdarr.at(-1);

                setScreens(prev => prev.map(screen => screen.id === activeScreen.id ? {...screen, history: [...screen.history, {type: 'output', content: outputdir}]} : screen))
                setActiveScreen(prev => ({...prev, history: [...prev.history, {type: 'output', content: outputdir}]}))

                break;
            
            default:
                setScreens(prev => prev.map(screen => screen.id === activeScreen.id ? { ...screen, history: [...screen.history, { type: 'error', content: `Command not found: ${command}` }] } : screen));
                setActiveScreen({ ...activeScreen, history: [...activeScreen.history, { type: 'error', content: `Command not found: ${command}` }] });
                break;
        }
    }

    const handleMaximizeToggle = (e) => {
        e.stopPropagation();
        
        setOpenApps(prev => prev.map(app => {
            if (app.name === 'Terminal') {
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
            <div className={`bg-black/90 backdrop-blur-sm border border-white/20 min-w-[500px] mx-auto min-h-[500px] max-h-full inset-4 flex flex-col
            max-w-full overflow-hidden shadow-lg shadow-black/80 text-white z-[1000] ${isMaxSize ? ' w-[100vw] h-[calc(100vh-58px)] rounded-none' : 'w-[50vw] h-[50vh] rounded-lg'}`} 
            onClick={handleTerminalClick}>
                <div className={`bg-gray-800/50 border-b border-white/10 flex-shrink-0 ${isMaxSize ? '' : 'drag-handle cursor-move'}`}>
                    <div className="flex justify-between px-2 pt-2">
                        <div className="flex items-end space-x-1">
                            {screens.map((screen) =>{ return (
                                <div key={screen.id} className={`flex items-center text-xs bg-gray-700/50 duration-200
                                    ${activeScreen.id === screen.id ? 'opacity-100' : 'opacity-50 hover:opacity-100'} cursor-pointer 
                                    px-3 py-1.5 rounded-t-lg border-t border-l border-r border-white/10 min-w-[100px] transition-all`}
                                onClick={() => setActiveScreen(screen)}>
                                    <ChevronRight size={14} className="mr-1.5"/>
                                    <span className="flex-1">{screen.name}</span>
                                    <button className="ml-2 hover:bg-white/10 rounded p-0.5 transition-all duration-200" 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setScreens(prev => prev.filter(s => s.id !== screen.id));
                                        if(screens.length > 0 && activeScreen.id === screen.id)
                                            setActiveScreen(screens[0]);
                                        if(screens.length === 0)
                                            setActiveScreen(null);
                                    }}>
                                        <X size={12}/>
                                    </button>
                                </div>
                            )})}
                            {screens.length < 4 &&
                                <button className="flex items-center justify-center w-8 h-8 rounded-t-lg 
                                hover:bg-white/10 transition-all duration-200 text-gray-400 hover:text-white" 
                                onClick={() => {
                                    const newId = screens.length > 0 ? screens[screens.length - 1].id + 1 : 1;
                                    if(screens.length < 4){
                                        const newScreen = {
                                            name: `Screen ${newId}`, 
                                            id: newId, 
                                            history: [
                                            { type: 'output', content: 'Welcome to the terminal! v1.0.0' },
                                            { type: 'output', content: 'Type "help" for a list of available commands.' }
                                            ] 
                                        }
                                        setScreens(prev => [...prev, newScreen]);
                                        setActiveScreen(newScreen);
                                        setManagers(prev => ({
                                            ...prev,
                                            [newId]: new FileSystemManager(fileSystem)
                                        }));
                                    }
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
                                    if (app.name === 'Terminal') {
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
                    {screens.length > 0 && activeScreen.history.map((entry, index) => (
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

                    {screens.length > 0 && (
                        <div className="flex items-center">
                            <span className="text-white mr-2">user@webos{getManagerForScreen(activeScreen.id)?.getCurrentPath()}:-$</span>
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
                    )}
                </div>
            </div>
        </Draggable>
    );
}
 
export default TerminalApp;