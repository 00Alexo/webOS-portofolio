import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Taskbar from './components/Taskbar';
import rashy from './assets/rashy.jpg';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
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

  if(!user)
    return (
      <Login setUser={setUser} user={user}/>
    )

  return (
    <BrowserRouter>
      <div className="App w-screen h-screen bg-cover bg-center select-none overflow-hidden relative" style={{ backgroundImage: `url(${rashy})` }}>
          <div 
              className="absolute inset-0 bg-black transition-opacity duration-300 pointer-events-none z-[999999]"
              style={{ opacity: Math.max(0, (100 - brightness) / 150) }}
          />
          <Taskbar 
            openApps={openApps} 
            setOpenApps={setOpenApps} 
            apps={apps} 
            bringToFront={bringToFront}
            focusedAppId={focusedAppId}
            volume={volume}
            setVolume={setVolume}
            brightness={brightness}
            setBrightness={setBrightness}
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
  );
}

export default App;
