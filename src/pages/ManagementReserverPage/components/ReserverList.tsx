import ReserverCard from './ReserverCard';

export interface ReserverInfo {
  revervationId: number;
  studyroomTitle: string;
  roomTitle: string;
  reservationName: string;
  reservationPhonenumber: string;
  startTime: string;
  endTime: string;
  price: number;
  numberOfReserver: number;
  studyroomImage: string;
  createdAt: string;
}

const reserverList: ReserverInfo[] = [
  {
    revervationId: 1,
    studyroomTitle: 'ABC 스터디룸',
    roomTitle: 'ROOM A',
    reservationName: '홍길동',
    reservationPhonenumber: '010-1111-1111',
    startTime: '2024-11-21T09:00:00',
    endTime: '2024-11-21T16:00:00',
    price: 8000,
    numberOfReserver: 4,
    studyroomImage:
      'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230323_120%2F1679571970387BaDBd_JPEG%2F1679570041991-0.jpg',
    createdAt: '2024-11-16T06:42:12',
  },
];

const ReserverList = () => {
  const sortedReserverList = [...reserverList].sort((b, a) => {
    return +new Date(b.createdAt) - +new Date(a.createdAt);
  });

  return (
    <>
      {reserverList.length > 0 ? (
        <div className='mt-[6px] flex w-[375px] flex-col justify-center'>
          {sortedReserverList.map((item) => {
            return (
              <ReserverCard
                key={item.revervationId}
                item={item}
              />
            );
          })}
        </div>
      ) : (
        <div className='mt-[47px] w-[375px] text-center text-[14px] font-normal text-subfont'>
          예약자가 없습니다.
        </div>
      )}
    </>
  );
};

export default ReserverList;
