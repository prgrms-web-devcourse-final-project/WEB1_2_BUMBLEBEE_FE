import { MdArrowForwardIos } from 'react-icons/md';
import { getDateFunction } from '@utils/formatTime';
import ButtonInCard from '@components/ButtonInCard';
import { WorkPlace } from './ManagementPlaceList';

const ManagementPlaceCard = ({ item }: { item: WorkPlace }) => {
  const {
    workplaceName,
    workplaceAddress,
    workPlacePhoneNumber,
    createdAt,
    numberOfRooms,
    workplaceImage,
  } = item;

  return (
    <div className='mx-auto flex w-custom flex-col gap-5 border-b border-solid border-b-black px-[13px] py-[26px]'>
      <div className='flex justify-between'>
        <div className='flex flex-col items-start gap-2'>
          <div className='flex cursor-pointer items-center gap-1.5 font-medium'>
            {workplaceName}
            <MdArrowForwardIos className='w-3' />
          </div>

          <ul className='flex flex-col gap-1 text-[12px]'>
            <li className='flex gap-[12px]'>
              <p className='w-[46px]'>주소</p>
              <span className='font-normal'>{workplaceAddress}</span>
            </li>
            <li className='flex gap-[12px]'>
              <p className='w-[46px]'>전화번호</p>
              <span className='font-normal'>{workPlacePhoneNumber}</span>
            </li>
            <li className='flex gap-[12px]'>
              <p className='w-[46px]'>룸 수</p>
              <span className='font-normal'>{numberOfRooms}</span>
            </li>
            <li className='flex gap-[12px]'>
              <p className='w-[46px]'>등록일</p>
              <span className='font-normal'>{getDateFunction(createdAt)}</span>
            </li>
          </ul>
        </div>
        <img
          src={workplaceImage}
          alt='스터디룸 사진'
          className='h-[50px] w-[50px] cursor-pointer object-cover'
        />
      </div>

      <div className='flex gap-1'>
        <ButtonInCard name='수정' />
        <ButtonInCard name='삭제' />
      </div>
    </div>
  );
};

export default ManagementPlaceCard;
