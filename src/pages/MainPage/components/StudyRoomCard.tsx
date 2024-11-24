import { StudyRoom } from '@typings/Types';
import { FaStar } from 'react-icons/fa6';

interface StudyRoomCardProps {
  studyroom: StudyRoom;
  distance: number;
}

const StudyRoomCard = ({ studyroom, distance }: StudyRoomCardProps) => {
  const { workplaceImage, workplaceName, workPlaceAddress, starSum } =
    studyroom;

  const formattedAddress = workPlaceAddress.split(' ').slice(0, 3).join(' ');

  return (
    <div className='hover: flex h-[116px] w-custom cursor-pointer gap-[18px] rounded-[10px] border-primary bg-white p-3 shadow-custom hover:border-[1px]'>
      <img
        src={workplaceImage}
        alt='스터디룸 사진'
        className='h-[90px] w-[90px] object-cover'
      />
      <div className='flex h-[90px] w-full flex-col content-between justify-between'>
        <div className='flex-col gap-1'>
          <p className='font-normal'>{workplaceName}</p>
          <div className='flex gap-[10px]'>
            <span className='text-xs font-normal'>{distance}km</span>
            <span className='text-xs'>{formattedAddress}</span>
          </div>
        </div>
        <div className='flex items-center gap-1 text-xs'>
          <FaStar className='text-primary' />
          <span>{starSum}</span>
          <span>(25)</span>
        </div>
      </div>
    </div>
  );
};

export default StudyRoomCard;
