import useGetReserver from '../hooks/useGetReserver';
import ReserverCard from './ReserverCard';

const ReserverList = () => {
  const { reserverList } = useGetReserver();

  const sortedReserverList = [...reserverList].sort((b, a) => {
    return (
      +new Date(a.reservationCreatedAt) - +new Date(b.reservationCreatedAt)
    );
  });

  return (
    <>
      {reserverList.length > 0 ? (
        <div className='mt-[6px] flex w-[375px] flex-col justify-center pb-24'>
          {sortedReserverList.map((item) => {
            if (item.reservationState !== 'ON_HOLD') {
              return (
                <ReserverCard
                  key={item.reservationId}
                  item={item}
                />
              );
            }
            return null;
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
