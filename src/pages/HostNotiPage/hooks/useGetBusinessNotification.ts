import {
  getBusinessReservationAlarm,
  getBusinessReviewAlarm,
} from '@apis/business';
import { useQuery } from '@tanstack/react-query';
import { BusinessNotification } from '@typings/types';

const useGetBusinessNotification = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['businessNotification'],
    queryFn: async () => {
      let wholeNotiList: BusinessNotification[] = [];
      const reservationNoti = await getBusinessReservationAlarm();
      const reviewNoti = await getBusinessReviewAlarm();

      if (reservationNoti || reviewNoti) {
        wholeNotiList = [...reservationNoti, ...reviewNoti];
      }

      return wholeNotiList;
    },
  });
  return { allNotification: data ?? [], isLoading };
};

export default useGetBusinessNotification;
