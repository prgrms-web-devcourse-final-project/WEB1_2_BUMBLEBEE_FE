import useSearchStore from '@store/searchStore';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SelectTime = () => {
  const { searchDate, searchTime, setTime, setFormattedTime } =
    useSearchStore();

  const location = useLocation();
  const isBack = location.state || false;

  useEffect(() => {
    if (!isBack) {
      setTime([]);
      setFormattedTime([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBack]);

  const times = { startTime: '09:00', endTime: '23:00' };

  const startHour: number = Number(times.startTime.split(':')[0]);
  const endHour: number = Number(times.endTime.split(':')[0]);

  const timeList = useMemo(() => {
    return Array.from({ length: endHour - startHour + 1 }, (_, i) => {
      const hour = startHour + i;
      return `${String(hour).padStart(2, '0')}:00`;
    });
  }, [endHour, startHour]);

  const [possibleTimeList, setPossibleTimeList] = useState<string[]>(timeList);

  useEffect(() => {
    setPossibleTimeList(timeList);
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
      const filteredTimeList = timeList.filter((time) => {
        const hour = parseInt(time.split(':')[0], 10);
        return hour > timeNow;
      });
      setPossibleTimeList(filteredTimeList);
    } else {
      setPossibleTimeList(timeList);
    }
  }, [searchDate, timeList]);

  const setTimeArray = (newArray: string[]) => {
    if (newArray.length === 0) {
      return;
    }
    const lastTime = newArray[newArray.length - 1];
    const [hour] = lastTime.split(':');
    const newTimeArray = [newArray[0], `${hour}:59`];
    setFormattedTime(newTimeArray);
  };

  const handleSelectTime = (time: string) => {
    const indexOfTime = timeList.indexOf(time);
    if (searchTime.length === 0) {
      const slicedSelected = [...timeList].splice(indexOfTime, 2); // 기본 2시간
      setTime(slicedSelected);
      setTimeArray(slicedSelected);
    } else {
      const indexOfSelected = searchTime.indexOf(time);
      if (indexOfSelected === 0 && searchTime.length > 2) {
        // 선택되어있는 것들 중에서 첫번째 시간을 선택했을 경우 (2시간 미만이 아니라면)
        const slicedSelected = searchTime.filter((item) => item !== time);
        setTime(slicedSelected);
        setTimeArray(slicedSelected);
      } else if (indexOfSelected !== -1 && indexOfSelected !== 1) {
        // 선택되어있는 것들 중에서 하나를 선택했을 경우
        // 2번째 시간은 선택되지 않아야 함 (2시간 미만)
        // 선택된 시간이 2시간일 때, 첫번째 시간을 선택했을 경우
        const slicedSelected = [...searchTime];
        slicedSelected.splice(indexOfSelected);
        setTime(slicedSelected);
        setTimeArray(slicedSelected);
      } else if (
        indexOfTime > timeList.indexOf(searchTime[searchTime.length - 1])
      ) {
        // 선택되어있는 시간 이후 시간을 선택했을 경우
        const addAfterSelected = [...timeList].slice(
          timeList.indexOf(searchTime[0]),
          indexOfTime + 1,
        );
        setTime(addAfterSelected);
        setTimeArray(addAfterSelected);
      } else if (indexOfTime < timeList.indexOf(searchTime[0])) {
        // 선택되어있는 시간 이전 시간을 선택했을 경우
        const addBeforeSelected = [...timeList].slice(
          indexOfTime,
          timeList.indexOf(searchTime[searchTime.length - 1]) + 1,
        );
        setTime(addBeforeSelected);
        setTimeArray(addBeforeSelected);
      }
    }
  };

  return (
    <div className='flex flex-col gap-[4px]'>
      <label
        htmlFor='place'
        className='h-[32px] w-custom px-[6px] font-normal'
      >
        시간 선택
      </label>
      <div className='flex w-[330px] items-center justify-end pb-2 text-xs font-medium text-primary'>
        * 최소 2시간 예약 가능
      </div>
      <div className='flex w-[330px] flex-wrap gap-x-[5px] gap-y-[10px]'>
        {timeList.map((timeItem: string) => (
          <button
            key={timeItem}
            type='button'
            className={`flex h-[30px] w-[62px] items-center justify-center rounded-[5px] border-[1px] border-subfont px-[14px] py-[6px] text-xs ${searchTime.find((item) => item === timeItem) ? 'bg-primary text-white' : ''} ${possibleTimeList.includes(timeItem) ? '' : 'pointer-events-none bg-[#C3C3C3] bg-opacity-100 text-[#454545]'}`}
            onClick={() => handleSelectTime(timeItem)}
          >
            {timeItem}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectTime;
