import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../context/AuthProvider';
import axios from '../api/client';

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Login | Saidika Helpdesk';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    let isValid = true;

    if (email === '' || email === null) {
      isValid = false;
      validationErrors.email = 'Email is required';
    } else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      isValid = false;
      validationErrors.email = 'Invalid email address';
    }

    if (password === '' || password === null) {
      isValid = false;
      validationErrors.password = 'Password is required';
    }
    setFormErrors(validationErrors);

    if (isValid) {
      try {
        const response = await axios.get('/users');
        const foundUser = response.data.find((user) => user.email === email);

        if (foundUser) {
          if (foundUser.password === password) {
            const token = {
              id: foundUser.id,
              email: foundUser.email,
              role: foundUser.role,
            };
            // Check if user is already logged in
            const authenticatedUsers = await axios.get('/auth');
            const loggedInUser = authenticatedUsers.data.find(
              (user) => user.id === foundUser.id
            );

            if (foundUser.id !== loggedInUser?.id) {
              await axios.post('/auth', token);
            }
            setAuth(token);
            toast.success('Login successful', {
              autoClose: 500,
              onClose: () => navigate('/dashboard'),
            });
          } else {
            validationErrors.password = 'Incorrect password';
            console.log('Password:', validationErrors.password);
            setFormErrors(validationErrors);
          }
        } else {
          validationErrors.email = 'Email not found';
          console.log('Email:', validationErrors.email);
          setFormErrors(validationErrors);
        }
      } catch (error) {
        if (!error.response) {
          console.log('Network error:', error);
          toast.error('No server response');
        } else if (error.response?.status === 404) {
          console.log('Resource not found:', error);
          toast.error('Resource not found');
        } else if (error.response?.status === 500) {
          console.log('Server error:', error);
          toast.error('Server error');
        } else if (error.response?.status === 401) {
          console.log('Unauthorized:', error);
          toast.error('Unauthorized');
        } else {
          console.log('Login failed:', error);
          toast.error('Login failed');
        }
      }
    }
  };
  return (
    <>
      <ToastContainer />
      <section className='login bg-light'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-10 offset-lg-1'>
              <div className='bg-white shadow rounded'>
                <div className='row'>
                  <div className='col-md-7 pe-0'>
                    <div className='form-left h-100 py-5 px-5'>
                      <form onSubmit={handleSubmit} className='row g-4'>
                        <h3>Login</h3>
                        <hr />
                        <div
                          className={`col-md-12 ${
                            formErrors.email && 'text-danger'
                          }`}
                        >
                          <label>Email Address</label>
                          <div className='input-group mb-3'>
                            <span className='input-group-text'>@</span>
                            <input
                              type='text'
                              name='email'
                              className='form-control'
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                              autoFocus
                            />
                          </div>
                          {formErrors.email && (
                            <span className='invalidMessage'>
                              {formErrors.email}
                            </span>
                          )}
                        </div>

                        <div
                          className={`col-md-12 ${
                            formErrors.password && 'text-danger'
                          }`}
                        >
                          <label>Password</label>
                          <div className='input-group mb-3'>
                            <span className='input-group-text'>...</span>
                            <input
                              type='password'
                              name='password'
                              className='form-control'
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                          {formErrors.password && (
                            <span className='invalidMessage'>
                              {formErrors.password}
                            </span>
                          )}
                        </div>

                        {/* <div className='col-sm-6'>
                          <div className='form-check'>
                            <input
                              className='form-check-input'
                              type='checkbox'
                              id='inlineFormCheck'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='inlineFormCheck'
                            >
                              Remember me
                            </label>
                          </div>
                        </div> */}

                        {/* <div className='col-sm-6'>
                          <a href='#' className='float-end text-primary'>
                            Forgot Password?
                          </a>
                        </div> */}

                        <div className='col-12'>
                          <button className='btn btn-primary px-4'>
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className='col-md-5 ps-0 d-none d-md-block'>
                    <div className='form-right h-100'>
                      <h5>Welcome Back</h5>
                      <span className='login-logo'>S</span>
                      <h2>Saidika Helpdesk</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
