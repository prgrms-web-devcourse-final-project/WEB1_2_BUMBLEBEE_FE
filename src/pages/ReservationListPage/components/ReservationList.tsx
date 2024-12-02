import { Reservation } from '@pages/WriteReviewPage/components/ReservationInfo';
import { useGetAllReservations } from '@pages/UserMypage/hooks/useGetMyReservations';
import ReservationDetailCard from './ReservationDetailCard';

const reservationCardList: Reservation[] = [
  {
    roomId: 1,
    name: 'ABC스터디룸',
    date: '2024.06.08',
    time: '2024-06-08T14:00:00',
    endtime: '2024-06-08T16:00:00',
    room: 'ROOM A',
    people: 4,
    price: 8000,
    img: 'https://modo-phinf.pstatic.net/20180304_61/1520159998510ED9Yt_JPEG/mosaSDaCsR.jpeg',
    createdAt: '2024-06-07T12:42:11',
  },
  {
    roomId: 2,
    name: 'ㄱㄴㄷ스터디룸',
    date: '2024.11.20',
    time: '2024-11-20T12:00:00',
    endtime: '2024-11-20T13:00:00',
    room: '룸 1',
    people: 3,
    price: 4000,
    img: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20231103_176%2F1698976078471RKtLE_JPEG%2FIMG_9223.jpeg',
    createdAt: '2024-11-16T06:42:11',
  },
  {
    roomId: 3,
    name: '☆☆☆스터디룸',
    date: '2024.11.30',
    time: '2024-11-30T09:00:00',
    endtime: '2024-11-30T12:00:00',
    room: '룸 2',
    people: 2,
    price: 4000,
    img: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230323_120%2F1679571970387BaDBd_JPEG%2F1679570041991-0.jpg',
    createdAt: '2024-11-17T06:42:11',
  },
  {
    roomId: 4,
    name: '☆☆☆스터디룸',
    date: '2024.11.21',
    time: '2024-11-21T09:00:00',
    endtime: '2024-11-21T16:00:00',
    room: '룸 1',
    people: 2,
    price: 4000,
    img: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230323_120%2F1679571970387BaDBd_JPEG%2F1679570041991-0.jpg',
    createdAt: '2024-11-16T06:42:12',
  },
];

const ReservationList = () => {
  const { data } = useGetAllReservations();
  console.log(data);

  // 최근 결제 순으로 정렬
  const sortedReservationList = [...reservationCardList].sort(
    (b, a) =>
      +new Date(a.createdAt as string) - +new Date(b.createdAt as string),
  );

  return (
    <>
      {reservationCardList.length > 0 ? (
        <div className='mt-[6px] flex w-[375px] flex-col justify-center pb-24'>
          {sortedReservationList.map((item) => {
            return (
              <ReservationDetailCard
                key={item.roomId}
                item={item}
              />
            );
          })}
        </div>
      ) : (
        <div className='mt-[47px] w-[375px] text-center text-[14px] font-normal text-subfont'>
          예약 내역이 없습니다.
        </div>
      )}
    </>
  );
};

export default ReservationList;
