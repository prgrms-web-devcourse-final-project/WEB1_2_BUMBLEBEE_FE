import { postCancelPayment } from '@apis/reservation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCancelPayment = () => {
  const queryClient = useQueryClient();

  const cancelPayment = useMutation({
    mutationFn: (id: number) => postCancelPayment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myReservationList', 'latestReservation'],
      });
    },
  });
  return cancelPayment;
};

export default useCancelPayment;
