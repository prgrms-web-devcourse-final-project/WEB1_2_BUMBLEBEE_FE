import useSearchStore from '@store/searchStore';
import { PossibleTime } from '@typings/types';
import { useEffect, useState } from 'react';

interface ReservationTimeProps {
  data: PossibleTime;
}

const ReservationTime = (props: ReservationTimeProps) => {
  const { data } = props;
  const { searchDate, searchTime, setTime, setFormattedTime } =
    useSearchStore();
  const times = { startTime: data.startTime, endTime: data.endTime };

  const startHour: number = Number(times.startTime.split(':')[0]);
  const endHour: number = Number(times.endTime.split(':')[0]) - 1;

  const timeList = Array.from({ length: endHour - startHour + 1 }, (_, i) => {
    const hour = startHour + i;
    return `${String(hour).padStart(2, '0')}:00`;
  });

  const [possibleTimeList, setPossibleTimeList] = useState<string[]>([]);

  useEffect(() => {
    const todayDate = new Date();
    const todayDateOnly = todayDate.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const searchDateOnly = searchDate.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    // 오늘 날짜이면 현재 시간 이전에는 선택 안됨
    if (todayDateOnly === searchDateOnly) {
      const timeNow = todayDate.getHours();
      const newPossibleTimeList = data.possibleTime.filter((time) => {
        const hour = parseInt(time.split(':')[0], 10);
        return hour > timeNow;
      });
      setPossibleTimeList(newPossibleTimeList);
    } else {
      setPossibleTimeList(data.possibleTime);
    }
  }, [data.possibleTime, searchDate]);

  const setTimeArray = (newArray: string[]) => {
    if (newArray.length === 0) {
      return;
    }
    const lastTime = newArray[newArray.length - 1];
    const [hour] = lastTime.split(':');
    const newTimeArray = [newArray[0], `${hour}:59`];
    setFormattedTime(newTimeArray);
  };

  const setTimePossible = (selectedTimes: string[]) => {
    // selectedTimes가 possibleTimeList에 포함된 시간만 있는지 확인
    if (selectedTimes.every((item) => possibleTimeList.includes(item))) {
      setTime(selectedTimes);
      setTimeArray(selectedTimes);
    }
  };

  const handleSelectTime = (time: string) => {
    if (!possibleTimeList.find((item) => item === time)) {
      return;
    }
    const indexOfTime = timeList.indexOf(time);
    if (searchTime.length === 0) {
      const slicedSelected = [...timeList].splice(indexOfTime, 2); // 기본 2시간
      setTimePossible(slicedSelected);
    } else {
      const indexOfSelected = searchTime.indexOf(time);
      if (indexOfSelected === 0 && searchTime.length > 2) {
        // 선택되어있는 것들 중에서 첫번째 시간을 선택했을 경우 (2시간 미만이 아니라면)
        const slicedSelected = searchTime.filter((item) => item !== time);
        setTimePossible(slicedSelected);
      } else if (indexOfSelected !== -1 && indexOfSelected !== 1) {
        // 선택되어있는 것들 중에서 하나를 선택했을 경우
        // 2번째 시간은 선택되지 않아야 함 (2시간 미만)
        // 선택된 시간이 2시간일 때, 첫번째 시간을 선택했을 경우
        const slicedSelected = [...searchTime];
        slicedSelected.splice(indexOfSelected);
        setTimePossible(slicedSelected);
      } else if (
        indexOfTime > timeList.indexOf(searchTime[searchTime.length - 1])
      ) {
        // 선택되어있는 시간 이후 시간을 선택했을 경우
        const addAfterSelected = [...timeList].slice(
          timeList.indexOf(searchTime[0]),
          indexOfTime + 1,
        );
        setTimePossible(addAfterSelected);
      } else if (indexOfTime < timeList.indexOf(searchTime[0])) {
        // 선택되어있는 시간 이전 시간을 선택했을 경우
        const addBeforeSelected = [...timeList].slice(
          indexOfTime,
          timeList.indexOf(searchTime[searchTime.length - 1]) + 1,
        );
        setTimePossible(addBeforeSelected);
      }
    }
  };

  return (
    <div className='absolute top-20 flex w-[330px] flex-col items-center gap-[4px] rounded-[10px] bg-white shadow-custom'>
      <div className='flex w-[330px] items-center justify-end px-3 pt-3 text-xs font-medium text-primary'>
        * 최소 2시간 예약 가능
      </div>
      <div className='flex w-[304px] flex-wrap items-center gap-[6px] pb-3 pt-2'>
        {timeList.map((timeItem: string) => (
          <button
            key={timeItem}
            type='button'
            className={`flex h-[30px] w-[56px] items-center justify-center rounded-[5px] border-[1px] border-subfont px-[14px] py-[6px] text-xs ${searchTime.includes(timeItem) ? 'bg-primary text-white' : ''} ${possibleTimeList.includes(timeItem) ? '' : 'pointer-events-none bg-[#C3C3C3] bg-opacity-100 text-[#454545]'} `}
            onClick={() => handleSelectTime(timeItem)}
          >
            {timeItem}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReservationTime;
