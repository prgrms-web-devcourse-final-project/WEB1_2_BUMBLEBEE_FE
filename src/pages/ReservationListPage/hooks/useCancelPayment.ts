import { postCancelPayment } from '@apis/reservation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const useCancelPayment = () => {
  const queryClient = useQueryClient();

  const cancelPayment = useMutation({
    mutationFn: (id: number) => postCancelPayment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myReservationList', 'latestReservation'],
      });
      toast.info('결제가 취소되었습니다.');
    },
  });
  return cancelPayment;
};

export default useCancelPayment;
