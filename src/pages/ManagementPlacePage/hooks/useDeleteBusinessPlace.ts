import { deleteWorkPlace } from '@apis/workplace';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteBusinessPlace = (workplaceId: number) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteWorkPlace(workplaceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businessWorkplaces'] });
    },
  });

  return deleteMutation;
};

export default useDeleteBusinessPlace;
