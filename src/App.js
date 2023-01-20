import './App.css';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

// Pages
import Login from './pages/Login-Register/Login'
import Register from './pages/Login-Register/Register';
import Home from './pages/Home/Home'
import Alagamento from './pages/Alagamento/Alagamento';

// Hooks
import { useAuthContext } from './hooks/useAuthContext';
import { useAuth } from './hooks/useAuth';

// Components
import Menu from './components/Menu';

function App() {

  const location = useLocation()
  const { user } = useAuthContext()
  const { checkToken } = useAuth()

  useEffect(() => {

    checkToken()

  }, [user, checkToken])


  return (
    <div className="App">
      <Menu />
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
          <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path='/alagamento/:id' element={user ? <Alagamento /> : <Navigate to='/login' />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
