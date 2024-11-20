import { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

interface UserFormData {
  gender: string;
  ages: string;
  nickname: string;
  phoneNumber: string;
  email: string;
  password: string;
  passwordCheck: string;
}

interface SelectAgesProps {
  userFormData: UserFormData;
  setUserFormData: React.Dispatch<React.SetStateAction<UserFormData>>;
}

const SelectAges = ({ userFormData, setUserFormData }: SelectAgesProps) => {
  const [showList, setShowList] = useState(false);

  const ageList = ['10대', '20대', '30대'];

  const handleAgesSelect = (item: string) => {
    setUserFormData({ ...userFormData, ages: item });
    setShowList(!showList);
  };

  return (
    <div className='relative mt-[18px] flex items-center'>
      <p className='mr-[20px] text-[14px] font-normal'>나이대</p>
      <div className='flex h-[38px] w-[90px] items-center justify-around rounded-[5px] border border-solid border-subfont'>
        <span className='pl-[12px] text-[14px]'>{userFormData.ages}</span>
        <button
          type='button'
          onClick={() => setShowList(!showList)}
        >
          <IoMdArrowDropdown size='20px' />
        </button>
      </div>
      {showList && (
        <div className='z-1 absolute left-[56.5px] top-[45px] h-[114px] w-[90px] overflow-hidden rounded-[5px] border border-subfont border-opacity-[50%] bg-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.1)]'>
          {ageList.map((item) => (
            <li
              key={item}
              onClick={() => handleAgesSelect(item)}
              className='flex list-none flex-col items-center border-b border-b-subfont border-opacity-[50%] py-[8px] text-[14px] last:border-none hover:cursor-pointer hover:border-opacity-[50%] hover:bg-subfont'
            >
              {item}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectAges;
