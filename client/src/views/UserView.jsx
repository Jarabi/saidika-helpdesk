import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import api from '../api/client';

const UserView = () => {
  const { auth } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  let totalTockets = tickets.length;
  let ticketsResolved = tickets.filter(
    (ticket) => ticket.status === 'Closed'
  ).length;
  let ticketsInProgress = tickets.filter(
    (ticket) => ticket.status === 'Assigned'
  ).length;
  let ticketsPending = tickets.filter(
    (ticket) => ticket.status === 'Open'
  ).length;

  // Retrieve tickets from the API
  const fetchTickets = async () => {
    try {
      const response = await api.get(`/tickets/?userId=${auth.id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tickets', error);
    }
  };

  // Retrieve users from the API
  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  useEffect(() => {
    const getTickets = async () => {
      const allTickets = await fetchTickets();
      if (allTickets) setTickets(allTickets);
    };

    const getUsers = async () => {
      const allUsers = await fetchUsers();
      if (allUsers) setUsers(allUsers);
    };
    getTickets();
    getUsers();
  }, []);

  return (
    <section className='container-fluid pageView'>
      <div className='pageContent'>
        <div className='pageHeader mb-3'>
          <h5 className='pageTitle'>User Dashboard</h5>
          <small className='pageSalutation'>
            Welcome <strong>{auth.email}</strong>
          </small>
        </div>
        <div className='row cards'>
          <div className='col-md-3 mb-3'>
            <div className='card text-bg-light'>
              <div className='card-body d-flex flex-column'>
                <div className='card-ticket-data d-flex flex-row'>
                  <div className='card-icon total'>
                    <i
                      className='bi bi-card-checklist'
                      style={{ fontSize: '1.5rem', color: 'white' }}
                    ></i>
                  </div>
                  <h5 className='card-ticket-count'>{totalTockets} Tickets</h5>
                </div>
                <div className='card-title text-center'>Total Tickets</div>
              </div>
            </div>
          </div>

          <div className='col-md-3 mb-3'>
            <div className='card text-bg-light'>
              <div className='card-body d-flex flex-column'>
                <div className='card-ticket-data d-flex flex-row'>
                  <div className='card-icon resolved'>
                    <i
                      className='bi bi-patch-check'
                      style={{ fontSize: '1.5rem', color: 'white' }}
                    ></i>
                  </div>
                  <h5 className='card-ticket-count'>
                    {ticketsResolved} Tickets
                  </h5>
                </div>
                <div className='card-title text-center'>Tickets Resolved</div>
              </div>
            </div>
          </div>

          <div className='col-md-3 mb-3'>
            <div className='card text-bg-light'>
              <div className='card-body d-flex flex-column'>
                <div className='card-ticket-data d-flex flex-row'>
                  <div className='card-icon in-progress'>
                    <i
                      className='bi bi-ui-checks'
                      style={{ fontSize: '1.5rem', color: 'white' }}
                    ></i>
                  </div>
                  <h5 className='card-ticket-count'>
                    {ticketsInProgress} Tickets
                  </h5>
                </div>
                <div className='card-title text-center'>
                  Tickets In Progress
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-3 mb-3'>
            <div className='card text-bg-light'>
              <div className='card-body d-flex flex-column'>
                <div className='card-ticket-data d-flex flex-row'>
                  <div className='card-icon pending'>
                    <i
                      className='bi bi-ui-checks-grid'
                      style={{ fontSize: '1.5rem', color: 'white' }}
                    ></i>
                  </div>
                  <h5 className='card-ticket-count'>
                    {ticketsPending} Tickets
                  </h5>
                </div>
                <div className='card-title text-center'>Pending Tickets</div>
              </div>
            </div>
          </div>
        </div>
        <div className='userActions'>
          {/* Search */}
          <div className='input-group'>
            <input
              type='text'
              className='form-control form-control-sm'
              placeholder='Search'
              aria-describedby='search-button'
            />
            <button
              className='btn btn-outline-secondary btn-sm'
              type='button'
              id='search-button'
            >
              Search
            </button>
          </div>

          {/* Filter */}
          <div className='input-group'>
            <select className='form-select form-select-sm'>
              <option>Filter by priority...</option>
              <option value='High'>High</option>
              <option value='Low'>Low</option>
              <option value='Medium'>Medium</option>
            </select>
            <button className='btn btn-outline-secondary  btn-sm' type='button'>
              Filter
            </button>
          </div>

          <div className='input-group'>
            <select className='form-select form-select-sm'>
              <option>Filter by status...</option>
              <option value='Assigned'>Assigned</option>
              <option value='Closed'>Closed</option>
              <option value='Open'>Open</option>
            </select>
            <button className='btn btn-outline-secondary btn-sm' type='button'>
              Filter
            </button>
          </div>

          <button type='button' className='btn btn-success btn-sm'>
            New Ticket
          </button>
        </div>{' '}
        {/* end userActions */}
        <div className='table-responsive mt-3'>
          {tickets.length > 0 ? (
            <table className='table table-striped table-bordered table-hover table-sm'>
              <thead>
                <tr>
                  <th scope='col'>Ticket #</th>
                  <th scope='col'>Title</th>
                  <th scope='col'>Description</th>
                  <th scope='col'>Priority</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Assigned To</th>
                  <th scope='col'>Created On</th>
                  <th scope='col' className='text-center'>
                    View
                  </th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>{ticket.ticketNumber}</td>
                    <td>{ticket.title}</td>
                    <td className='truncate'>{ticket.description}</td>
                    <td
                      className={`text-uppercase text-${
                        ticket.priority === 'High'
                          ? 'danger'
                          : ticket.priority === 'Medium'
                          ? 'warning'
                          : 'success'
                      }`}
                    >
                      {ticket.priority}
                    </td>
                    <td>
                      <span
                        className={`badge rounded-pill text-bg-${
                          ticket.status === 'Closed'
                            ? 'success'
                            : ticket.status === 'Assigned'
                            ? 'warning'
                            : 'danger'
                        } text-uppercase`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td>
                      {ticket.assignedTo
                        ? users.find(
                            (user) => +user.id === +ticket.assignedTo
                          ) &&
                          users.find((user) => +user.id === +ticket.assignedTo)
                            .username
                        : 'UNASSIGNED'}
                    </td>
                    <td>{ticket.dateCreated}</td>
                    <td className='text-center'>
                      <Link to={`/view-ticket/${ticket.id}`} state={{ ticket }}>
                        <i
                          className='bi bi-three-dots'
                          style={{ fontSize: '1.2rem' }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className='alert alert-info text-center fs-6' role='alert'>
              You have no tickets yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserView;
