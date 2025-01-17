import { postBusinessLogin } from '@apis/auth';
import useAuthStore from '@store/authStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useBusinessLogIn = () => {
  const navigate = useNavigate();
  const { storeLogin } = useAuthStore();

  return useMutation({
    mutationFn: postBusinessLogin,
    onSuccess: () => {
      storeLogin();
      navigate('/');
    },
  });
};

export default useBusinessLogIn;
