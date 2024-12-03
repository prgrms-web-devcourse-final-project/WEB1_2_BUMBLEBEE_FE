import { postWorkPlace } from '@apis/workplace';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const usePostWorkPlace = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postWorkPlace,
    onSuccess: () => {
      navigate('/');
    },
  });
};

export default usePostWorkPlace;
