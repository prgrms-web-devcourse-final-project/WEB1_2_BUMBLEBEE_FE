import { FaStar } from 'react-icons/fa6';

const StudyRoomCard = () => {
  return (
    <div className='w-custom shadow-custom hover: flex h-[116px] cursor-pointer gap-[18px] rounded-[10px] border-primary bg-white p-3 hover:border-[1px]'>
      <img
        src='src/assets/images/roomit_logo.png'
        alt='스터디룸 사진'
        className='h-[90px] w-[90px] object-cover'
      />
      <div className='flex h-[90px] w-full flex-col content-between justify-between'>
        <div className='flex-col gap-1'>
          <p className='font-normal'>ABC 스터디룸</p>
          <div className='flex gap-[10px]'>
            <span className='text-xs font-normal'>1.5km</span>
            <span className='text-xs'>서울 서초구 서초동</span>
          </div>
        </div>
        <div className='flex items-center gap-1 text-xs'>
          <FaStar className='text-primary' />
          <span>4.0</span>
          <span>(25)</span>
        </div>
      </div>
    </div>
  );
};

export default StudyRoomCard;
