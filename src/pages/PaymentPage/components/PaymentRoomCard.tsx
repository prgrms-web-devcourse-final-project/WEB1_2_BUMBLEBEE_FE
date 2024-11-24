import DetailTitle from '@components/DetailTitle';
import { GrNext } from 'react-icons/gr';

const PaymentRoomCard = () => {
  return (
    <div className='mx-auto mt-8 flex w-custom flex-col gap-4'>
      <DetailTitle title='룸 상세 정보'>
        <button
          type='button'
          className='flex items-center justify-center gap-1 text-xs text-subfont'
        >
          123 스터디룸 <GrNext />
        </button>
      </DetailTitle>
      <div className='flex h-[120px] w-custom items-center justify-center gap-[18px] rounded-[10px] shadow-custom'>
        <img
          src='https://modo-phinf.pstatic.net/20180304_61/1520159998510ED9Yt_JPEG/mosaSDaCsR.jpeg?type=w1100'
          className='h-[94px] w-[94px] object-cover'
          alt='결제 스터디룸 사진'
        />
        <div className='flex w-[186px] flex-col gap-2'>
          <div className='font-normal'>ROOM A</div>
          <div className='flex flex-col gap-1 text-xs'>
            <div className='flex gap-[10px]'>
              <span>장소</span>
              <span className='font-normal'>ABC 스터디룸</span>
            </div>
            <div className='flex gap-[10px]'>
              <span>일정</span>
              <div className='flex gap-[6px]'>
                <span className='font-normal'>11월 16일(토)</span>
                <span className='font-normal'>16:00 - 18:00</span>
              </div>
            </div>
            <div className='flex gap-[10px]'>
              <span>인원</span>
              <span className='font-normal'>4명</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentRoomCard;
