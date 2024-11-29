import useAuthStore from '@store/authStore';
import { setAuthToken } from '@utils/auth';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { storeLogin } = useAuthStore();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const accessToken = query.get('accessToken');
    if (accessToken) {
      setAuthToken(accessToken);
      storeLogin();
      navigate('/');
    } else {
      navigate('/login/user');
    }
  }, [location.search, navigate, storeLogin]);
  return null;
};

export default OAuth;
