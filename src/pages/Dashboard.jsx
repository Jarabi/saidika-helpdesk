import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserView from '../views/UserView';
import AdminView from '../views/AdminView';
import AuthContext from '../context/AuthProvider';

const Dashboard = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [view, setView] = useState('user');

  const renderView = () => {
    switch (view) {
      case 'user':
        return <UserView />;
      case 'admin':
        return <AdminView />;
      default:
        return <UserView />;
    }
  };

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    } else if (auth.role === '100') {
      setView('user');
    } else if (auth.role === '200') {
      setView('admin');
    }
  }, [auth, navigate]);

  return <div className='dashboard'>{renderView()}</div>;
};

export default Dashboard;
