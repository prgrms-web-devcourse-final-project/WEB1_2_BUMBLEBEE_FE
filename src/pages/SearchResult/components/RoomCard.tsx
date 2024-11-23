import { FaStar } from 'react-icons/fa6';

const RoomCard = () => {
  return (
    <div className='flex cursor-pointer items-center justify-between border-b border-b-black px-[13px] py-[26px] last:border-none'>
      <img
        src='src/assets/images/roomit_logo.png'
        alt='스터디룸 사진'
        className='h-[110px] w-[110px] object-cover'
      />
      <div className='flex w-[170px] flex-col gap-[10px]'>
        <div>
          <div className='flex justify-between'>
            <p className='text-xs font-normal text-subfont'>ABC 스터디룸</p>
            <div className='flex items-center gap-[3px] text-xs'>
              <FaStar className='text-primary' />
              <span>4.0</span>
              <span>(25)</span>
            </div>
          </div>
          <p className='font-medium'>ROOM A</p>
        </div>
        <div className='flex flex-col gap-[6px]'>
          <div className='flex gap-[10px] text-xs'>
            <span className='font-normal'>1.5km</span>
            <span>서울 서초구 서초동</span>
          </div>
          <div className='flex gap-[10px] text-xs'>
            <span>수용 가능 인원</span>
            <span className='font-normal'>4명</span>
          </div>
          <div className='flex gap-1 text-xs'>
            <span className='font-normal'>3500원</span>
            <span> / 1시간</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
