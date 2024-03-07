import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../context/AuthProvider';
import axios from '../api/client';

const CloseTicket = ({ ticketObj }) => {
  const { auth } = useContext(AuthContext);
  const {
    id,
    ticketNumber,
    title,
    description,
    priority,
    status,
    assignedTo,
    dateCreated,
    userId,
  } = ticketObj;

  const [comments, setComments] = useState('');
  const [ticketStatus, setTicketStatus] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (comments === '' || comments === null) {
      validationErrors.comments = 'Provide comments';
    }

    if (ticketStatus === '' || ticketStatus === 'Set Status') {
      validationErrors.ticketStatus = 'Set Status';
    }

    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const closeTicket = {
          comments,
          status: ticketStatus,
          assignedTo: auth.id,
          dateAssigned: new Date().toISOString(),
          dateClosed: ticketStatus === 'Closed' ? new Date().toISOString() : '',
        };
        await axios.patch(`/tickets/${id}`, closeTicket);
        toast.success(
          `Ticket ${
            ticketStatus === 'Closed' ? 'closed' : 'updated'
          } successfully`,
          {
            position: 'top-center',
            autoClose: 500,
          }
        );
      } catch (error) {
        console.error('Error closing ticket:', error);
        toast.error('Error closing ticket', {
          position: 'top-center',
        });
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <section className='container-fluid closeTicket'>
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
          <hr />
          <form onSubmit={handleSubmit} className='row g-4'>
            <div className={`col-md-6 ${formErrors.comments && 'text-danger'}`}>
              <label className='text-uppercase mb-2'>Comments</label>
              <textarea
                name='comments'
                className='form-control'
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={3}
              ></textarea>
              {formErrors.comments && (
                <span className='invalidMessage'>{formErrors.comments}</span>
              )}
            </div>

            <div
              className={`col-md-6 ${formErrors.ticketStatus && 'text-danger'}`}
            >
              <label className='text-uppercase mb-2'>Status</label>
              <select
                name='status'
                className='form-select'
                value={ticketStatus}
                onChange={(e) => setTicketStatus(e.target.value)}
              >
                <option>Set Status</option>
                <option value='Pending'>Pending</option>
                <option value='Closed'>Closed</option>
              </select>
              {formErrors.ticketStatus && (
                <span className='invalidMessage'>
                  {formErrors.ticketStatus}
                </span>
              )}
            </div>
            <div className='cta'>
              <button className='btn btn-success px-4 mt-4 btn-lg'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

CloseTicket.propTypes = {
  ticketObj: PropTypes.object.isRequired,
};

export default CloseTicket;
