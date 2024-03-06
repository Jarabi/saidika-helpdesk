import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from './provider/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

import Header from './components/Header';
import Footer from './components/Footer';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';

import './App.css';

function App() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    isAuthenticated;
  }, [isAuthenticated]);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
