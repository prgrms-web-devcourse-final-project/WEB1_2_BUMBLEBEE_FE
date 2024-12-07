import { useEffect, useState } from 'react';
import { getWithinSevenDays } from '@utils/formatTime';
import { UserNotification } from '@pages/UserNotiPage/components/UserNotiList';
import HostNotiCard from './HostNotiCard';

const allNotification: UserNotification[] = [
  {
    id: 1,
    type: 'newReservation',
    message: '홍길동님의 예약이 등록되었습니다.',
    reservationInfo: '스터디랩 / ROOM A',
    createdAt: '2024-11-02T00:00:00',
  },
  {
    id: 2,
    type: 'newReview',
    message:
      '스터디룸이 매우 깨끗하고 조용해서 집중도가 높아졌습니다. 시설도 최신이고 필요한 장비도 모두 갖춰져 있어 학습에 최적화된 환경이었어요. 예약과 이용 절차도 간편해 만족도가 높습니다.',
    reservationInfo: '스터디랩',
    createdAt: '2024-11-23T00:00:00',
  },
  {
    id: 3,
    type: 'newReview',
    message:
      '스터디룸이 매우 깨끗하고 조용해서 집중도가 높아졌습니다. 시설도 최신이고 필요한 장비도 모두 갖춰져 있어 학습에 최적화된 환경이었어요. 예약과 이용 절차도 간편해 만족도가 높습니다.',
    reservationInfo: '스터디랩',
    createdAt: '2024-11-19T14:00:00',
  },
  {
    id: 4,
    type: 'newReservation',
    message: 'HYUN님의 예약이 등록되었습니다.',
    reservationInfo: '스터디랩 / ROOM A',
    createdAt: '2024-11-22T16:00:00',
  },
];

const HostNotiList = () => {
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
              <HostNotiCard
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

export default HostNotiList;
