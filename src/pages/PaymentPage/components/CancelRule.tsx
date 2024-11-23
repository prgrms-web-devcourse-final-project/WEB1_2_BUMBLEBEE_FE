const CancelRule = () => {
  return (
    <div className='mx-auto mt-8 flex w-custom flex-col gap-4'>
      <div>
        <p>예약 안내</p>
        <hr className='mt-2 border border-black' />
      </div>
      <div className='flex flex-col gap-2 text-xs'>
        <div className='flex items-center gap-1'>
          <input
            type='checkbox'
            id='reservation'
            className='h-4 w-4'
          />
          <div className='flex w-full items-center justify-between'>
            <label htmlFor='reservation'>
              <span className='font-normal'>[필수]</span> 개인정보 수집/이용
              동의
            </label>
            <button
              type='button'
              className='text-subfont underline'
            >
              보기
            </button>
          </div>
        </div>
        <div className='flex items-center gap-1'>
          <input
            type='checkbox'
            id='reservation'
            className='h-4 w-4'
          />
          <div className='flex w-full items-center justify-between'>
            <label htmlFor='reservation'>
              <span className='font-normal'>[필수]</span> 개인정보 제3자 제공
              동의
            </label>
            <button
              type='button'
              className='text-subfont underline'
            >
              보기
            </button>
          </div>
        </div>
        <div className='flex items-center gap-1'>
          <input
            type='checkbox'
            id='reservation'
            className='h-4 w-4'
          />
          <label htmlFor='reservation'>
            <span className='font-normal'>[필수]</span> 환불규정 안내에 대한
            동의
          </label>
        </div>
      </div>
    </div>
  );
};

export default CancelRule;
