import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from '../api/client';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  // const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    password: '',
    confirmpassword: '',
  });

  const [formErrors, setFormErrors] = useState({});

  // Fetch roles from the server and populate the dropdown
  const fetchRoles = async () => {
    try {
      const response = await axios.get('/roles');
      return response.data;
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  useEffect(() => {
    document.title = 'Register | Saidika Helpdesk';
  }, []);

  useEffect(() => {
    const getRoles = async () => {
      const allRoles = await fetchRoles();
      if (allRoles) setRoles(allRoles);
    };
    getRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (formData.firstname === '' || formData.firstname === null) {
      validationErrors.firstname = 'First name is required';
    }

    if (formData.lastname === '' || formData.lastname === null) {
      validationErrors.lastname = 'Last name is required';
    }

    if (formData.email === '' || formData.email === null) {
      validationErrors.email = 'Email is required';
    } else if (!formData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      validationErrors.email = 'Invalid email address';
    }

    if (formData.role === 'Select Role') {
      validationErrors.role = 'Select a role';
    }

    if (formData.password === '' || formData.password === null) {
      validationErrors.password = 'Please enter password';
    } else if (formData.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.confirmpassword === '' || formData.confirmpassword === null) {
      validationErrors.confirmpassword = 'Please confirm password';
    } else if (formData.confirmpassword !== formData.password) {
      validationErrors.confirmpassword = 'Passwords do not match';
    }

    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      let newUser = (({ confirmpassword, ...object }) => object)(formData);
      newUser.id = uuidv4();
      try {
        const response = await axios.post('/users', newUser);
        console.log(response.data);
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          role: 'Select Role',
          password: '',
          confirmpassword: '',
        });

        toast.success('User registered successfully');
        // navigate('/login');
      } catch (error) {
        console.error('Error registering user:', error);
        toast.error('Error registering user');
      }
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <section className='register'>
        <div className='row register-form'>
          <div className='col-md-6 offset-md-3'>
            <div className='signup-form'>
              <form
                onSubmit={handleSubmit}
                className='mt-5 border p-4 bg-light shadow'
              >
                <h4 className='mb-3 text-secondary'>Register Account</h4>
                <hr />
                <div className='row'>
                  <div
                    className={`mb-3 col-md-6 ${
                      formErrors.firstname && 'text-danger'
                    }`}
                  >
                    <label>First Name</label>
                    <input
                      type='text'
                      name='firstname'
                      className='form-control'
                      value={formData.firstname}
                      onChange={(e) =>
                        setFormData({ ...formData, firstname: e.target.value })
                      }
                    />
                    {formErrors.firstname && (
                      <span className='invalidMessage'>
                        {formErrors.firstname}
                      </span>
                    )}
                  </div>

                  <div
                    className={`mb-3 col-md-6 ${
                      formErrors.lastname && 'text-danger'
                    }`}
                  >
                    <label>Last Name</label>
                    <input
                      type='text'
                      name='lastname'
                      className='form-control'
                      value={formData.lastname}
                      onChange={(e) =>
                        setFormData({ ...formData, lastname: e.target.value })
                      }
                    />
                    {formErrors.lastname && (
                      <span className='invalidMessage'>
                        {formErrors.lastname}
                      </span>
                    )}
                  </div>

                  <div
                    className={`mb-3 col-md-12 ${
                      formErrors.email && 'text-danger'
                    }`}
                  >
                    <label>Email</label>
                    <input
                      type='email'
                      name='email'
                      className='form-control'
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    {formErrors.email && (
                      <span className='invalidMessage'>{formErrors.email}</span>
                    )}
                  </div>

                  <div
                    className={`mb-3 col-md-12 ${
                      formErrors.role && 'text-danger'
                    }`}
                  >
                    <label>Role</label>
                    <select
                      name='role'
                      className='form-select'
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                    >
                      <option>Select Role</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.role && (
                      <span className='invalidMessage'>{formErrors.role}</span>
                    )}
                  </div>

                  <div
                    className={`mb-3 col-md-12 ${
                      formErrors.password && 'text-danger'
                    }`}
                  >
                    <label>Password</label>
                    <input
                      type='password'
                      name='password'
                      className='form-control'
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    {formErrors.password && (
                      <span className='invalidMessage'>
                        {formErrors.password}
                      </span>
                    )}
                  </div>
                  <div
                    className={`mb-3 col-md-12 ${
                      formErrors.confirmpassword && 'text-danger'
                    }`}
                  >
                    <label>Confirm Password</label>
                    <input
                      type='password'
                      name='confirmpassword'
                      className='form-control'
                      value={formData.confirmpassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmpassword: e.target.value,
                        })
                      }
                    />
                    {formErrors.confirmpassword && (
                      <span className='invalidMessage'>
                        {formErrors.confirmpassword}
                      </span>
                    )}
                  </div>
                  <div className='col-md-12'>
                    <button className='btn btn-primary'>Register</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Register;
