import { useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import NewTicket from '../pages/NewTicket';
import TicketsOverview from '../pages/TicketsOverview';

const UserView = () => {
  const { auth } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState('overview');

  // handle which page to display in dashboard
  const handlePageSelection = (page) => {
    setDashboardData(page);
  };

  // function to render content based on selected page
  const renderPage = () => {
    switch (dashboardData) {
      case 'overview':
        return <TicketsOverview />;
      case 'new-ticket':
        return <NewTicket />;
      default:
        return <TicketsOverview />;
    }
  };

  return (
    <section className='container-fluid pageView'>
      <div className='sidePanel'>
        <h5 className='pageTitle'>Dashboard</h5>
        <ul className='nav flex-column'>
          <li
            className='nav-item'
            onClick={() => handlePageSelection('overview')}
          >
            <i className='bi bi-card-list me-3'></i>
            Overview
          </li>
          <li
            className='nav-item'
            onClick={() => handlePageSelection('new-ticket')}
          >
            <i className='bi bi-plus-square-dotted me-3'></i>
            New Ticket
          </li>
        </ul>
      </div>
      <div className='pageContent ms-2'>
        <div className='pageHeader mb-3'>
          <p>
            Welcome <strong>{auth.email}</strong>
          </p>
        </div>
        {renderPage()}
      </div>
    </section>
  );
};

export default UserView;
