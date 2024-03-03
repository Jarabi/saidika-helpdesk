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
    <div className='container-fluid pageView'>
      {/* <div className='pageHeader fs-4'>Dashboard</div> */}
      <div className='pageContent'>
        <div className='row cards'>
          <div className='text-center mb-3 fs-4'>My Tickets</div>

          <div className='col-md-3 mb-3'>
            <div className='card text-bg-info h-55'>
              <div className='card-header fw-bold text-center'>
                Total Tickets
              </div>
              <div className='card-body'>
                <h5 className='card-title text-center'>{totalTockets}</h5>
              </div>
            </div>
          </div>

          <div className='col-md-3 mb-3'>
            <div className='card text-bg-success h-55'>
              <div className='card-header fw-bold text-center'>
                Tickets Resolved
              </div>
              <div className='card-body'>
                <h5 className='card-title text-center'>{ticketsResolved}</h5>
              </div>
            </div>
          </div>

          <div className='col-md-3 mb-3'>
            <div className='card text-bg-warning h-55'>
              <div className='card-header fw-bold text-center'>
                Tickets In Progress
              </div>
              <div className='card-body'>
                <h5 className='card-title text-center'>{ticketsInProgress}</h5>
              </div>
            </div>
          </div>

          <div className='col-md-3 mb-3'>
            <div className='card text-bg-danger h-55'>
              <div className='card-header fw-bold text-center'>
                Tickets Pending
              </div>
              <div className='card-body'>
                <h5 className='card-title text-center'>{ticketsPending}</h5>
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
            <select className='form-select form-select'>
              <option>Filter by status...</option>
              <option value='Assigned'>Assigned</option>
              <option value='Closed'>Closed</option>
              <option value='Open'>Open</option>
            </select>
            <button className='btn btn-outline-secondary btn-sm' type='button'>
              Filter
            </button>
          </div>

          <button type='button' className='btn btn-success'>
            New Ticket
          </button>
        </div>{' '}
        {/* end userActions */}
        <div className='table-responsive mt-3'>
          {tickets.length > 0 ? (
            <table className='table table-striped table-hover table-sm'>
              <thead>
                <tr>
                  <th scope='col'>Ticket #</th>
                  <th scope='col'>Title</th>
                  <th scope='col'>Description</th>
                  <th scope='col'>Priority</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Assigned To</th>
                  <th scope='col'>Created On</th>
                  <th scope='col'>VIEW</th>
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
                      <Link
                        className='btn btn-outline-secondary btn-sm'
                        to={`/view-ticket/${ticket.id}`}
                        state={{ ticket }}
                      >
                        ...
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className='alert alert-info text-center fs-4' role='alert'>
              You have no tickets yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserView;
