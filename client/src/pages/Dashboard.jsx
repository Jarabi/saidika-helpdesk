/**
 * Components
 */
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserView from '../views/UserView';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Header />
      <UserView />
      <Footer />
    </div>
  );
}

export default Dashboard