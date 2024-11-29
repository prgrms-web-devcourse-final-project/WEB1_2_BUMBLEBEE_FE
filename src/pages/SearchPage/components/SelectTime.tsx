import useSearchStore from '@store/searchStore';

const SelectTime = () => {
  const { searchTime, setTime, setFormattedTime } = useSearchStore();
  const times = { startTime: '09:00', endTime: '23:00' };

  const startHour: number = Number(times.startTime.split(':')[0]);
  const endHour: number = Number(times.endTime.split(':')[0]);

  const timeList = Array.from({ length: endHour - startHour + 1 }, (_, i) => {
    const hour = startHour + i;
    return `${String(hour).padStart(2, '0')}:00`;
  });

  const setTimeArray = (newArray: string[]) => {
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
      <div className='flex w-[330px] flex-wrap gap-x-[5px] gap-y-[10px]'>
        {timeList.map((timeItem: string) => (
          <button
            key={timeItem}
            type='button'
            className={`flex h-[30px] w-[62px] items-center justify-center rounded-[5px] border-[1px] border-subfont px-[14px] py-[6px] text-xs ${searchTime.find((item) => item === timeItem) ? 'bg-primary text-white' : 'bg-white'}`}
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
