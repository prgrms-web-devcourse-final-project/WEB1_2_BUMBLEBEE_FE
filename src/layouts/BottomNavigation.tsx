import { AiFillHome } from 'react-icons/ai';
import { BsChatDots } from 'react-icons/bs';
import { CgSearch } from 'react-icons/cg';
import { BiUser } from 'react-icons/bi';
import { useState } from 'react';

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState('홈');
  const navigationItems = [
    { icon: <AiFillHome />, label: '홈' },
    { icon: <BsChatDots />, label: '문의' },
    { icon: <CgSearch />, label: '검색' },
    { icon: <BiUser />, label: '마이페이지' },
  ];

  return (
    <div className='fixed bottom-0 z-10 flex h-[94px] w-[375px] items-center justify-between border-t-[1px] border-t-subfont bg-white px-[30px] pb-[30px] pt-[18px]'>
      {navigationItems.map(({ icon, label }) => (
        <button
          type='button'
          key={label}
          className={`flex w-[45px] cursor-pointer flex-col items-center ${
            activeTab === label ? 'text-primary' : 'text-focusColor'
          }`}
          onClick={() => {
            setActiveTab(label);
          }}
        >
          <div className='text-[20px]'>{icon}</div>
          <p className='mt-1 text-[10px]'>{label}</p>
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;
