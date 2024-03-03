import { useContext } from 'react';
import axios from '../api/client';
import AuthContext from '../context/AuthProvider';

export const useAuth = () => {
  const { auth } = useContext(AuthContext);

  const checkAuthenticated = async () => {
    if (auth?.id) {
      const response = await axios.get('/auth');
      const authenticatedUser = response?.data?.find(
        (user) => user.id === auth.id
      );
      if (!authenticatedUser) {
        return false;
      } else {
        return true;
      }
    }
  };

  return { isAuthenticated: checkAuthenticated };
};
