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
    createdAt: '2024-11-14T00:00:00',
  },
  {
    id: 2,
    type: 'completeReservation',
    message: '예약이 완료되었습니다.',
    reservationInfo: '스터디랩 / ROOM A',
    price: 8000,
    createdAt: '2024-11-16T14:00:00',
  },
  {
    id: 2,
    type: 'completeReservation',
    message: '예약이 완료되었습니다.',
    reservationInfo: '스터디랩 / ROOM A',
    price: 8000,
    createdAt: '2024-11-20T14:00:00',
  },
];

const UserNotiList = () => {
  const sortedNotification = [...allNotification].sort((b, a) => {
    return +new Date(a.createdAt) - +new Date(b.createdAt);
  });

  return (
    <>
      {allNotification.length > 0 ? (
        <div className='mt-4 flex w-[375px] flex-col justify-center gap-[13px]'>
          {sortedNotification.map((item) => {
            return (
              <UserNotiCard
                key={item.id}
                item={item}
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
