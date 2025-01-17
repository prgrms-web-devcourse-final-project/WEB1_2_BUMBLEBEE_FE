import { deleteWorkPlace, deleteWorkPlaceImage } from '@apis/workplace';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteWorkplaceParams {
  workPlaceId: number;
  fileLocation: string;
}

const useDeleteBusinessPlace = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async ({
      workPlaceId,
      fileLocation,
    }: DeleteWorkplaceParams): Promise<void> => {
      await deleteWorkPlace(workPlaceId);
      await deleteWorkPlaceImage(fileLocation);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businessWorkplaces'] });
    },
  });

  return deleteMutation;
};

export default useDeleteBusinessPlace;
