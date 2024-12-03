import { postBusinessSignUp } from '@apis/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useBusinessSignUp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postBusinessSignUp,
    onSuccess: () => {
      navigate('/login/business');
    },
  });
};

export default useBusinessSignUp;
