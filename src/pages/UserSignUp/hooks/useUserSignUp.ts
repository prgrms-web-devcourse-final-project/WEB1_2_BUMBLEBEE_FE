import { postUserSignUp } from '@apis/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useUserSignUp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postUserSignUp,
    onSuccess: () => {
      navigate('/login/user');
    },
  });
};

export default useUserSignUp;
