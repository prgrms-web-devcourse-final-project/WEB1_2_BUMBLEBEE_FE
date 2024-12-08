// import {
//   getBusinessReservationAlarm,
//   getBusinessReviewAlarm,
// } from '@apis/business';
// import { useQuery } from '@tanstack/react-query';

// const useGetBusinessNotification = () => {
//   const { data } = useQuery({
//     queryKey: ['businessNotification'],
//     queryFn: async () => {
//       const reservationNoti = await getBusinessReservationAlarm();
//       const reviewNoti = await getBusinessReviewAlarm();

//       const wholeNotiList = [...reservationNoti, ...reviewNoti];

//       return wholeNotiList;
//     },
//   });
//   return { data };
// };

// export default useGetBusinessNotification;
