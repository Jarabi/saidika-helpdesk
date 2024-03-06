import PropTypes from 'prop-types';

const ViewTicket = ({ ticketObj, onEditTicket }) => {
  const {
    ticketNumber,
    title,
    description,
    priority,
    status,
    assignedTo,
    dateCreated,
  } = ticketObj;

  return (
    <section className='container-fluid viewTicket'>
      <div className='viewTitle'>
        <h3 style={{ color: '#ff5722' }}>Ticket Details</h3>
      </div>
      <div className='ticket-details w-100 mt-4'>
        <p className='ms-2 fs-4'>
          Ticket Number:&nbsp;&nbsp;
          <span className='ticket-number fs-3'>{ticketNumber}</span>
        </p>
      </div>

      <table className='table'>
        <tbody>
          <tr>
            <th>TITLE</th>
            <td>{title}</td>
          </tr>
          <tr>
            <th>DESCRIPTION</th>
            <td>{description}</td>
          </tr>
          <tr>
            <th>PRIORITY</th>
            <td
              className={`text-uppercase text-${
                priority === 'High'
                  ? 'danger'
                  : priority === 'Medium'
                  ? 'warning'
                  : 'success'
              }`}
            >
              {priority}
            </td>
          </tr>
          <tr>
            <th>STATUS</th>
            <td
              className={`text-uppercase text-${
                status === 'Closed'
                  ? 'success'
                  : status === 'Assigned'
                  ? 'warning'
                  : 'danger'
              } text-uppercase`}
            >
              {status}
            </td>
          </tr>
          <tr>
            <th>TECH ASSIGNED</th>
            <td>
              {assignedTo ? assignedTo : 'UNASSIGNED'}
              {/* {assignedTo
                ? users.find((user) => +user.id === +ticket.assignedTo) &&
                  users.find((user) => +user.id === +ticket.assignedTo).username
                : 'UNASSIGNED'} */}
            </td>
          </tr>
          <tr>
            <th>DATE CREATED</th>
            <td>{dateCreated}</td>
          </tr>
        </tbody>
      </table>
      <div className='cta'>
        <button
          className='btn btn-success btn-lg'
          onClick={() => onEditTicket('edit-ticket')}
        >
          Edit Ticket
        </button>
      </div>
    </section>
  );
};

ViewTicket.propTypes = {
  ticketObj: PropTypes.object.isRequired,
  onEditTicket: PropTypes.func.isRequired,
};

export default ViewTicket;
