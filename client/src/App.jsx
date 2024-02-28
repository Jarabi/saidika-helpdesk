/**
 * External dependencies
 */
import { Routes, Route } from 'react-router-dom';

/**
 * Authentication
 */
import { AUTH_TOKEN } from './api/constants';
import ProtectedRoute from './provider/ProtectedRoute';


/**
 * Pages
 */
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

/**
 * Styles and assets
 */
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route path='/dashboard' element={<Dashboard />} />

      </Routes>
    </>
  );
}

export default App;
