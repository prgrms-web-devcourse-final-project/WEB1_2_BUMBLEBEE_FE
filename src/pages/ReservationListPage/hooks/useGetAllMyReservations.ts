import { useGetAllReservations } from '@pages/UserMypage/hooks/useGetMyReservations';

const useGetAllMyReservations = () => {
  const { data } = useGetAllReservations();
  const reservations = data ? data.reservations : [];

  return reservations;
};

export default useGetAllMyReservations;
