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
      <div className="App w-screen h-screen bg-cover bg-center select-none overflow-hidden" style={{ backgroundImage: `url(${rashy})` }}>
          <Taskbar 
            openApps={openApps} 
            setOpenApps={setOpenApps} 
            apps={apps} 
            bringToFront={bringToFront}
            focusedAppId={focusedAppId}
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
              />
            }/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
