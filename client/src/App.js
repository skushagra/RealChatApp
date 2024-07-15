import './App.css';
import NavBar from './components/NavBar/NavBar';
import { useTheme } from './hooks/Theme/Theme';
import Hero from './components/Hero/Hero';
import Login from './pages/Login/Login';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import GetStarted from './pages/GetStarted/GetStarted';
import Dashboard from './pages/Dashboard/Dashboard';
import { useUser } from './hooks/User/User';
import { useEffect } from 'react';
import recieveMessages from './api/recieveMessages.ts';
import intializeFirebase from './api/FirebaseConfig.ts';
function App() {

  const {theme, toggleTheme} = useTheme();
  const {user, serUser} = useUser();

  useEffect(() => {
    const app = intializeFirebase();
    recieveMessages();
  }
  , [])

  return (
      <div className='App w-screen h-screen' style={{background: theme=="light"? "#fafafa" : "#0f0f0f"}}>
        <BrowserRouter>
          <Routes>
              <Route path="" element={(user && user!=="undefined") ? <Dashboard /> : <Hero />} />
              <Route path='/login' element={<Login />} />
              {/* <Route path='/signup' element={< />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
  );
} 

export default App;