import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import PhoneNumber from './PhoneNumber';
import SelectClosedTime from './SelectClosedTime';
import SelectOpenTime from './SelectOpenTime';

const SpaceForm = () => {
  const [spaceForm, setSpaceForm] = useState({
    spaceName: '',
    description: '',
    openTime: '선택',
    closedTime: '선택',
    phoneNumber: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.name === 'description' && e.target.value.length > 500) {
      e.target.value = e.target.value.substring(0, 500);
    }
    setSpaceForm({ ...spaceForm, [e.target.name]: e.target.value });
  };

  // eslint-disable-next-line no-console
  console.log(spaceForm);

  return (
    <div className='flex justify-center pt-[35px]'>
      <form className='w-custom'>
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
            value={spaceForm.spaceName}
          />
        </div>
        <div className='mt-[40px] flex flex-col'>
          <div className='flex justify-between'>
            <label
              htmlFor='description'
              className='mb-[6px] text-[14px] font-normal'
            >
              사업장 소개
            </label>
            <p className='text-[14px] font-normal text-subfont'>
              {spaceForm.description.length}/500
            </p>
          </div>
          <TextareaAutosize
            cacheMeasurements
            minRows={4.6}
            name='description'
            className='main-textarea'
            placeholder='사업장 소개 문구를 입력해주세요.'
            onChange={handleChange}
            value={spaceForm.description}
          />
        </div>
        <div className='mt-[40px] flex justify-between'>
          <SelectOpenTime
            spaceForm={spaceForm}
            setSpaceForm={setSpaceForm}
          />
          <SelectClosedTime
            spaceForm={spaceForm}
            setSpaceForm={setSpaceForm}
          />
        </div>
        <PhoneNumber
          spaceForm={spaceForm}
          setSpaceForm={setSpaceForm}
        />
      </form>
    </div>
  );
};

export default SpaceForm;
