import DetailTitle from '@components/DetailTitle';
import { GrNext } from 'react-icons/gr';

const RoomDetail = () => {
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
      <div className='whitespace-pre-wrap text-sm'>
        강서구 내발산동 수명산파크 중심상가에 위치해있으며, 김포공항, 마곡,
        마곡나루, 우장산, 화곡역 등에 가깝고 대로변에 위치하고 있어 접근성이
        매우 용이합니다. <br />
        관리자가 늦은 오후~새벽까지 상주하고 있어, 관리가 잘 되고 안전하게
        이용하실 수 있습니다. <br />
        스터디룸은 예약제로 운영중입니다.. * 간혹, 선예약이 있는 경우라도 조정을
        통해, 최대한 이용하실 수 있는 방법을 찾을 수 있으니 전화나 톡톡으로
        문의주시기 바랍니다. * 스터디존(1인석)은 총 60석으로 방문선착순
        이용가능합니다.
      </div>
    </div>
  );
};

export default RoomDetail;
