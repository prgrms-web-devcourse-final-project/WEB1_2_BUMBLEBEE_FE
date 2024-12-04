import RoomComponent from '@pages/RegisterSpace/components/RoomComponent';
import { Dispatch, SetStateAction, useState } from 'react';
import useGetStudyroomOfWorkplace from '../hooks/useGetStudyroomOfWorkplace';

interface RoomSelectProps {
  setIsBtnDisabled: Dispatch<SetStateAction<boolean>>;
  workplaceId: number;
}

const RoomSelect = ({ setIsBtnDisabled, workplaceId }: RoomSelectProps) => {
  const { data } = useGetStudyroomOfWorkplace(workplaceId);
  console.log(data, workplaceId);

  const [selectedRoomId, setSelectedRoomId] = useState<number>();
  const handleClick = (id: number) => {
    setIsBtnDisabled(false);
    setSelectedRoomId(id);
  };

  return (
    <div className='w-custom'>
      {data ? (
        data.map((item) => (
          <button
            key={item.studyRoomId}
            type='button'
            onClick={() => handleClick(item.studyRoomId)}
            className='mb-[16px] rounded-[10px]'
            style={{
              border:
                selectedRoomId === item.studyRoomId
                  ? '1px solid #50BEAD'
                  : 'none',
            }}
          >
            <RoomComponent room={item} />
          </button>
        ))
      ) : (
        <p>조회된 룸이 없습니다.</p>
      )}
    </div>
  );
};

export default RoomSelect;
