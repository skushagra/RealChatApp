import './App.css';
import NavBar from './components/NavBar/NavBar';
import { useTheme } from './hooks/Theme/Theme';
import Hero from './components/Hero/Hero';
import Login from './pages/Login/Login';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import GetStarted from './pages/GetStarted/GetStarted';

function App() {

  const {theme, toggleTheme} = useTheme();
  
  return (
      <div className='App w-screen h-screen' style={{background: theme=="light"? "#fafafa" : "#0f0f0f"}}>
        <NavBar />
        <BrowserRouter>
          <Routes>
              <Route path="" element={<Hero />} />
              <Route path='/login' element={<Login />} />
              {/* <Route path='/signup' element={< />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
  );
} 

export default App;