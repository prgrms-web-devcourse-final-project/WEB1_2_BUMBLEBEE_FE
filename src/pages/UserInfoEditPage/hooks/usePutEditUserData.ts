import { putEditMemberInformation } from '@apis/member';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Member } from '@typings/types';
import { useNavigate } from 'react-router-dom';

const usePutEditUserData = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const editUser = useMutation({
    mutationFn: (user: Member) => putEditMemberInformation(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member'] });
      navigate('/user-info');
    },
  });

  return editUser;
};

export default usePutEditUserData;
