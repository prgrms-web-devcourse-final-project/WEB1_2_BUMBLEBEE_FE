import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Room, Space, StudyRoomData } from '@typings/types';
import SpaceForm from '@pages/RegisterSpace/components/SpaceForm';
import { useParams } from 'react-router-dom';
import RoomForm from '../AddRoom/components/RoomForm';
import useGetWorkPlaceInfo from './hooks/useGetWorkPlaceInfo';
import useGetRoomListInfo from './hooks/useGetRoomListInfo';

const ModifySpace = () => {
  const { workplaceId } = useParams() as { workplaceId: string };
  const { data: info } = useGetWorkPlaceInfo(Number(workplaceId));
  const { data: roomInfo } = useGetRoomListInfo(Number(workplaceId));
  console.log(info);
  console.log(roomInfo);
  const modify = true;

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
    spaceImage: null,
    rooms: [],
  });

  useEffect(() => {
    if (info && roomInfo) {
      const [basic, ...detailParts] = info.workplaceAddress.split(',');
      const roomList = roomInfo.map((room: StudyRoomData) => ({
        id: String(room.id),
        roomName: room.title,
        description: room.description,
        price: String(room.price),
        people: room.capacity,
        roomImages: [{ url: room.imageUrl, file: new File([], room.imageUrl) }],
      }));

      setSpaceFormData((prev) => ({
        ...prev,
        spaceName: info.workplaceName,
        description: info.workplaceDescription,
        openTime: info.workplaceStartTime,
        closedTime: info.workplaceEndTime,
        phoneNumber: info.workplacePhoneNumber,
        address: {
          basic,
          detail: detailParts.join(',').trim(),
        },
        spaceImage: { url: info.imageUrl },
        rooms: roomList,
      }));
    }
  }, [info, roomInfo]);

  console.log(spaceFormData);

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
        <HeaderOnlyTitle title='룸 등록 및 수정' />
      ) : (
        <HeaderOnlyTitle title='공간 등록 수정' />
      )}
      <hr className='fixed top-[93px] mx-[22.5px] h-0.5 w-custom border-0 bg-black' />
      {selectedRoomId ? (
        <RoomForm
          room={spaceFormData.rooms.find(({ id }) => id === selectedRoomId)!}
          updateRoomData={updateRoomData}
          completeAdd={setSelectedRoomId}
          modify={modify}
        />
      ) : (
        <SpaceForm
          spaceFormData={spaceFormData}
          changeFormdata={onChange}
          addRoom={addRoom}
          clickRoom={setSelectedRoomId}
          modify={modify}
        />
      )}
    </MainLayout>
  );
};

export default ModifySpace;
