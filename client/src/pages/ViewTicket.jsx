import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const ViewTicket = () => {
  let { state } = useLocation();
  console.log(state);
  return (
    <section className='viewTicket'>
      <div className='container'>
        <div className='row'>
          <table className='table table-striped table-hover table-sm'>
            <thead>
              <tr>
                <th scope='col' colSpan={2} className='fs-4'>
                  Ticket Details
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Ticket #</th>
                <td>{state.ticket.ticketNumber}</td>
              </tr>
              <tr>
                <th>Title</th>
                <td>{state.ticket.title}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>{state.ticket.description}</td>
              </tr>
              <tr>
                <th>Priority</th>
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
              </tr>
              <tr>
                <th>Status</th>
                <td>
                  <span
                    className={`badge rounded-pill text-bg-${
                      state.ticket.status === 'Closed'
                        ? 'success'
                        : state.ticket.status === 'Assigned'
                        ? 'warning'
                        : 'danger'
                    } text-uppercase`}
                  >
                    {state.ticket.status}
                  </span>
                </td>
              </tr>
              <tr>
                <th>Assigned To</th>
                <td>
                  {state.ticket.assignedTo}
                  {/* {state.ticket.assignedTo
                ? users.find((user) => +user.id === +ticket.assignedTo) &&
                  users.find((user) => +user.id === +ticket.assignedTo).username
                : 'UNASSIGNED'} */}
                </td>
              </tr>
              <tr>
                <th>Created On</th>
                <td>{state.ticket.dateCreated}</td>
              </tr>
            </tbody>
          </table>
          <Link className='btn btn-secondary' to='/dashboard'>
            Back
          </Link>
        </div>
      </div>
    </section>
  );
};

ViewTicket.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ViewTicket;
