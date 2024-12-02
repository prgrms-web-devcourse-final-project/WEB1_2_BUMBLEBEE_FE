import {
  GetAllReservationData,
  OrderFormData,
  PaymentFailData,
  PaymentsFail,
  PaymentsSuccess,
  PaymentsSuccessData,
  PostPaymentsData,
  PostReservationData,
} from '@typings/types';
import { authInstance } from '.';

// 예약 등록
export const postReservation = async (
  studyroomId: number,
  reservation: PostReservationData,
): Promise<number> => {
  const response = await authInstance.post(
    `/api/v1/reservations/${studyroomId}`,
    reservation,
  );
  return response.data;
};

// 사용자의 최근 예약 전체 조회
export const getAllReservation = async (): Promise<GetAllReservationData> => {
  const response = await authInstance.get(`/api/v1/reservations/member`);
  return response.data;
};

// 사업자의 예약자 조회

// 결제 검증
export const postPaymentsToss = async (
  reservationId: number,
  orderForm: OrderFormData,
): Promise<PostPaymentsData> => {
  const response = await authInstance.post(
    `/api/v1/payments/toss?reservationId=${reservationId}`,
    orderForm,
  );
  return response.data;
};

// 결제 성공
export const postPaymentsSuccess = async (
  payment: PaymentsSuccess,
): Promise<PaymentsSuccessData> => {
  const response = await authInstance.post('/api/v1/payments/toss/success', {
    params: {
      paymentKey: payment.paymentKey,
      orderId: payment.orderId,
      amount: payment.amount,
    },
  });

  return response.data;
};

// 결제 실패
export const postPaymentsFail = async (
  payment: PaymentsFail,
): Promise<PaymentFailData> => {
  const response = await authInstance.post('/api/v1/payments/toss/fail', {
    params: {
      code: payment.code,
      message: payment.message,
      orderId: payment.orderId,
    },
  });

  return response.data;
};
