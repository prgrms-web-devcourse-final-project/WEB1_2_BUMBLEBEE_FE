import { Space } from '@typings/types';
import { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

export interface SelectOpenTimeProps {
  spaceFormData: Space;
  changeFormdata: (data: Partial<Space>) => void;
}

const SelectOpenTime = ({
  spaceFormData,
  changeFormdata,
}: SelectOpenTimeProps) => {
  const [showList, setShowList] = useState(false);

  const timeList = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ];

  const handleTimeSelect = (item: string) => {
    changeFormdata({ openTime: item });
    setShowList(!showList);
  };

  return (
    <div className='relative flex items-center'>
      <p className='mr-[12px] text-[14px] font-normal'>오픈 시간</p>
      <div className='flex h-[38px] w-[90px] items-center justify-around rounded-[5px] border border-solid border-subfont'>
        <span className='pl-[12px] text-[14px]'>{spaceFormData.openTime}</span>
        <button
          type='button'
          onClick={() => setShowList(!showList)}
        >
          <IoMdArrowDropdown size='20px' />
        </button>
      </div>
      {showList && (
        <div className='z-1 absolute left-[64px] top-[45px] max-h-[114px] w-[90px] overflow-auto rounded-[5px] border border-subfont border-opacity-[50%] bg-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.1)]'>
          {timeList.map((item) => (
            <li
              key={item}
              onClick={() => handleTimeSelect(item)}
              className='h-[24px]last:border-none flex list-none flex-col items-center border-b border-b-subfont border-opacity-[50%] py-[8px] text-[12px] hover:cursor-pointer hover:border-opacity-[50%] hover:bg-subfont'
            >
              {item}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectOpenTime;
