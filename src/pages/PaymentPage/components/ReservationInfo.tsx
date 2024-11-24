import DetailTitle from '@components/DetailTitle';

const ReservationInfo = () => {
  return (
    <div className='mx-auto mt-8 flex w-custom flex-col gap-4'>
      <DetailTitle title='예약자 정보' />
      <div className='flex w-custom flex-col gap-[10px]'>
        <div className='flex w-full items-center justify-between text-sm'>
          <p>예약자명</p>
          <input
            type='text'
            placeholder='이름을 입력하세요.'
            className='h-[38px] w-[200px] rounded-[5px] border-[1px] border-subfont px-[10px] py-[10px] focus:border-focusColor focus:outline-none'
          />
        </div>
        <div className='flex w-full items-center justify-between text-sm'>
          <p>예약자 전화번호</p>
          <input
            type='text'
            placeholder='전화번호를 입력하세요.'
            className='h-[38px] w-[200px] rounded-[5px] border-[1px] border-subfont px-[10px] py-[10px] focus:border-focusColor focus:outline-none'
          />
        </div>
      </div>
    </div>
  );
};

export default ReservationInfo;
