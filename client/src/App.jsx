/**
 * External dependencies
 */
import { Routes, Route } from 'react-router-dom';

/**
 * Pages
 */
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';

/**
 * Styles and assets
 */
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
