import DetailTitle from '@components/DetailTitle';

const CancelRule = () => {
  return (
    <div className='mx-auto mt-8 flex w-custom flex-col gap-4'>
      <DetailTitle title='취소 / 환불 규정' />
      <div className='flex flex-col gap-2 text-sm'>
        <div className='flex items-center justify-between'>
          <span>이용 24시간 전까지</span>
          <span className='font-normal'>총 금액의 100% 환불</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>이용 24시간 이내</span>
          <span className='font-normal'>환불 불가</span>
        </div>
      </div>
    </div>
  );
};

export default CancelRule;
