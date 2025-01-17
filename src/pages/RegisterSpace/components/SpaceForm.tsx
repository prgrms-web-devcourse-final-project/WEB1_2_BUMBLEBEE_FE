import { ChangeEvent, FormEvent, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { AiOutlinePlus } from 'react-icons/ai';
import { Space } from '@typings/types';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import { getS3URL } from '@apis/workplace';
import { useNavigate } from 'react-router-dom';
import { ERROR_MESSAGE } from '@constants/constants';
import {
  isValidAddress,
  isValidBusinessPhoneNumber,
  isValidSpaceName,
} from '@utils/validationCheckRegex';
import PhoneNumber from './PhoneNumber';
import SelectClosedTime from './SelectClosedTime';
import SelectOpenTime from './SelectOpenTime';
import Address from './Address';
import WorkSpaceImage from './WorkSpaceImage';
import RoomComponent from './RoomComponent';
import usePostWorkPlace from '../hooks/usePostWorkPlace';

interface SpaceFormProps {
  spaceFormData: Space;
  changeFormdata: (data: Partial<Space>) => void;
  addRoom: () => void;
  clickRoom: (id: string) => void;
}

const SpaceForm = ({
  spaceFormData,
  changeFormdata,
  addRoom,
  clickRoom,
}: SpaceFormProps) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.name === 'spaceName' && e.target.value.length > 20) {
      e.target.value = e.target.value.substring(0, 20);
    }
    if (e.target.name === 'description' && e.target.value.length > 500) {
      e.target.value = e.target.value.substring(0, 500);
    }
    changeFormdata({ [e.target.name]: e.target.value });
  };

  const handleDelete = (roomId: string) => {
    changeFormdata({
      rooms: spaceFormData.rooms.filter((item) => item.id !== roomId),
    });
  };

  const handleClickAdd = () => {
    addRoom();
  };

  const [errorMessage, setErrorMessage] = useState({
    spaceNameError: '',
    descriptionError: '',
    timeError: '',
    phoneNumberError: '',
    addressError: '',
    imageError: '',
    roomError: '',
  });

  const isValid = () => {
    const newErrorMessage = {
      spaceNameError: '',
      descriptionError: '',
      timeError: '',
      phoneNumberError: '',
      addressError: '',
      imageError: '',
      roomError: '',
    };

    // 사업장명 형식 확인
    if (!isValidSpaceName(spaceFormData.spaceName)) {
      newErrorMessage.spaceNameError = ERROR_MESSAGE.spaceName;
    }
    if (spaceFormData.description === '') {
      newErrorMessage.descriptionError = ERROR_MESSAGE.description;
    }
    if (
      spaceFormData.openTime === '선택' ||
      spaceFormData.closedTime === '선택'
    ) {
      newErrorMessage.timeError = ERROR_MESSAGE.time;
    }
    // 사업장 전화번호 형식 확인
    if (!isValidBusinessPhoneNumber(spaceFormData.phoneNumber)) {
      newErrorMessage.phoneNumberError = ERROR_MESSAGE.phonNumber;
    }
    // 주소 형식 확인
    if (!isValidAddress(spaceFormData.address.detail)) {
      newErrorMessage.addressError = ERROR_MESSAGE.address;
    }
    if (spaceFormData.spaceImage.file === null) {
      newErrorMessage.imageError = ERROR_MESSAGE.image;
    }
    if (spaceFormData.rooms.length === 0) {
      newErrorMessage.roomError = ERROR_MESSAGE.room;
    }

    setErrorMessage(newErrorMessage);
  };

  const uploadImageToS3 = (url: string, file: File) => {
    axios.put(url, file);
  };

  const { mutateAsync } = usePostWorkPlace();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isValid();

    if (
      isValidSpaceName(spaceFormData.spaceName) &&
      spaceFormData.description !== '' &&
      spaceFormData.openTime !== '선택' &&
      spaceFormData.closedTime !== '선택' &&
      isValidBusinessPhoneNumber(spaceFormData.phoneNumber) &&
      isValidAddress(spaceFormData.address.detail) &&
      spaceFormData.spaceImage.file !== null &&
      spaceFormData.rooms.length !== 0
    ) {
      // 이미지 제외 post 요청
      const { workplaceId, studyroomId } = await mutateAsync({
        workplaceName: spaceFormData.spaceName,
        workplacePhoneNumber: spaceFormData.phoneNumber,
        workplaceDescription: spaceFormData.description,
        workplaceAddress: `${spaceFormData.address.basic}, ${spaceFormData.address.detail}`,
        workplaceStartTime: spaceFormData.openTime,
        workplaceEndTime: spaceFormData.closedTime,
        studyRoomList: spaceFormData.rooms.map((room) => ({
          studyRoomName: room.roomName,
          price: Number(room.price),
          capacity: room.people,
          description: room.description,
        })),
      });

      // 그 이후에 사업장 사진 업로드
      const s3URL = await getS3URL(
        spaceFormData.spaceImage.file.name,
        `workplace-${workplaceId}`,
      );
      uploadImageToS3(s3URL, spaceFormData.spaceImage.file);

      // 룸 사진 업로드
      const allRoomImages = spaceFormData.rooms.flatMap(({ roomImages }, idx) =>
        roomImages.map(({ file }) => ({
          file,
          roodId: studyroomId[idx],
        })),
      );
      await Promise.all(
        allRoomImages.map(({ file, roodId }) =>
          getS3URL(
            file!.name,
            `workplace-${workplaceId}/studyroom-${roodId}`,
          ).then((roomImageS3URL) => uploadImageToS3(roomImageS3URL, file!)),
        ),
      );

      // 마지막에 메인 페이지로 이동
      navigate('/');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center pb-[80px] pt-[35px]'>
      <form
        className='w-custom'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col'>
          <label
            htmlFor='spaceName'
            className='mb-[6px] text-[14px] font-normal'
          >
            사업장명
          </label>
          <input
            name='spaceName'
            type='text'
            className='main-input'
            placeholder='사업장명을 입력해주세요.'
            onChange={handleChange}
            value={spaceFormData.spaceName}
          />
        </div>
        {errorMessage.spaceNameError && (
          <div className='mt-[8px] text-[12px] font-medium text-[#F83A3A]'>
            {errorMessage.spaceNameError}
          </div>
        )}
        <div className='mt-[40px] flex flex-col'>
          <div className='flex justify-between'>
            <label
              htmlFor='description'
              className='mb-[6px] text-[14px] font-normal'
            >
              사업장 소개
            </label>
            <p className='text-[14px] font-normal text-subfont'>
              {spaceFormData.description.length}/500
            </p>
          </div>
          <TextareaAutosize
            cacheMeasurements
            minRows={4.6}
            name='description'
            className='main-textarea text-[14px]'
            placeholder='사업장 소개 문구를 입력해주세요.'
            onChange={handleChange}
            value={spaceFormData.description}
          />
        </div>
        {errorMessage.descriptionError && (
          <div className='mt-[8px] text-[12px] font-medium text-[#F83A3A]'>
            {errorMessage.descriptionError}
          </div>
        )}
        <div className='mt-[40px] flex justify-between'>
          <SelectOpenTime
            spaceFormData={spaceFormData}
            changeFormdata={changeFormdata}
          />
          <SelectClosedTime
            spaceFormData={spaceFormData}
            changeFormdata={changeFormdata}
          />
        </div>
        {errorMessage.timeError && (
          <div className='mt-[8px] text-[12px] font-medium text-[#F83A3A]'>
            {errorMessage.timeError}
          </div>
        )}
        <PhoneNumber
          spaceFormData={spaceFormData}
          changeFormdata={changeFormdata}
        />
        {errorMessage.phoneNumberError && (
          <div className='mt-[8px] text-[12px] font-medium text-[#F83A3A]'>
            {errorMessage.phoneNumberError}
          </div>
        )}
        <Address
          address={spaceFormData.address}
          onUpdateAddress={(address) => changeFormdata({ address })}
        />
        {errorMessage.addressError && (
          <div className='mt-[8px] text-[12px] font-medium text-[#F83A3A]'>
            {errorMessage.addressError}
          </div>
        )}
        <WorkSpaceImage
          spaceFormData={spaceFormData}
          changeFormdata={changeFormdata}
        />
        {errorMessage.imageError && (
          <div className='mt-[8px] text-[12px] font-medium text-[#F83A3A]'>
            {errorMessage.imageError}
          </div>
        )}
        <div className='relative mt-[40px] flex flex-col'>
          <label
            htmlFor='spaceName'
            className='mb-[10px] text-[14px] font-normal'
          >
            룸 추가
          </label>
          {errorMessage.roomError && (
            <div className='absolute right-[0px] text-[12px] font-medium text-[#F83A3A]'>
              {errorMessage.roomError}
            </div>
          )}
          {spaceFormData.rooms.length !== 0 &&
            spaceFormData.rooms.map((item) => (
              <div
                key={item.id}
                className='relative'
              >
                <button
                  type='button'
                  onClick={() => clickRoom(item.id)}
                  className='mb-[10px]'
                >
                  <RoomComponent
                    room={{
                      studyRoomId: 0,
                      studyRoomName: item.roomName,
                      capacity: item.people,
                      description: item.description,
                      imageUrl: item.roomImages.map((image) => image.url),
                      price: Number(item.price),
                    }}
                  />
                </button>
                <button
                  type='button'
                  className='absolute right-[12px] top-[12px]'
                  onClick={() => handleDelete(item.id)}
                >
                  <IoMdClose
                    size='20px'
                    color='black'
                  />
                </button>
              </div>
            ))}
          <button
            type='button'
            className='flex h-[120px] w-custom items-center justify-center rounded-[10px] border border-dashed border-primary py-[10px]'
            onClick={handleClickAdd}
          >
            <AiOutlinePlus
              size='25px'
              color='#50BEAD'
            />
          </button>
        </div>
        <button
          type='submit'
          className='btn-primary mt-[40px] text-[16px]'
        >
          공간 등록 완료
        </button>
      </form>
    </div>
  );
};

export default SpaceForm;
