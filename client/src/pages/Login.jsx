import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from '../api/client';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  // Set focus on email field automatically
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // Clear fields once email or password changes
  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      setEmail('');
      setPassword('');
      setSuccess(true);
    } catch (error) {
      setErrMsg('Invalid email or password');
      errRef.current.focus();
    }
  };
  return (
    <>
      <Header />
      <section className='login'>
        <div className='login-form'>
          {success ? (
            <>
              <p className='alert alert-success'>
                You have successfully logged in
              </p>
              <br />
              <p>
                <a href='#'>Go to Dashboard</a>
              </p>
            </>
          ) : (
            <>
              {/* Display error message at the top of the section */}
              <p
                ref={errRef}
                className={errMsg ? 'showErrMsg' : 'hideErrMsg'}
                aria-live='assertive'
              >
                {errMsg}
                Error
              </p>
              <h2>Sign In</h2>
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label htmlFor='email' className='form-label'>
                    Email
                  </label>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    ref={emailRef}
                    autoComplete='off'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='password' className='form-label'>
                    Password
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    autoComplete='off'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </div>
                <button type='submit' className='btn btn-primary'>
                  Sign In
                </button>
              </form>
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Login;
