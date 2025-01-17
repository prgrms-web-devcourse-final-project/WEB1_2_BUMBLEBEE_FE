import { deleteBusiness } from '@apis/business';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useDeleteBusiness = () => {
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: () => deleteBusiness(),
    onSuccess: () => {
      navigate('/');
    },
  });

  return deleteMutation;
};

export default useDeleteBusiness;
