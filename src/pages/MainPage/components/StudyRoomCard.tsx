import { GetPositionWorkPlaceData } from '@typings/types';
import { FaStar } from 'react-icons/fa6';

interface StudyRoomCardProps {
  studyroom: GetPositionWorkPlaceData;
}

const StudyRoomCard = ({ studyroom }: StudyRoomCardProps) => {
  const {
    workplaceName,
    workplaceAddress,
    imageUrl,
    stars,
    reviewCount,
    distance,
  } = studyroom;

  const formattedAddress = workplaceAddress.split(' ').slice(0, 3).join(' ');

  return (
    <div className='flex h-[116px] w-custom cursor-pointer gap-[18px] rounded-[10px] border-primary bg-white p-3 shadow-custom active:border-[1px]'>
      <img
        src={imageUrl}
        alt='스터디룸 사진'
        className='h-[90px] w-[90px] object-cover'
      />
      <div className='flex h-[90px] w-[190px] flex-col content-between justify-between'>
        <div className='flex-col gap-1'>
          <p className='font-normal'>{workplaceName}</p>
          <div className='flex gap-[10px]'>
            <span className='text-xs font-normal'>{distance.toFixed(2)}km</span>
            <span className='text-xs'>{formattedAddress}</span>
          </div>
        </div>
        <div className='flex items-center gap-1 text-xs'>
          <FaStar className='text-primary' />
          <span>{stars.toFixed(1)}</span>
          <span>({reviewCount})</span>
        </div>
      </div>
    </div>
  );
};

export default StudyRoomCard;
