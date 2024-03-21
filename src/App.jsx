
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Register from './pages/Register.jsx'
import Administration from './pages/administration/Administration.jsx';
import { NextUIProvider } from '@nextui-org/react';
import { IS_DEVELOPMENT } from './config.js';
import { Footer } from './components/Footer.jsx';
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { Navigate } from 'react-router-dom';
import Profile from './pages/Profile.jsx';
import { THEME } from './constants/constants.js';

function App() {
  const navigate = useNavigate();
  return (
    <NextUIProvider navigate={navigate}>
      <NextThemesProvider attribute="class" defaultTheme={THEME.light}>
        <NavBar/>
        <div className='flex justify-center content-center'>     
          <Routes>
            <Route path='/' element={<Dashboard/>}> </Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/admin' element={<Administration/>}></Route>
            <Route path='/myprofile' element={<Profile/>}></Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
       
        </div>
        {IS_DEVELOPMENT && <Footer />}
      </NextThemesProvider>
    </NextUIProvider>
  )
}
export default App
