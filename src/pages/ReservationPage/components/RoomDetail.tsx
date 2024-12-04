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
    <div className='mx-auto mt-8 flex w-custom flex-col gap-4'>
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
  );
};

export default RoomDetail;
