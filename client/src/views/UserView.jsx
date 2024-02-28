import { useState, useEffect } from 'react';
// import {uuid} from 'uuid';
import api from '../api/client';

const UserView = () => {
  const [tickets, setTickets] = useState([]);

  // Retrieve tickets from the API
  const fetchTickets = async () => {
    try {
      const response = await api.get('/tickets');
      return response.data;
    } catch (error) {
      console.error('Error fetching tickets', error);
    }
  };

  useEffect(() => {
    const getTickets = async () => {
      const allTickets = await fetchTickets();
      if (allTickets) setTickets(allTickets);
    };
    getTickets();
  }, []);

  return (
    <div className='pageView'>
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
                <h5 className='card-title text-center'>12</h5>
              </div>
            </div>
          </div>

          <div className='col-md-3 mb-3'>
            <div className='card text-bg-success h-55'>
              <div className='card-header fw-bold text-center'>
                Tickets Resolved
              </div>
              <div className='card-body'>
                <h5 className='card-title text-center'>8</h5>
              </div>
            </div>
          </div>

          <div className='col-md-3 mb-3'>
            <div className='card text-bg-warning h-55'>
              <div className='card-header fw-bold text-center'>
                Tickets In Progress
              </div>
              <div className='card-body'>
                <h5 className='card-title text-center'>2</h5>
              </div>
            </div>
          </div>

          <div className='col-md-3 mb-3'>
            <div className='card text-bg-danger h-55'>
              <div className='card-header fw-bold text-center'>
                Tickets Pending
              </div>
              <div className='card-body'>
                <h5 className='card-title text-center'>2</h5>
              </div>
            </div>
          </div>
        </div>
        <div className='userActions'>
          {/* Search */}
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Search'
              aria-describedby='search-button'
            />
            <button
              className='btn btn-outline-secondary'
              type='button'
              id='search-button'
            >
              Search
            </button>
          </div>

          {/* Filter */}
          <div className='input-group'>
            <select className='form-select'>
              <option selected>Filter by priority...</option>
              <option value='High'>High</option>
              <option value='Low'>Low</option>
              <option value='Medium'>Medium</option>
            </select>
            <button className='btn btn-outline-secondary' type='button'>
              Filter
            </button>
          </div>

          <div className='input-group'>
            <select className='form-select'>
              <option selected>Filter by status...</option>
              <option value='Assigned'>Assigned</option>
              <option value='Closed'>Closed</option>
              <option value='Open'>Open</option>
            </select>
            <button className='btn btn-outline-secondary' type='button'>
              Filter
            </button>
          </div>

          <button type='button' className='btn btn-success'>
            New Ticket
          </button>
        </div>{' '}
        {/* end userActions */}
        <div className='table-responsive mt-3'>
          <table className='table table-striped table-hover table-sm'>
            <thead>
              <tr>
                {/* <th scope="col">ID</th> */}
                <th scope='col'>Title</th>
                <th scope='col'>Priority</th>
                <th scope='col'>Status</th>
                <th scope='col'>Assigned To</th>
                <th scope='col'>Created On</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  {/* <td>{ticket.id}</td> */}
                  <td className='view-ticket'>
                    <a href='#'>{ticket.title}</a>
                  </td>
                  <td
                    className={`text-uppercase text-${
                      ticket.priority === 'High'
                        ? 'danger'
                        : ticket.priority === 'Medium'
                        ? 'success'
                        : 'info'
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
                  <td>{ticket.assignedTo}</td>
                  <td>{ticket.createdAt}</td>
                  <td>
                    {/* <button type="button" className="btn btn-primary btn-sm">Edit</button> */}
                    <button
                      type='button'
                      className='btn btn-outline-danger btn-sm'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserView;
