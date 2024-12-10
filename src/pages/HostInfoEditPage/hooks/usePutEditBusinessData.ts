import { putEditBusinessInformation } from '@apis/business';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Business } from '@typings/types';
import { useNavigate } from 'react-router-dom';

const usePutEditBusinessData = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const editBusiness = useMutation({
    mutationFn: (business: Business) => putEditBusinessInformation(business),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business'] });
      navigate('/host-info');
    },
  });

  return editBusiness;
};

export default usePutEditBusinessData;
