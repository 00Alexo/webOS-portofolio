import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Taskbar from './components/Taskbar';
import rashy from './assets/rashy.jpg';
import { useState, useEffect, useRef } from 'react';
import Login from './pages/Login';
import { AnimatePresence, motion } from 'framer-motion';
function App() {
  const [apps, setApps] = useState(['Terminal']);
  const [openApps, setOpenApps] = useState([]);
  const [focusedAppId, setFocusedAppId] = useState(null);
  const [volume, setVolume] = useState(() =>{
    const vol = localStorage.getItem('volume');
    return vol ? parseInt(vol) : 100;
  });
  const [brightness, setBrightness] = useState(() =>{
    const bright = localStorage.getItem('brightness');
    return bright ? parseInt(bright) : 100;
  });

  useEffect(() =>{
    localStorage.setItem('volume', volume);
    localStorage.setItem('brightness', brightness);
  }, [volume, brightness]);

  const bringToFront = (appId) =>{
    setFocusedAppId(appId);
  }

  const getAppZIndex = (appId) => {
    const baseZIndex = 1000;
    return focusedAppId === appId ? baseZIndex + 100 : baseZIndex;
  };

  const [user, setUser] = useState(false);

  const [lastKey, setLastKey] = useState(null);
  const lastKeyRef = useRef(null);
  const [isWinBarOpen, setIsWinBarOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      console.log(e.key);

      if((e.key === 'w' && lastKeyRef.current === "Shift") || (e.key === 'W' && lastKeyRef.current === "Shift")) {
        e.preventDefault();
        setIsWinBarOpen(prev => !prev);
      }
      
      setLastKey(e.key);
      lastKeyRef.current = e.key;
    };

    if(user)
      document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [user]);

  if(!user)
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <Login setUser={setUser} user={user}/>
        </motion.div>
      </AnimatePresence>
    )

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="main"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <BrowserRouter>
          <div className="App w-screen h-screen bg-cover bg-center select-none overflow-hidden relative" style={{ backgroundImage: `url(${rashy})` }}>
              <div 
                  className="absolute inset-0 bg-black transition-opacity duration-300 pointer-events-none z-[999999]"
                  style={{ opacity: Math.max(0, (100 - brightness) / 150) }}
              />
              <Taskbar 
                setUser={setUser} 
                user={user}
                openApps={openApps} 
                setOpenApps={setOpenApps} 
                apps={apps} 
                bringToFront={bringToFront}
                focusedAppId={focusedAppId}
                volume={volume}
                setVolume={setVolume}
                brightness={brightness}
                setBrightness={setBrightness}
                isWinBarOpen={isWinBarOpen}
                setIsWinBarOpen={setIsWinBarOpen}
              />
              <Routes> 
                <Route path = "/" element={
                  <Main 
                    apps={apps} 
                    openApps={openApps} 
                    setOpenApps={setOpenApps}
                    bringToFront={bringToFront}
                    getAppZIndex={getAppZIndex}
                    focusedAppId={focusedAppId}
                    volume={volume}
                    setVolume={setVolume}
                  />
                }/>
              </Routes>
          </div>
        </BrowserRouter>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
