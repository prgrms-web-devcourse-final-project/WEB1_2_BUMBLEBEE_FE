import TextareaAutosize from 'react-textarea-autosize';
import { ChangeEvent, useState } from 'react';
import RoomImage from './RoomImage';
import CountPeople from './CountPeople';

const RoomForm = () => {
  const [roomForm, setRoomForm] = useState({
    roomName: '',
    description: '',
    price: '',
    people: 0,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRoomForm({ ...roomForm, [e.target.name]: e.target.value });
  };

  return (
    <div className='flex justify-center pt-[35px]'>
      <form className='w-custom'>
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
            value={roomForm.roomName}
          />
        </div>
        <div className='mt-[40px] flex flex-col'>
          <div className='flex justify-between'>
            <label
              htmlFor='description'
              className='mb-[6px] text-[14px] font-normal'
            >
              룸 설명
            </label>
            <p className='text-[14px] font-normal text-subfont'>
              {roomForm.description.length}/200
            </p>
          </div>
          <TextareaAutosize
            cacheMeasurements
            minRows={4.6}
            name='description'
            className='main-textarea text-[14px]'
            placeholder='룸에 대한 설명을 입력해주세요.'
            onChange={handleChange}
            value={roomForm.description}
          />
        </div>
        <RoomImage />
        <div className='mt-[40px] flex items-center justify-between'>
          <div className='flex items-center'>
            <label htmlFor='price'>
              <p className='text-center text-[14px] font-normal'>
                가격
                <br />
                (1인당)
              </p>
            </label>
            <input
              name='price'
              type='text'
              className='main-input ml-[30px] h-[38px] w-[84px] rounded-[5px]'
              placeholder='ex) 3000'
              onChange={handleChange}
              value={roomForm.price}
            />
          </div>
          <CountPeople
            roomForm={roomForm}
            setRoomForm={setRoomForm}
          />
        </div>
        <button
          type='submit'
          className='btn-primary mt-[30px] text-[16px]'
        >
          룸 등록 완료
        </button>
      </form>
    </div>
  );
};

export default RoomForm;
