import { SearchStudyRoomData } from '@typings/types';
import { FaStar } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

interface RoomCardProps {
  item: SearchStudyRoomData;
}

const RoomCard = (props: RoomCardProps) => {
  const { item } = props;
  const navigate = useNavigate();
  return (
    <button
      type='button'
      onClick={() => navigate(`/reservation/${item.studyRoomId}`)}
      className='flex cursor-pointer items-center justify-between border-b border-b-black px-[13px] py-[26px] last:border-none'
    >
      <img
        src={item.imageUrl}
        alt='스터디룸 사진'
        className='h-[110px] w-[110px] object-cover'
      />
      <div className='flex w-[210px] flex-col gap-[10px]'>
        <div className='flex flex-col gap-1'>
          <div className='flex items-start justify-between'>
            <p className='text-xs font-normal text-subfont'>
              {item.workplaceName}
            </p>
            <div className='flex items-center gap-[3px] text-xs'>
              <FaStar className='text-primary' />
              <span>{item.reviewScore.toFixed(1)}</span>
              <span>({item.reviewCount})</span>
            </div>
          </div>
          <p className='text-start font-medium'>{item.studyRoomName}</p>
        </div>
        <div className='flex flex-col gap-[6px]'>
          <div className='flex gap-[10px] text-xs'>
            <span className='font-normal'>{item.distance.toFixed(1)}km</span>
            <span className='text-start'>
              {item.workplaceAddress.split(' ').slice(0, 3).join(' ')}
            </span>
          </div>
          <div className='flex gap-[6px] text-xs'>
            <span>수용 가능 인원</span>
            <span className='font-normal'>{item.studyRoomCapacity}명</span>
          </div>
          <div className='flex gap-1 text-xs'>
            <span className='font-normal'>
              {item.studyRoomPrice.toLocaleString('ko-KR')}원
            </span>
            <span> / 1시간</span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default RoomCard;
