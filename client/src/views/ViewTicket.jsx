import { useContext } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../context/AuthProvider';
// import axios from '../api/client';

const ViewTicket = ({ ticketObj, onEditTicket }) => {
  const { auth } = useContext(AuthContext);
  const {
    ticketNumber,
    title,
    description,
    priority,
    status,
    assignedTo,
    dateCreated,
    userId,
  } = ticketObj;
  // const [users, setUsers] = useState('');

  // const fetchUsers = async () => {
  //   try {
  //     const response = await axios.get('/users');
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching user', error);
  //   }
  // };

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const allUsers = await fetchUsers();
  //     if (allUsers) setUsers(allUsers);
  //   };
  //   getUsers();
  // }, []);

  return (
    <section className='container-fluid viewTicket'>
      <div className='viewTitle'>
        <h3 style={{ color: '#ff5722' }}>Ticket Details</h3>
        <p className='fs-5'>
          Ticket Number:&nbsp;&nbsp;
          <span className='ticket-number'>{ticketNumber}</span>
        </p>
      </div>

      <div className='ticketDetails m-4'>
        <div className='row'>
          <div className='col-md-3'>
            <h5>Title</h5>
            <p>{title}</p>
          </div>

          <div className='col-md-3'>
            <h5>User</h5>
            <p>{userId}</p>
          </div>

          <div className='col-md-3'>
            <h5>Priority</h5>
            <p
              className={`text-uppercase text-${
                priority === 'High'
                  ? 'danger'
                  : priority === 'Medium'
                  ? 'warning'
                  : 'success'
              }`}
            >
              {priority}
            </p>
          </div>

          <div className='col-md-3'>
            <h5>Status</h5>
            <p
              className={`text-uppercase text-${
                status === 'Closed'
                  ? 'success'
                  : status === 'Assigned'
                  ? 'warning'
                  : 'danger'
              } text-uppercase`}
            >
              {status}
            </p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'>
            <h5>Created</h5>
            <p>{dateCreated}</p>
          </div>
          <div className='col-md-3'>
            <h5>Tech Assigned</h5>
            <p>
              {assignedTo ? assignedTo : 'UNASSIGNED'}
              {/* {assignedTo
                ? users.find((user) => +user.id === +ticket.assignedTo) &&
                  users.find((user) => +user.id === +ticket.assignedTo).username
                : 'UNASSIGNED'} */}
            </p>
          </div>
          <div className='col-md-6'>
            <h5>Description</h5>
            <p>{description}</p>
          </div>
        </div>
      </div>

      <div className='cta'>
        {auth.id ? (
          <button
            className='btn btn-success btn-lg'
            onClick={() => onEditTicket('review-ticket')}
          >
            Review Ticket
          </button>
        ) : (
          <button
            className='btn btn-success btn-lg'
            onClick={() => onEditTicket('edit-ticket')}
          >
            Edit Ticket
          </button>
        )}
      </div>
    </section>
  );
};

ViewTicket.propTypes = {
  ticketObj: PropTypes.object.isRequired,
  onEditTicket: PropTypes.func.isRequired,
};

export default ViewTicket;
