import { Dispatch, SetStateAction, useState } from 'react';
import DetailComponent from './DetailComponent';
import WorkPlaceReview from './WorkPlaceReview';
import RoomSelect from './RoomSelect';

interface TabComponentProps {
  setIsBtnDisabled: Dispatch<SetStateAction<boolean>>;
}

const TabComponent = ({ setIsBtnDisabled }: TabComponentProps) => {
  const tabs = ['상세정보', '룸 선택', '리뷰 (3)'];
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
        {activeTab === 0 && <DetailComponent />}
        {activeTab === 1 && <RoomSelect setIsBtnDisabled={setIsBtnDisabled} />}
        {activeTab === 2 && <WorkPlaceReview />}
      </div>
    </div>
  );
};

export default TabComponent;
