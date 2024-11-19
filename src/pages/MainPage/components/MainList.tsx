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
    <div className='shadow-custom relative z-10 -mt-2 mb-[94px] h-auto w-full rounded-t-[10px] bg-white pb-[110px]'>
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
      <div className='w-custom mx-auto my-4 h-[45px]'>
        <p className='text-base font-medium'>{tabList[activeTab].title}</p>
        <p className='text-sm'>{tabList[activeTab].context}</p>
      </div>
      <div className='w-custom mx-auto flex flex-col gap-4'>
        <StudyRoomCard />
        <StudyRoomCard />
        <StudyRoomCard />
      </div>
    </div>
  );
};

export default MainList;
