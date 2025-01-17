import RoomComponent from '@pages/RegisterSpace/components/RoomComponent';
import { Dispatch, SetStateAction } from 'react';
import useGetStudyroomOfWorkplace from '../hooks/useGetStudyroomOfWorkplace';

interface RoomSelectProps {
  setIsBtnDisabled: Dispatch<SetStateAction<boolean>>;
  workplaceId: number;
  selectedRoomId: number;
  setSelectedRoomId: Dispatch<SetStateAction<number>>;
}

const RoomSelect = ({
  setIsBtnDisabled,
  workplaceId,
  selectedRoomId,
  setSelectedRoomId,
}: RoomSelectProps) => {
  const { data } = useGetStudyroomOfWorkplace(workplaceId);

  const handleClick = (id: number) => {
    setIsBtnDisabled(false);
    setSelectedRoomId(id);
  };

  return (
    <div className='w-custom'>
      {data && data.length > 0 ? (
        data.map((item) => (
          <button
            key={item.studyRoomId}
            type='button'
            onClick={() => handleClick(item.studyRoomId)}
            className={`mb-[16px] rounded-[10px] ${
              selectedRoomId === item.studyRoomId
                ? 'border-[1px] border-[#50BEAD]'
                : ''
            }`}
          >
            <RoomComponent room={item} />
          </button>
        ))
      ) : (
        <div className='flex h-[150px] w-full items-center justify-center font-normal text-subfont'>
          조회된 룸이 없습니다.
        </div>
      )}
    </div>
  );
};

export default RoomSelect;
