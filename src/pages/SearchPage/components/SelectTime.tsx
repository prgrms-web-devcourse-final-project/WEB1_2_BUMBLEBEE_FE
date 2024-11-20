import { useState } from 'react';

const SelectTime = () => {
  const times = { startTime: '09:00', endTime: '23:00' };

  const [selectedTimeList, setSelectedTimeList] = useState<string[]>([]);

  const startHour: number = Number(times.startTime.split(':')[0]);
  const endHour: number = Number(times.endTime.split(':')[0]);

  const timeList = Array.from({ length: endHour - startHour + 1 }, (_, i) => {
    const hour = startHour + i;
    return `${String(hour).padStart(2, '0')}:00`;
  });

  const handleSelectTime = (time: string) => {
    const indexOfTime = timeList.indexOf(time);
    if (selectedTimeList.length === 0) {
      const slicedSelected = [...timeList].splice(indexOfTime, 2); // 기본 2시간
      setSelectedTimeList(slicedSelected);
    } else {
      const indexOfSelected = selectedTimeList.indexOf(time);
      if (indexOfSelected === 0 && selectedTimeList.length > 2) {
        // 선택되어있는 것들 중에서 첫번째 시간을 선택했을 경우 (2시간 미만이 아니라면)
        setSelectedTimeList((selected) =>
          [...selected].filter((item) => item !== time),
        );
      } else if (indexOfSelected !== -1 && indexOfSelected !== 1) {
        // 선택되어있는 것들 중에서 하나를 선택했을 경우
        // 2번째 시간은 선택되지 않아야 함 (2시간 미만)
        // 선택된 시간이 2시간일 때, 첫번째 시간을 선택했을 경우
        const slicedSelected = [...selectedTimeList];
        slicedSelected.splice(indexOfSelected);
        setSelectedTimeList(slicedSelected);
      } else if (
        indexOfTime >
        timeList.indexOf(selectedTimeList[selectedTimeList.length - 1])
      ) {
        // 선택되어있는 시간 이후 시간을 선택했을 경우
        const addAfterSelected = [...timeList].slice(
          timeList.indexOf(selectedTimeList[0]),
          indexOfTime + 1,
        );
        setSelectedTimeList(addAfterSelected);
      } else if (indexOfTime < timeList.indexOf(selectedTimeList[0])) {
        // 선택되어있는 시간 이전 시간을 선택했을 경우
        const addBeforeSelected = [...timeList].slice(
          indexOfTime,
          timeList.indexOf(selectedTimeList[selectedTimeList.length - 1]) + 1,
        );
        setSelectedTimeList(addBeforeSelected);
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
      <div className='flex w-[330px] flex-wrap gap-x-[5px] gap-y-[10px]'>
        {timeList.map((timeItem: string) => (
          <button
            key={timeItem}
            type='button'
            className={`flex h-[30px] w-[62px] items-center justify-center rounded-[5px] border-[1px] border-subfont px-[14px] py-[6px] text-xs ${selectedTimeList.find((item) => item === timeItem) ? 'bg-primary text-white' : 'bg-white'}`}
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
