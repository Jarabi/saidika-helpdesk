import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const ViewTicket = () => {
  let { state } = useLocation();
  return (
    <section className='container-fluid pageView'>
      <div className='pageContent'>
        <div className='viewTicket'>
          <div className='pageHeader'>
            <h5 className='pageTitle'>Ticket Details</h5>
            <div className='close-page d-flex justify-content-end'>
              <Link to='/dashboard'>
                <i
                  className='bi bi-x-circle'
                  style={{ fontSize: '2.5rem', color: '#3f3f3f' }}
                ></i>
              </Link>
            </div>
          </div>
          <div className='ticket-details w-100 mt-4'>
            <p className='ms-2 fs-4'>
              Ticket Number:&nbsp;&nbsp;
              <span className='ticket-number fs-3'>
                {state.ticket.ticketNumber}
              </span>
            </p>
          </div>

          <table className='table table-striped'>
            <tbody>
              <tr>
                <th>TITLE</th>
                <th>DESCRIPTION</th>
              </tr>
              <tr>
                <td>{state.ticket.title}</td>
                <td>{state.ticket.description}</td>
              </tr>
              <tr>
                <th>PRIORITY</th>
                <th>STATUS</th>
              </tr>
              <tr>
                <td
                  className={`text-uppercase text-${
                    state.ticket.priority === 'High'
                      ? 'danger'
                      : state.ticket.priority === 'Medium'
                      ? 'warning'
                      : 'success'
                  }`}
                >
                  {state.ticket.priority}
                </td>
                <td
                  className={`text-uppercase text-${
                    state.ticket.status === 'Closed'
                      ? 'success'
                      : state.ticket.status === 'Assigned'
                      ? 'warning'
                      : 'danger'
                  } text-uppercase`}
                >
                  {state.ticket.status}
                </td>
              </tr>
              <tr>
                <th>TECH ASSIGNED</th>
                <th>DATE CREATED</th>
              </tr>
              <tr>
                <td>
                  {state.ticket.assignedTo
                    ? state.ticket.assignedTo
                    : 'UNASSIGNED'}
                  {/* {state.ticket.assignedTo
                ? users.find((user) => +user.id === +ticket.assignedTo) &&
                  users.find((user) => +user.id === +ticket.assignedTo).username
                : 'UNASSIGNED'} */}
                </td>
                <td>{state.ticket.dateCreated}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

ViewTicket.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ViewTicket;
