import { postUserLogin } from '@apis/auth';
import useAuthStore from '@store/authStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useUserLogIn = () => {
  const navigate = useNavigate();
  const { storeLogin } = useAuthStore();

  return useMutation({
    mutationFn: postUserLogin,
    onSuccess: () => {
      storeLogin();
      navigate('/');
    },
  });
};

export default useUserLogIn;
