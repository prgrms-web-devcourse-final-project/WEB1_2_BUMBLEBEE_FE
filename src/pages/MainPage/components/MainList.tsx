import { useEffect, useState } from 'react';
import { GetPositionWorkPlaceData } from '@typings/types';
import { useNavigate } from 'react-router-dom';
import StudyRoomCard from './StudyRoomCard';

type TabList = {
  [key: string]: {
    title: string;
    context: string;
  };
};

interface MainListProps {
  activeTab: string;
  OnSetActiveTab: (value: string) => void;
  data: GetPositionWorkPlaceData[] | undefined;
  isLoading: boolean;
  isError: boolean;
  recommendData: GetPositionWorkPlaceData[];
  isRecommendLoading: boolean;
  isRecommendError: boolean;
  isLogin: boolean;
  isUser: boolean;
}

const MainList = (props: MainListProps) => {
  const {
    activeTab,
    OnSetActiveTab,
    data,
    isLoading,
    isError,
    recommendData,
    isRecommendLoading,
    isRecommendError,
    isLogin,
    isUser,
  } = props;
  const [tabList, setTabList] = useState<TabList>({
    '주변 스터디룸': {
      title: '내 주변 스터디룸',
      context: '내 주변 가까운 스터디룸을 확인해보세요 !',
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if ((!isLogin && !isUser) || isUser) {
      setTabList({
        '주변 스터디룸': {
          title: '내 주변 스터디룸',
          context: '내 주변 가까운 스터디룸을 확인해보세요 !',
        },
        '맞춤형 추천': {
          title: '맞춤형 추천 스터디룸',
          context: '나에게 맞는 스터디룸을 확인해보세요 !',
        },
      });
    }
  }, [isLogin, isUser]);

  return (
    <div className='relative z-10 -mt-2 mb-[94px] min-h-[429px] w-[375px] rounded-t-[10px] bg-white pb-[110px] shadow-custom'>
      <nav className='it flex h-[60px] w-full items-center justify-center'>
        {Object.keys(tabList).map((tab) => (
          <button
            type='button'
            key={tab}
            className={`h-full flex-1 text-base ${activeTab === tab ? 'border-b-2 border-b-primary text-black' : 'text-subfont'}`}
            onClick={() => OnSetActiveTab(tab)}
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
        {activeTab === '주변 스터디룸' &&
          !isLoading &&
          data &&
          data.length > 0 &&
          data.map((item) => (
            <StudyRoomCard
              key={item.workplaceName}
              studyroom={item}
            />
          ))}
        {activeTab === '맞춤형 추천' && !isLogin && (
          <div className='flex h-[150px] w-full flex-col items-center justify-center gap-2 text-sm font-normal text-subfont'>
            로그인 후 이용이 가능합니다.
            <button
              type='button'
              className='flex h-[40px] w-[100px] items-center justify-center rounded-lg border border-primary py-2 text-primary'
              onClick={() => navigate('/start')}
            >
              로그인
            </button>
          </div>
        )}
        {activeTab === '맞춤형 추천' &&
          !isRecommendLoading &&
          recommendData &&
          recommendData.length > 0 &&
          recommendData.map((item) => (
            <StudyRoomCard
              key={item.workplaceName}
              studyroom={item}
            />
          ))}
        {(!isLoading || isError) &&
          activeTab === '주변 스터디룸' &&
          (!data || data.length === 0) && (
            <div className='flex h-[150px] w-full items-center justify-center text-[14px] font-normal text-subfont'>
              주변 스터디룸이 없습니다.
            </div>
          )}
        {(!isRecommendLoading || isRecommendError) &&
          (!recommendData || recommendData.length === 0) &&
          isLogin &&
          activeTab === '맞춤형 추천' && (
            <div className='flex h-[150px] w-full items-center justify-center text-[14px] font-normal text-subfont'>
              추천 스터디룸이 없습니다.
            </div>
          )}
      </div>
    </div>
  );
};

export default MainList;
