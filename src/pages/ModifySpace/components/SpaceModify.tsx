import { ChangeEvent, FormEvent, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { AiOutlinePlus } from 'react-icons/ai';
import { Space } from '@typings/types';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import { getS3URL } from '@apis/workplace';
import SelectOpenTime from '@pages/RegisterSpace/components/SelectOpenTime';
import SelectClosedTime from '@pages/RegisterSpace/components/SelectClosedTime';
import PhoneNumber from '@pages/RegisterSpace/components/PhoneNumber';
import Address from '@pages/RegisterSpace/components/Address';
import WorkSpaceImage from '@pages/RegisterSpace/components/WorkSpaceImage';
import RoomComponent from '@pages/RegisterSpace/components/RoomComponent';
import { useParams } from 'react-router-dom';
import { ERROR_MESSAGE } from '@constants/constants';
import {
  isValidAddress,
  isValidBusinessPhoneNumber,
  isValidSpaceName,
} from '@utils/validationCheckRegex';
import usePutWorkPlace from '../hooks/usePutWorkPlace';
import useGetWorkPlaceInfo from '../hooks/useGetWorkPlaceInfo';
import useDeleteRoom from '../hooks/useDeleteRoom';

interface SpaceModifyProps {
  spaceFormData: Space;
  changeFormdata: (data: Partial<Space>) => void;
  addRoom: () => void;
  clickRoom: (id: string) => void;
}

const SpaceModify = ({
  spaceFormData,
  changeFormdata,
  addRoom,
  clickRoom,
}: SpaceModifyProps) => {
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

  const { mutate: deleteRoom } = useDeleteRoom();

  const handleDelete = (roomId: string) => {
    deleteRoom(roomId);
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
  });

  const { workplaceId } = useParams() as { workplaceId: string };
  const isValid = () => {
    const newErrorMessage = {
      spaceNameError: '',
      descriptionError: '',
      timeError: '',
      phoneNumberError: '',
      addressError: '',
      imageError: '',
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
    if (spaceFormData.spaceImage.url === null) {
      newErrorMessage.imageError = ERROR_MESSAGE.image;
    }

    setErrorMessage(newErrorMessage);
  };

  const uploadImageToS3 = (url: string, file: File) => {
    axios.put(url, file);
  };

  const { mutateAsync } = usePutWorkPlace();
  const { data: info } = useGetWorkPlaceInfo(Number(workplaceId));

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
      spaceFormData.spaceImage.url !== null
    ) {
      await mutateAsync({
        workplace: {
          workplaceId: Number(workplaceId),
          workplaceName: spaceFormData.spaceName,
          workplacePhoneNumber: spaceFormData.phoneNumber,
          workplaceDescription: spaceFormData.description,
          workplaceAddress: `${spaceFormData.address.basic}, ${spaceFormData.address.detail}`,
          workplaceStartTime: spaceFormData.openTime,
          workplaceEndTime: spaceFormData.closedTime,
        },
        workplaceId: Number(workplaceId),
      });

      // 사업장 사진 (수정을 한 경우에만)
      if (spaceFormData.spaceImage.file !== null) {
        const prevImgName = info?.imageUrl.split('/').pop();
        const s3URL = await getS3URL(prevImgName!, `workplace-${workplaceId}`);
        uploadImageToS3(s3URL, spaceFormData.spaceImage.file);
      }
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
        <button
          type='submit'
          className='btn-primary mt-[40px] text-[16px]'
        >
          수정하기
        </button>
        <div className='relative mt-[40px] flex flex-col'>
          <label
            htmlFor='spaceName'
            className='mb-[10px] text-[14px] font-normal'
          >
            룸 추가
          </label>
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
      </form>
    </div>
  );
};

export default SpaceModify;
