// import RoomComponent from '@pages/RegisterSpace/components/RoomComponent';
import { Dispatch, SetStateAction, useState } from 'react';

// 임시 데이터
interface RoomData {
  id: string;
  roomName: string;
  description: string;
  price: string;
  people: number;
  roomImages: string[];
}

const roomList: RoomData[] = [
  {
    id: '1',
    roomName: 'Room 1',
    description:
      '4~6인실입니다. 과외/스터디하기 가능하고 모니터와 화이트 보드 4~6인실입니다. 과외/스터디하기 가능하고 모니터와 화이트 보드',
    price: '4500',
    people: 6,
    roomImages: ['', ''],
  },
  {
    id: '2',
    roomName: 'Room 2',
    description:
      '3인실입니다. 과외/스터디하기 가능하고 모니터와 화이트 보드 4~6인실입니다. 과외/스터디하기 가능하고 모니터와 화이트 보드',
    price: '3500',
    people: 3,
    roomImages: ['', ''],
  },
];

interface RoomSelectProps {
  setIsBtnDisabled: Dispatch<SetStateAction<boolean>>;
}

const RoomSelect = ({ setIsBtnDisabled }: RoomSelectProps) => {
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const handleClick = (id: string) => {
    setIsBtnDisabled(false);
    setSelectedRoomId(id);
  };
  return (
    <div className='w-custom'>
      {roomList.map((item) => (
        <button
          key={item.id}
          type='button'
          onClick={() => handleClick(item.id)}
          className='mb-[16px] rounded-[10px]'
          style={{
            border: selectedRoomId === item.id ? '1px solid #50BEAD' : 'none',
          }}
        >
          {/* <RoomComponent room={item} /> */}
        </button>
      ))}
    </div>
  );
};

export default RoomSelect;
