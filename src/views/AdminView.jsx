import { useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import NewTicket from '../pages/NewTicket';
import ViewTicket from '../views/ViewTicket';
import EditTicket from './EditTicket';
import CloseTicket from './CloseTicket';
import TicketsOverview from './TicketsOverview';

const AdminView = () => {
  const { auth } = useContext(AuthContext);
  const [ticketObj, setTicketObj] = useState({});
  const [dashboardView, setDashboardView] = useState('overview');

  // handle which page to display in dashboard
  const handlePageSelection = (page) => {
    setDashboardView(page);
  };

  // function to render content based on selected page
  const renderPage = () => {
    switch (dashboardView) {
      case 'overview':
        return (
          <TicketsOverview
            setTicketObj={setTicketObj}
            onViewTicket={setDashboardView}
          />
        );
      case 'new-ticket':
        return <NewTicket setTicketObj={setTicketObj} />;
      case 'view-ticket':
        return (
          <ViewTicket ticketObj={ticketObj} onEditTicket={setDashboardView} />
        );
      case 'edit-ticket':
        return <EditTicket ticketObj={ticketObj} />;
      case 'review-ticket':
        return <CloseTicket ticketObj={ticketObj} />;
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
          <li
            className='nav-item'
            onClick={() => handlePageSelection('overview')}
          >
            <i className='bi bi-people me-3'></i>
            View Users
          </li>
        </ul>
      </div>
      <div className='pageContent ms-2'>
        <div className='pageHeader mb-3'>
          <p>
            Welcome <strong>{auth.email}</strong> &middot; Admin Dashboard
          </p>
        </div>
        {renderPage()}
      </div>
    </section>
  );
};

export default AdminView;
