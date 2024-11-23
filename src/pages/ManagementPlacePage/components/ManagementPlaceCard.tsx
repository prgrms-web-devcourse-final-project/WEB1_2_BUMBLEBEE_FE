import { MdArrowForwardIos } from 'react-icons/md';
import { getDateFunction } from '@utils/formatTime';
import ButtonInCard from '@components/ButtonInCard';
import ListStyle from '@components/ListStyle';
import type { WorkPlace } from './ManagementPlaceList';

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
    <div className='mx-auto flex w-custom flex-col gap-2 border-b border-solid border-b-black px-[13px] py-[26px]'>
      <div className='flex justify-between'>
        <div className='flex flex-col items-start gap-2'>
          <div className='flex cursor-pointer items-center gap-1.5 font-medium'>
            {workplaceName}
            <MdArrowForwardIos className='w-3' />
          </div>

          <ul className='flex flex-col gap-1 text-[12px]'>
            <ListStyle
              name='주소'
              value={workplaceAddress}
            />
            <ListStyle
              name='전화번호'
              value={workPlacePhoneNumber}
            />
            <ListStyle
              name='룸 수'
              value={numberOfRooms}
            />
            <ListStyle
              name='등록일'
              value={getDateFunction(createdAt)}
            />
          </ul>
        </div>
        <img
          src={workplaceImage}
          alt='스터디룸 사진'
          className='h-[50px] w-[50px] cursor-pointer object-cover'
        />
      </div>

      <div className='self-end'>
        <ButtonInCard name='수정' />
      </div>
    </div>
  );
};

export default ManagementPlaceCard;
