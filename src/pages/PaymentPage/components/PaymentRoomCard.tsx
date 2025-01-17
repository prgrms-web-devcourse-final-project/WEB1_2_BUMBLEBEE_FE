import DetailTitle from '@components/DetailTitle';
import useSearchStore from '@store/searchStore';
import { getFormattedDateFunction } from '@utils/formatTime';
import type { StudyRoomInfo } from '..';

interface PaymentRoomCardProps {
  studyRoomInfo: StudyRoomInfo;
}

const PaymentRoomCard = (props: PaymentRoomCardProps) => {
  const { studyRoomInfo } = props;
  const { workplaceName, studyRoomTitle, studyRoomImage } = studyRoomInfo;
  const { searchDate, formattedTime, searchPeople } = useSearchStore();

  const formattedDate = getFormattedDateFunction(searchDate);
  const timeString = formattedTime.join(' ~ ');
  return (
    <div className='mx-auto mt-8 flex w-custom flex-col gap-4'>
      <DetailTitle title='룸 상세 정보' />
      <div className='flex h-[120px] w-custom items-center justify-center gap-[18px] rounded-[10px] shadow-custom'>
        <img
          src={studyRoomImage}
          className='h-[94px] w-[94px] object-cover'
          alt='결제 스터디룸 사진'
        />
        <div className='flex w-[186px] flex-col gap-2'>
          <div className='font-normal'>{studyRoomTitle}</div>
          <div className='flex flex-col gap-1 text-xs'>
            <div className='flex gap-[10px]'>
              <span>장소</span>
              <span className='font-normal'>{workplaceName}</span>
            </div>
            <div className='flex gap-[10px]'>
              <span>일정</span>
              <div className='flex gap-[6px]'>
                <span className='font-normal'>{formattedDate}</span>
                <span className='font-normal'>{timeString}</span>
              </div>
            </div>
            <div className='flex gap-[10px]'>
              <span>인원</span>
              <span className='font-normal'>{searchPeople}명</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentRoomCard;
