import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import axios from '../api/client';

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      // Remove use auth records from the server
      await axios.delete(`/auth/${auth.id}`);

      // Clear the auth context
      setAuth({});

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.log('Error logging out', error);
    }
  };

  return (
    <nav className='navbar navbar-expand-lg container-fluid'>
      <div className='container-fluid d-flex justify-content-end'>
        <div className='nav-items'>
          <ul className='navbar-nav d-flex flex-row justify-content-end'>
            <li className='nav-item me-4'>
              {auth.id ? (
                <div className='btn' onClick={logoutHandler}>
                  Logout
                </div>
              ) : (
                <Link className='nav-link' to='/login'>
                  Login
                </Link>
              )}
            </li>
            {auth?.role === '200' && (
              <li className='nav-item me-4'>
                <Link className='nav-link' to='/register'>
                  Register
                </Link>
              </li>
            )}

            {auth.id && (
              <li className='nav-item dropdown'>
                <a
                  className='nav-link dropdown-toggle'
                  href='#'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  Profile
                </a>
                <ul className='dropdown-menu'>
                  <li>
                    <a className='dropdown-item' href='#'>
                      Action
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='#'>
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className='dropdown-divider' />
                  </li>
                  <li>
                    <a className='dropdown-item' href='#'>
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
