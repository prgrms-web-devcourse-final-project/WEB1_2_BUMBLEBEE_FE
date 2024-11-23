const ReservationPrice = () => {
  return (
    <div className='mx-auto mt-8 flex w-custom flex-col gap-4'>
      <div>
        <p>주문 상품</p>
        <hr className='mt-2 border border-black' />
      </div>
      <div>
        <div className='flex flex-col gap-[14px]'>
          <p className='font-normal'>ROOM A</p>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center justify-between text-sm'>
              <div className='flex gap-1'>
                <span>3,500</span>
                <span>X</span>
                <span>4인</span>
              </div>
              <div className='font-normal'>
                14,000<span> 원</span>
              </div>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <div className='flex'>
                <span>3</span>
                <span>시간 이용</span>
              </div>
              <div className='font-normal'>
                42,000<span> 원</span>
              </div>
            </div>
          </div>
          <hr className='text-subfont' />
          <div className='flex items-center justify-between font-normal'>
            <span>총 결제 금액</span>
            <span className='text-primary'>42,000원</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPrice;
