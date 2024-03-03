import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header>
      <Link className='navbar-brand' to='/'>
        <span className='header-logo'>S</span>
        <span className='header-text'>Saidika Helpdesk</span>
      </Link>
      <Navbar />
    </header>
  );
};

export default Header;
