import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Taskbar from './components/Taskbar';
import rashy from './assets/rashy.jpg';
import { useState, useEffect } from 'react';
function App() {
  const [apps, setApps] = useState(['Terminal']);
  const [openApps, setOpenApps] = useState([]);

  return (
    <BrowserRouter>
      <div  className="App w-full h-screen bg-cover bg-center select-none" style={{ backgroundImage: `url(${rashy})` }}>
          <Taskbar/>
          <Routes> 
            <Route path = "/" element={<Main apps={apps} openApps={openApps} setOpenApps={setOpenApps}/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
