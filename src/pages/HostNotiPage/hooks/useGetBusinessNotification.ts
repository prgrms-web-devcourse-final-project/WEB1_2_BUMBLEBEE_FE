import {
  getBusinessReservationAlarm,
  getBusinessReviewAlarm,
} from '@apis/business';
import { useQuery } from '@tanstack/react-query';
import { BusinessNotification } from '@typings/types';

const useGetBusinessNotification = () => {
  const { data } = useQuery({
    queryKey: ['businessNotification'],
    queryFn: async () => {
      const reservationNoti = await getBusinessReservationAlarm();
      const reviewNoti = await getBusinessReviewAlarm();

      const wholeNotiList: BusinessNotification[] = [
        ...reservationNoti,
        ...reviewNoti,
      ];

      return wholeNotiList;
    },
  });
  return { allNotification: data ?? [] };
};

export default useGetBusinessNotification;
