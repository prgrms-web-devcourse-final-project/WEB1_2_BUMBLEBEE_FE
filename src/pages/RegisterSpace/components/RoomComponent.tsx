import { WorkplaceStudyRoomData } from '@typings/types';

const RoomComponent = ({ room }: { room: WorkplaceStudyRoomData }) => {
  return (
    <div className='flex h-[120px] w-custom items-center rounded-[10px] bg-white px-[14px] py-[10px] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.2)]'>
      <img
        src={room.imageUrl[0]}
        alt='사진'
        className='h-[94px] w-[94px] object-cover'
      />
      <div className='ml-[18px] w-[180px] text-start'>
        <span className='text-[16px] font-normal'>{room.studyRoomName}</span>
        <p className='-webkit-box webkit-box-orient-vertical line-clamp-2 h-[30px] overflow-hidden text-ellipsis text-[10px]'>
          {room.description}
        </p>
        <p className='mt-[4px] text-[12px]'>
          수용가능 인원
          <span className='ml-[10px] text-[12px] font-normal'>
            {room.capacity}인
          </span>
        </p>
        <p className='text-[12px]'>
          <span className='text-[12px] font-normal'>{room.price}원</span> /
          1시간
        </p>
      </div>
    </div>
  );
};

export default RoomComponent;
