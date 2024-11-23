const PaymentAgree = () => {
  return (
    <div className='mx-auto mt-8 flex w-custom flex-col gap-4'>
      <div>
        <p>주문 내용 확인 및 결제 동의</p>
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
              <span className='font-normal'>[필수]</span> 결제 서비스 이용 약관
            </label>
            <button
              type='button'
              className='text-subfont underline'
            >
              보기
            </button>
          </div>
        </div>
        <div className='flex gap-1'>
          <input
            type='checkbox'
            id='reservation'
            className='h-4 w-4'
          />

          <label htmlFor='reservation'>
            <span className='font-normal'>[필수]</span> 주문정보 및 결제정보를
            확인하였으며, 구매진행에 동의합니다.
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentAgree;
