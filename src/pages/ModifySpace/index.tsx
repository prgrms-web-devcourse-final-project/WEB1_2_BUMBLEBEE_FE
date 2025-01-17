import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Room, Space } from '@typings/types';
import { useParams } from 'react-router-dom';
import useGetWorkPlaceInfo from './hooks/useGetWorkPlaceInfo';
import useGetRoomListInfo from './hooks/useGetRoomListInfo';
import SpaceModify from './components/SpaceModify';
import RoomModify from './components/RoomModify';

const ModifySpace = () => {
  const { workplaceId } = useParams() as { workplaceId: string };
  const { data: info } = useGetWorkPlaceInfo(Number(workplaceId));
  const { data: roomInfo } = useGetRoomListInfo(Number(workplaceId));

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
    spaceImage: { file: null, url: '' },
    rooms: [],
  });

  useEffect(() => {
    if (info && roomInfo) {
      const [basic, ...detailParts] = info.workplaceAddress.split(',');
      const roomList = roomInfo.map((room) => ({
        id: room.studyRoomId,
        roomName: room.studyRoomName,
        description: room.description,
        price: String(room.price),
        people: room.capacity,
        roomImages: [{ url: room.imageUrl, file: null }],
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
        spaceImage: {
          url: info.imageUrl,
          file: null,
        },
        rooms: roomList.map((room) => ({
          ...room,
          id: String(room.id),
          roomImages: room.roomImages.flatMap((image) =>
            image.url.map((url) => ({
              url,
              file: image.file || null,
            })),
          ),
        })),
      }));
    }
  }, [info, roomInfo]);

  // 공간 등록에서 값 변경
  const onChange = useCallback((data: Partial<Space>) => {
    setSpaceFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const [selectedRoomId, setSelectedRoomId] = useState(''); // 룸 수정하는지 확인

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
      <hr className='fixed top-[70px] mx-[22.5px] h-0.5 w-custom border-0 bg-black' />
      {selectedRoomId ? (
        <RoomModify
          room={spaceFormData.rooms.find(({ id }) => id === selectedRoomId)!}
          updateRoomData={updateRoomData}
          completeAdd={setSelectedRoomId}
        />
      ) : (
        <SpaceModify
          spaceFormData={spaceFormData}
          changeFormdata={onChange}
          addRoom={addRoom}
          clickRoom={setSelectedRoomId}
        />
      )}
    </MainLayout>
  );
};

export default ModifySpace;
