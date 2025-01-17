import TextareaAutosize from 'react-textarea-autosize';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Room } from '@typings/types';
import RoomImage from '@components/RoomImage';
import CountPeople from '@components/CountPeople';
import { ERROR_MESSAGE } from '@constants/constants';
import { validate } from 'uuid';
import { useParams } from 'react-router-dom';
import { deleteStudyRoomImage, getS3URL } from '@apis/workplace';
import axios from 'axios';
import useGetRoomListInfo from '../hooks/useGetRoomListInfo';
import usePostRoom from '../hooks/usePostRoom';
import usePutRoom from '../hooks/usePutRoom';

interface RoomModifyProps {
  room: Room;
  updateRoomData: (data: Partial<Room>) => void;
  completeAdd: (id: string) => void;
}

const RoomModify = ({ room, updateRoomData, completeAdd }: RoomModifyProps) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.name === 'description' && e.target.value.length > 200) {
      e.target.value = e.target.value.substring(0, 200);
    }
    if (e.target.name === 'price') {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }
    updateRoomData({ [e.target.name]: e.target.value });
  };

  const [errorMessage, setErrorMessage] = useState({
    roomNameError: '',
    roomDescriptionError: '',
    roomImagesError: '',
    priceError: '',
  });

  const isValid = () => {
    let pass = true;
    const newErrorMessage = {
      roomNameError: '',
      roomDescriptionError: '',
      roomImagesError: '',
      priceError: '',
    };
    if (room.roomName === '') {
      newErrorMessage.roomNameError = ERROR_MESSAGE.roomName;
      pass = false;
    }
    if (room.description === '') {
      newErrorMessage.roomDescriptionError = ERROR_MESSAGE.roomDescription;
      pass = false;
    }
    if (room.roomImages.length === 0) {
      newErrorMessage.roomImagesError = ERROR_MESSAGE.image;
      pass = false;
    }
    if (room.price === '' || room.people === 0) {
      newErrorMessage.priceError = ERROR_MESSAGE.priceAndPeople;
      pass = false;
    }

    setErrorMessage(newErrorMessage);
    return pass;
  };

  const { workplaceId } = useParams() as { workplaceId: string };
  const { data: roomInfo } = useGetRoomListInfo(Number(workplaceId)); // 사업장 스터디룸 리스트
  const { mutateAsync: postRoom } = usePostRoom();
  const { mutateAsync: putRoom } = usePutRoom();

  // 수정되는 이미지 리스트
  const roomImageList = room.roomImages
    .filter(({ file }) => file === null)
    .map(
      (obj) => obj.url.split('/')[6], // 파일 이름만 추출
    );

  // 기존 이미지 리스트
  const originImageList = roomInfo
    ?.find(({ studyRoomId }) => studyRoomId === Number(room.id))
    ?.imageUrl.map((url) => url.split('/')[6]);

  const uploadImageToS3 = (url: string, file: File) => {
    axios.put(url, file);
  };

  // 완료 버튼 누를 시
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid()) {
      if (validate(room.id)) {
        // 룸 생성 (studyroomId 반환)
        const { studyroomId } = await postRoom({
          workPlaceId: workplaceId,
          studyroom: {
            studyRoomName: room.roomName,
            description: room.description,
            price: Number(room.price),
            capacity: room.people,
          },
        });

        updateRoomData({ id: String(studyroomId) });

        // 이미지 업로드
        await Promise.all(
          room.roomImages.map(({ file }) =>
            getS3URL(
              file!.name,
              `workplace-${workplaceId}/studyroom-${studyroomId}`,
            ).then((roomImageS3URL) => uploadImageToS3(roomImageS3URL, file!)),
          ),
        );
      } else {
        // 룸 수정
        await putRoom({
          studyRoomId: room.id,
          studyroom: {
            studyRoomName: room.roomName,
            description: room.description,
            price: Number(room.price),
            capacity: room.people,
          },
        });

        // 추가된 이미지
        const addImage =
          // 추가되면 file이 null이 아님
          room.roomImages.filter(({ file }) => file !== null);

        // 새로운 이미지가 추가된 경우
        if (addImage.length > 0) {
          // 룸 사진 추가
          await Promise.all(
            addImage.map(({ file }) =>
              getS3URL(
                file!.name,
                `workplace-${workplaceId}/studyroom-${room.id}`,
              ).then((roomImageS3URL) =>
                uploadImageToS3(roomImageS3URL, file!),
              ),
            ),
          );
        }

        // 삭제된 이미지
        const deletedImage =
          originImageList &&
          originImageList.filter((image) => !roomImageList.includes(image));

        // 삭제된 이미지가 있을 경우
        if (deletedImage) {
          // 룸 사진 삭제
          deletedImage.forEach((img) => {
            const fileName = img;
            const fileLocation = `workplace-${workplaceId}/studyroom-${room.id}`;
            deleteStudyRoomImage(fileName, fileLocation);
          });
        }
      }

      completeAdd('');
    }
  };

  return (
    <div className='flex justify-center pb-24 pt-[35px]'>
      <form
        className='w-custom'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col'>
          <label
            htmlFor='roomName'
            className='mb-[6px] text-[14px] font-normal'
          >
            룸 이름
          </label>
          <input
            name='roomName'
            type='text'
            className='main-input'
            placeholder='룸 이름을 입력해주세요.'
            onChange={handleChange}
            value={room?.roomName}
          />
        </div>
        {errorMessage.roomNameError && (
          <div className='mt-[8px] text-[12px] font-medium text-[#F83A3A]'>
            {errorMessage.roomNameError}
          </div>
        )}
        <div className='mt-[40px] flex flex-col'>
          <div className='flex justify-between'>
            <label
              htmlFor='description'
              className='mb-[6px] text-[14px] font-normal'
            >
              룸 설명
            </label>
            <p className='text-[14px] font-normal text-subfont'>
              {room?.description.length}/200
            </p>
          </div>
          <TextareaAutosize
            cacheMeasurements
            minRows={4.6}
            name='description'
            className='main-textarea text-[14px]'
            placeholder='룸에 대한 설명을 입력해주세요.'
            onChange={handleChange}
            value={room?.description}
          />
        </div>
        {errorMessage.roomDescriptionError && (
          <div className='mt-[8px] text-[12px] font-medium text-[#F83A3A]'>
            {errorMessage.roomDescriptionError}
          </div>
        )}
        <RoomImage
          roomImages={room?.roomImages}
          onUpdateImages={(roomImages) => updateRoomData({ roomImages })}
        />
        {errorMessage.roomImagesError && (
          <div className='mt-[8px] text-[12px] font-medium text-[#F83A3A]'>
            {errorMessage.roomImagesError}
          </div>
        )}
        <div className='mt-[40px] flex items-center justify-between'>
          <div className='flex items-center'>
            <label htmlFor='price'>
              <p className='text-center text-[14px] font-normal'>
                가격
                <br /> <span className='text-[11px]'>(1인당 1시간)</span>
              </p>
            </label>
            <input
              name='price'
              type='text'
              className='main-input ml-[20px] h-[38px] w-[84px] rounded-[5px]'
              placeholder='ex) 3000'
              onChange={handleChange}
              value={room?.price}
            />
          </div>
          <CountPeople
            room={room}
            updateRoomData={updateRoomData}
          />
        </div>
        {errorMessage.priceError && (
          <div className='mt-[8px] text-[12px] font-medium text-[#F83A3A]'>
            {errorMessage.priceError}
          </div>
        )}
        <button
          type='submit'
          className='btn-primary mt-[40px] text-[16px]'
        >
          완료
        </button>
      </form>
    </div>
  );
};

export default RoomModify;
