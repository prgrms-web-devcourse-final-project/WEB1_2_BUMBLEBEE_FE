import { ChangeEvent, FormEvent, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { AiOutlinePlus } from 'react-icons/ai';
import { Space } from '@typings/Types';
import PhoneNumber from './PhoneNumber';
import SelectClosedTime from './SelectClosedTime';
import SelectOpenTime from './SelectOpenTime';
import Address from './Address';
import WorkSpaceImage from './WorkSpaceImage';

interface SpaceFormProps {
  spaceFormData: Space;
  changeFormdata: (data: Partial<Space>) => void;
  addRoom: () => void;
}

const SpaceForm = ({
  spaceFormData,
  changeFormdata,
  addRoom,
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

  // 사업장명 형식 확인
  const isValidSpaceName = (name: string) => {
    const nameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9-\s]{1,20}$/;
    return nameRegex.test(name);
  };

  // 전화번호 형식 확인
  const isValidNumber = (number: string) => {
    const numberRegex = /^(0507-\d{4}-\d{4}|\d{2,3}-\d{3,4}-\d{4})$/;
    return numberRegex.test(number);
  };

  const [errorMessage, setErrorMessage] = useState({
    spaceNameError: '',
    descriptionError: '',
    timeError: '',
    phoneNumberError: '',
  });

  const isValid = () => {
    const newErrorMessage = {
      spaceNameError: '',
      descriptionError: '',
      timeError: '',
      phoneNumberError: '',
    };
    if (!isValidSpaceName(spaceFormData.spaceName)) {
      newErrorMessage.spaceNameError =
        '사업장명은 특수문자 없이 20자 이내로 입력해주세요.';
    }
    if (spaceFormData.description === '') {
      newErrorMessage.descriptionError = '사업장 소개 문구를 입력해주세요.';
    }
    if (
      spaceFormData.openTime === '선택' ||
      spaceFormData.closedTime === '선택'
    ) {
      newErrorMessage.timeError = '시간을 선택해주세요.';
    }
    if (!isValidNumber(spaceFormData.phoneNumber)) {
      newErrorMessage.phoneNumberError = '전화번호 형식을 확인해주세요.';
    }
    setErrorMessage(newErrorMessage);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isValid();
  };

  return (
    <div className='flex flex-col items-center justify-center pb-24 pt-[35px]'>
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
        <Address changeFormdata={changeFormdata} />
        <WorkSpaceImage changeFormdata={changeFormdata} />
        <div className='mt-[40px] flex flex-col'>
          <label
            htmlFor='spaceName'
            className='mb-[10px] text-[14px] font-normal'
          >
            룸 추가
          </label>
          <button
            type='button'
            className='flex h-[120px] w-custom items-center justify-center rounded-[10px] border border-dashed border-primary py-[10px]'
            onClick={() => addRoom()}
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
