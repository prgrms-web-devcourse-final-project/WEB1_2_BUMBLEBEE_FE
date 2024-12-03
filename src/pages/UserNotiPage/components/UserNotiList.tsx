import { useEffect, useState } from 'react';
import { getWithinSevenDays } from '@utils/formatTime';
import UserNotiCard from './UserNotiCard';

export interface UserNotification {
  id: number;
  type: string;
  message: string;
  reservationInfo: string;
  price?: number;
  createdAt: string;
}

const allNotification: UserNotification[] = [
  {
    id: 1,
    type: 'upcoming',
    message: '방문 24시간 전입니다.',
    reservationInfo: '스터디랩 / ROOM A',
    createdAt: '2024-11-02T00:00:00',
  },
  {
    id: 2,
    type: 'upcoming',
    message: '방문 24시간 전입니다.',
    reservationInfo: '스터디랩 / ROOM A',
    createdAt: '2024-11-01T00:00:00',
  },
  {
    id: 3,
    type: 'completeReservation',
    message: '예약이 완료되었습니다.',
    reservationInfo: '스터디랩 / ROOM A',
    price: 8000,
    createdAt: '2024-10-11T14:00:00',
  },
  {
    id: 4,
    type: 'completeReservation',
    message: '예약이 완료되었습니다.',
    reservationInfo: '스터디랩 / ROOM A',
    price: 8000,
    createdAt: '2024-11-20T16:00:00',
  },
  {
    id: 5,
    type: 'completeReservation',
    message: '예약이 완료되었습니다.',
    reservationInfo: '스터디랩 / ROOM A',
    price: 8000,
    createdAt: '2024-11-10T13:00:00',
  },
];

const UserNotiList = () => {
  const [isLabel, setIsLabel] = useState<string | null>(null);
  const sortedNotification = allNotification.sort((b, a) => {
    return +new Date(a.createdAt) - +new Date(b.createdAt);
  });

  useEffect(() => {
    if (sortedNotification) {
      const reverseSortedList = [...sortedNotification].reverse();
      const putLabel = reverseSortedList.find(
        (item) => getWithinSevenDays(item.createdAt) === '7일 이내',
      );

      if (putLabel) {
        setIsLabel(putLabel.createdAt);
      } else {
        setIsLabel(null);
      }
    }
  }, [sortedNotification]);

  return (
    <>
      {sortedNotification && sortedNotification.length > 0 ? (
        <div className='mt-4 flex w-[375px] flex-col justify-center gap-[13px]'>
          {sortedNotification.map((item) => {
            return (
              <UserNotiCard
                key={item.id}
                item={item}
                showLabel={item.createdAt === isLabel}
              />
            );
          })}
        </div>
      ) : (
        <div className='mt-[47px] w-[375px] text-center text-[14px] font-normal text-subfont'>
          알림이 없습니다.
        </div>
      )}
    </>
  );
};

export default UserNotiList;
