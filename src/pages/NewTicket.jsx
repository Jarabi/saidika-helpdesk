import { useEffect, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../context/AuthProvider';
import axios from '../api/client';

const NewTicket = () => {
  const { auth } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');
  const [formErrors, setFormErrors] = useState({});
  // const navigate = useNavigate();

  useEffect(() => {
    document.title = 'New Ticket | Saidika Helpdesk';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (title === '' || title === null) {
      validationErrors.title = 'Title is required';
    }

    if (priority === '' || priority === 'Set Priority') {
      validationErrors.priority = 'Set Priority';
    }

    if (description === '' || description === null) {
      validationErrors.description = 'Provide ticket description';
    }

    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const tickets = await axios.get('/tickets');
        const newTicket = {
          id: uuidv4(),
          ticketNumber: `T-${(tickets.data.length + 1)
            .toString()
            .padStart(4, '0')}`,
          title,
          priority,
          description,
          dateCreated: new Date().toLocaleString(),
          status: 'Open',
          userId: auth.id,
        };
        await axios.post('/tickets', newTicket);
        toast.success('Ticket created successfully', {
          position: 'top-center',
        });
        setTitle('');
        setPriority('');
        setDescription('');
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
                New Ticket
              </h3>
              <hr className='mb-5' style={{ color: '#ff5722' }} />
              <div className='row mb-5'>
                <div
                  className={`col-md-6 ${formErrors.title && 'text-danger'}`}
                >
                  <label className='text-uppercase mb-2'>Title</label>
                  <input
                    type='text'
                    name='title'
                    className='form-control'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    autoFocus
                  />
                  {formErrors.title && (
                    <span className='invalidMessage'>{formErrors.title}</span>
                  )}
                </div>
                <div
                  className={`col-md-6 ${formErrors.priority && 'text-danger'}`}
                >
                  <label className='text-uppercase mb-2'>priority</label>
                  <select
                    name='priority'
                    className='form-select'
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option>Set Priority</option>
                    <option value='Low'>Low</option>
                    <option value='medium'>Medium</option>
                    <option value='High'>High</option>
                  </select>
                  {formErrors.priority && (
                    <span className='invalidMessage'>
                      {formErrors.priority}
                    </span>
                  )}
                </div>
              </div>
              <div className='row mb-4'>
                <div
                  className={`col-md-12 ${
                    formErrors.description && 'text-danger'
                  }`}
                >
                  <label className='text-uppercase mb-2'>Description</label>
                  <textarea
                    name='description'
                    className='form-control'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  ></textarea>
                  {formErrors.description && (
                    <span className='invalidMessage'>
                      {formErrors.description}
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

export default NewTicket;
