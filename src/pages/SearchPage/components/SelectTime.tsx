import { useState } from 'react';

const SelectTime = () => {
  const time = { startTime: '09:00', endTime: '23:00' };

  const [selectedTime, setSelectedTime] = useState('');

  // const timeList = [];
  const startHour: number = Number(time.startTime.split(':')[0]);
  const endHour: number = Number(time.endTime.split(':')[0]);

  const timeList = Array.from({ length: endHour - startHour + 1 }, (_, i) => {
    const hour = startHour + i;
    return `${String(hour).padStart(2, '0')}:00`;
  });

  return (
    <div className='flex flex-col gap-[4px]'>
      <label
        htmlFor='place'
        className='h-[32px] w-custom px-[6px] font-normal'
      >
        시간 선택
      </label>
      <div className='flex w-[330px] flex-wrap gap-x-[5px] gap-y-[10px]'>
        {timeList.map((timeItem) => (
          <button
            key={timeItem}
            type='button'
            className={`flex h-[30px] w-[62px] items-center justify-center rounded-[5px] border-[1px] border-subfont px-[14px] py-[6px] text-xs ${selectedTime === timeItem ? 'bg-primary text-white' : 'bg-white'}`}
            onClick={() => setSelectedTime(timeItem)}
          >
            {timeItem}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectTime;
