import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Room, Space } from '@typings/types';
import SpaceForm from './components/SpaceForm';
import RoomForm from './components/RoomForm';

const RegisterSpace = () => {
  // 공간 등록 + 룸 폼 상태관리
  const [spaceFormData, setSpaceFormData] = useState<Space>({
    spaceName: '',
    description: '',
    openTime: '선택',
    closedTime: '선택',
    phoneNumber: '',
    address: {
      basic: '',
      detail: '',
    },
    spaceImage: {
      url: '',
      file: null,
    },
    rooms: [],
  });

  // 공간 등록에서 값 변경
  const onChange = useCallback((data: Partial<Space>) => {
    setSpaceFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const [selectedRoomId, setSelectedRoomId] = useState('');

  const addRoom = () => {
    const newRoomId = uuidv4();
    setSpaceFormData((prev) => ({
      ...prev,
      rooms: [
        ...prev.rooms,
        {
          id: newRoomId,
          roomName: '',
          description: '',
          price: '',
          people: 0,
          roomImages: [],
        },
      ],
    }));

    setSelectedRoomId(newRoomId);
  };

  // 룸 등록에서 값 변경
  const updateRoomData = useCallback(
    (data: Partial<Room>) => {
      setSpaceFormData((prev) => {
        const updatedRooms = prev.rooms.map((room) =>
          room.id === selectedRoomId ? { ...room, ...data } : room,
        );
        return { ...prev, rooms: updatedRooms };
      });
    },
    [selectedRoomId],
  );

  return (
    <MainLayout>
      {selectedRoomId ? (
        <HeaderOnlyTitle title='룸 등록하기' />
      ) : (
        <HeaderOnlyTitle title='공간 등록' />
      )}
      <hr className='fixed top-[70px] mx-[22.5px] h-0.5 w-custom border-0 bg-black' />
      {selectedRoomId ? (
        <RoomForm
          room={spaceFormData.rooms.find(({ id }) => id === selectedRoomId)!}
          updateRoomData={updateRoomData}
          completeAdd={setSelectedRoomId}
        />
      ) : (
        <SpaceForm
          spaceFormData={spaceFormData}
          changeFormdata={onChange}
          addRoom={addRoom}
          clickRoom={setSelectedRoomId}
        />
      )}
    </MainLayout>
  );
};

export default RegisterSpace;
