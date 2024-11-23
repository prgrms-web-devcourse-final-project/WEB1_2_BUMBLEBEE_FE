import useSearchStore from '@store/searchStore';
import { useState } from 'react';
import ReservationDate from './ReservationDate/ReservationDate';
import ReservationTime from './ReservationTime';
import ReservationPeople from './ReservationPeople';

const ReservationBar = () => {
  const { searchDate, searchTime, searchPeople } = useSearchStore();
  const [showSelect, setShowSelect] = useState({
    date: false,
    time: false,
    people: false,
  });
  const formattedDate = searchDate.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
  });

  const setTimeArray = (timeArr: string[]) => {
    const lastTime = timeArr[timeArr.length - 1];
    const [hour] = lastTime.split(':');
    const newTimeArray = [timeArr[0], `${hour}:59`];
    return newTimeArray;
  };

  const formattedTime =
    searchTime.length > 0 ? setTimeArray(searchTime).join(' ~ ') : '시간 선택';

  const formattedPeople = searchPeople > 0 ? `${searchPeople}명` : '인원 선택';
  return (
    <>
      <div className='relative mx-auto mt-4 flex w-custom justify-center gap-3 rounded-full py-[18px] text-sm shadow-custom'>
        <button
          type='button'
          className='w-20 border-r-2 border-subfont pr-3 text-center'
          onClick={() =>
            setShowSelect({
              date: !showSelect.date,
              time: false,
              people: false,
            })
          }
        >
          {formattedDate}
        </button>
        <button
          type='button'
          className='w-[110px] border-r-2 border-subfont pr-3 text-center'
          onClick={() =>
            setShowSelect({
              date: false,
              time: !showSelect.time,
              people: false,
            })
          }
        >
          {formattedTime}
        </button>
        <button
          type='button'
          className='w-16 px-1 text-center'
          onClick={() =>
            setShowSelect({
              date: false,
              time: false,
              people: !showSelect.people,
            })
          }
        >
          {formattedPeople}
        </button>
        {showSelect.date && <ReservationDate />}
        {showSelect.time && <ReservationTime />}
        {showSelect.people && <ReservationPeople />}
      </div>
    </>
  );
};

export default ReservationBar;
