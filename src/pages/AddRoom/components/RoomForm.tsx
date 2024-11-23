import TextareaAutosize from 'react-textarea-autosize';
import { ChangeEvent, FormEvent } from 'react';
import { Room } from '@typings/Types';
import RoomImage from './RoomImage';
import CountPeople from './CountPeople';

interface RoomFormProps {
  room: Room;
  updateRoomData: (data: Partial<Room>) => void;
  completeAdd: (id: string) => void;
}

const RoomForm = ({ room, updateRoomData, completeAdd }: RoomFormProps) => {
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

  const isValid = () => {};

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isValid();
    completeAdd('');
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
            value={room.roomName}
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
              {room.description.length}/200
            </p>
          </div>
          <TextareaAutosize
            cacheMeasurements
            minRows={4.6}
            name='description'
            className='main-textarea text-[14px]'
            placeholder='룸에 대한 설명을 입력해주세요.'
            onChange={handleChange}
            value={room.description}
          />
        </div>
        <RoomImage
          roomImages={room.roomImages}
          onUpdateImages={(roomImages) => updateRoomData({ roomImages })}
        />
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
              value={room.price}
            />
          </div>
          <CountPeople
            room={room}
            updateRoomData={updateRoomData}
          />
        </div>
        <button
          type='submit'
          className='btn-primary mt-[40px] text-[16px]'
        >
          룸 등록 완료
        </button>
      </form>
    </div>
  );
};

export default RoomForm;
