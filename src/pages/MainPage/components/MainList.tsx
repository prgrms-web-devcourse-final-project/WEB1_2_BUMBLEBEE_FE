import { useState } from 'react';
import StudyRoomCard from './StudyRoomCard';

type TabList = {
  [key: string]: {
    title: string;
    context: string;
  };
};

const MainList = () => {
  const [activeTab, setActiveTab] = useState('기본');
  const tabList: TabList = {
    기본: {
      title: '내 주변 스터디룸',
      context: '내 주변 가까운 스터디룸을 확인해보세요 !',
    },
    '맞춤형 추천': {
      title: '맞춤형 추천 스터디룸',
      context: '나에게 맞는 스터디룸을 확인해보세요 !',
    },
  };

  return (
    <div className='relative z-10 -mt-2 mb-[94px] h-auto w-[375px] rounded-t-[10px] bg-white pb-[110px] shadow-custom'>
      <nav className='it flex h-[60px] w-full items-center justify-center'>
        {Object.keys(tabList).map((tab) => (
          <button
            type='button'
            key={tab}
            className={`h-full w-1/2 text-base ${activeTab === tab ? 'border-b-2 border-b-primary text-black' : 'text-subfont'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>
      <div className='mx-auto my-4 h-[45px] w-custom'>
        <p className='text-base font-medium'>{tabList[activeTab].title}</p>
        <p className='text-sm'>{tabList[activeTab].context}</p>
      </div>
      <div className='mx-auto flex w-custom flex-col gap-4'>
        <StudyRoomCard />
        <StudyRoomCard />
        <StudyRoomCard />
      </div>
    </div>
  );
};

export default MainList;
