import { deleteMember } from '@apis/member';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useDeleteMember = () => {
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: () => deleteMember(),
    onSuccess: () => {
      navigate('/');
    },
  });

  return deleteMutation;
};

export default useDeleteMember;
