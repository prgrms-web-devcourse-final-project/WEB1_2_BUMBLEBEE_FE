import DetailTitle from '@components/DetailTitle';
import { StudyRoomDetailData } from '@typings/types';
import { GrNext } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

interface RoomDatailProps {
  data: StudyRoomDetailData;
}

const RoomDetail = (props: RoomDatailProps) => {
  const { data } = props;
  const navigate = useNavigate();
  return (
    <div className='mx-auto my-8 flex w-custom flex-col gap-6'>
      <div className='flex flex-col gap-4'>
        <DetailTitle title='룸 상세 정보'>
          <button
            type='button'
            className='flex items-center justify-center gap-1 text-xs text-subfont'
            onClick={() => navigate(`/detail/${data.workplaceId}`)}
          >
            {data.workplaceName} <GrNext />
          </button>
        </DetailTitle>
        <div className='whitespace-pre-wrap text-sm'>{data.description}</div>
      </div>
      <div className='flex flex-col gap-4 pb-[110px]'>
        <DetailTitle title='이용 정보' />
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between text-sm'>
            <p className='font-medium'>1인당 1시간 이용 가격</p>
            <p>{data.price.toLocaleString('ko-KR')}원</p>
          </div>
          <div className='flex items-center justify-between text-sm'>
            <p className='font-medium'>수용 가능 인원</p>
            <p>{data.capacity}명</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
