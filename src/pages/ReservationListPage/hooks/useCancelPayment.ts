import { postCancelPayment } from '@apis/reservation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const useCancelPayment = () => {
  const queryClient = useQueryClient();

  // 토스트 알림으로 결제 취소 요청 중일 때, 성공했을 때 다르게 표시
  const cancelPayment = useMutation({
    mutationFn: (id: number) =>
      toast.promise(postCancelPayment(id), {
        pending: '결제 취소 요청중...',
        success: '결제 취소가 완료되었습니다.',
      }),
    onSuccess: () => {
      // 결제 취소 성공하면 예약 내역 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['myReservationList'] });
    },
  });
  return cancelPayment;
};

export default useCancelPayment;
