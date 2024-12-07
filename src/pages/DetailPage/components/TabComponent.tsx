import { Dispatch, SetStateAction, useState } from 'react';
import { GetWorkPlaceData } from '@typings/types';
import DetailComponent from './DetailComponent';
import WorkPlaceReview from './WorkPlaceReview';
import RoomSelect from './RoomSelect';

interface TabComponentProps {
  setIsBtnDisabled: Dispatch<SetStateAction<boolean>>;
  workplaceDetailData: GetWorkPlaceData;
  workplaceId: number;
  selectedRoomId: number;
  setSelectedRoomId: Dispatch<SetStateAction<number>>;
}

const TabComponent = ({
  setIsBtnDisabled,
  workplaceDetailData,
  workplaceId,
  selectedRoomId,
  setSelectedRoomId,
}: TabComponentProps) => {
  const tabs = [
    '상세정보',
    '룸 선택',
    `리뷰(${workplaceDetailData.reviewCount})`,
  ];
  const [activeTab, setActiveTab] = useState(0);

  const handleClickTab = (index: number) => {
    setActiveTab(index);
    setIsBtnDisabled(true);
  };

  return (
    <div>
      {tabs.map((item, index) => (
        <button
          key={item}
          type='button'
          onClick={() => handleClickTab(index)}
          style={{
            color: activeTab === index ? 'black' : '#c3c3c3',
            borderColor: activeTab === index ? '#50BEAD' : '#c3c3c3',
          }}
          className='h-[60px] w-[125px] border-b-2'
        >
          {item}
        </button>
      ))}
      <div className='flex justify-center pb-[110px] pt-[26px]'>
        {activeTab === 0 && (
          <DetailComponent workplaceDetailData={workplaceDetailData} />
        )}
        {activeTab === 1 && (
          <RoomSelect
            setIsBtnDisabled={setIsBtnDisabled}
            workplaceId={workplaceId}
            selectedRoomId={selectedRoomId}
            setSelectedRoomId={setSelectedRoomId}
          />
        )}
        {activeTab === 2 &&
          (workplaceDetailData.reviewCount === 0 ? (
            <div className='text-[16px] font-normal text-subfont'>
              등록된 리뷰가 없습니다.
            </div>
          ) : (
            <WorkPlaceReview workplaceDetailData={workplaceDetailData} />
          ))}
      </div>
    </div>
  );
};

export default TabComponent;
