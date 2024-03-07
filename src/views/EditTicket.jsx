import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../api/client';

const EditTicket = ({ ticketObj }) => {
  const { id, title, description, priority } = ticketObj;

  const [editPriority, setEditPriority] = useState(priority);
  const [editDescription, setEditDescription] = useState(description);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'New Ticket | Saidika Helpdesk';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (editPriority === '' || editPriority === 'Set Priority') {
      validationErrors.editPriority = 'Set Priority';
    }

    if (editDescription === '' || editDescription === null) {
      validationErrors.editDescription = 'Provide ticket description';
    }

    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const editTicket = {
          priority: editPriority,
          description: editDescription,
        };
        await axios.patch(`/tickets/${id}`, editTicket);
        toast.success('Ticket edit successfully', {
          position: 'top-center',
          autoClose: 500,
          onClose: () => navigate('/dashboard'),
        });
      } catch (error) {
        console.error('Error creating ticket:', error);
        toast.error('Error creating ticket', {
          position: 'top-center',
        });
      }
    }
  };
  return (
    <>
      <ToastContainer />
      <div className='container-fluid'>
        <div className='bg-white shadow rounded'>
          <div className='py-5 px-5'>
            <form onSubmit={handleSubmit} className='row g-4'>
              <h3 className='text-center' style={{ color: '#ff5722' }}>
                Edit Ticket
              </h3>
              <hr className='mb-5' style={{ color: '#ff5722' }} />
              <div className='row mb-5'>
                <div className='col-md-6'>
                  <label className='text-uppercase mb-2'>Title</label>
                  <input
                    type='text'
                    name='title'
                    className='form-control'
                    value={title}
                    disabled
                  />
                </div>
                <div
                  className={`col-md-6 ${
                    formErrors.editPriority && 'text-danger'
                  }`}
                >
                  <label className='text-uppercase mb-2'>priority</label>
                  <select
                    name='editPriority'
                    className='form-select'
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                  >
                    <option>Set Priority</option>
                    <option value='Low'>Low</option>
                    <option value='Medium'>Medium</option>
                    <option value='High'>High</option>
                  </select>
                  {formErrors.editPriority && (
                    <span className='invalidMessage'>
                      {formErrors.editPriority}
                    </span>
                  )}
                </div>
              </div>
              <div className='row mb-4'>
                <div
                  className={`col-md-12 ${
                    formErrors.editDescription && 'text-danger'
                  }`}
                >
                  <label className='text-uppercase mb-2'>Description</label>
                  <textarea
                    name='editDescription'
                    className='form-control'
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={3}
                  ></textarea>
                  {formErrors.editDescription && (
                    <span className='invalidMessage'>
                      {formErrors.editDescription}
                    </span>
                  )}
                </div>
              </div>
              <div className='cta'>
                <button className='btn btn-success px-4 btn-lg'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

EditTicket.propTypes = {
  ticketObj: PropTypes.object.isRequired,
};

export default EditTicket;
