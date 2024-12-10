import {
  OrderFormData,
  PaymentFailData,
  PaymentsFail,
  PaymentsSuccess,
  PaymentsSuccessData,
  PostPaymentsData,
  PostReservationData,
  Reservation,
  ReserverInfo,
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
  return response.data.reservationId;
};

// 사용자의 최근 예약 전체 조회
export const getAllReservation = async (): Promise<Reservation[]> => {
  const response = await authInstance.get('/api/v1/all/reservations/member');
  return response.data;
};

// 사용자의 최근 예약 한 건 조회
export const getLatestReservation = async (): Promise<Reservation> => {
  const response = await authInstance.get('/api/v1/reservations/member');
  return response.data;
};

// 사업자의 예약자 조회
export const getAllReserver = async (): Promise<ReserverInfo[]> => {
  const response = await authInstance.get('/api/v1/reservations/all/workplace');
  return response.data;
};

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
export const getPaymentsSuccess = async (
  payment: PaymentsSuccess,
): Promise<PaymentsSuccessData> => {
  const response = await authInstance.get('/api/v1/payments/toss/success', {
    params: {
      paymentKey: payment.paymentKey,
      orderId: payment.orderId,
      amount: payment.amount,
    },
  });

  return response.data;
};

// 결제 실패
export const getPaymentsFail = async (
  payment: PaymentsFail,
): Promise<PaymentFailData> => {
  const response = await authInstance.get('/api/v1/payments/toss/fail', {
    params: {
      code: payment.code,
      message: payment.message,
      orderId: payment.orderId,
    },
  });

  return response.data;
};

// 결제 취소
export const postCancelPayment = async (
  reservationId: number,
): Promise<void> => {
  const cancelReason = '단순변심';
  await authInstance.post(
    `/api/v1/payments/toss/cancel?reservationId=${reservationId}&cancelReason=${cancelReason}`,
  );
};
