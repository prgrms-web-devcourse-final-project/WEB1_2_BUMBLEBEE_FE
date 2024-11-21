const ResultBar = () => {
  return (
    <div className='mx-auto mt-4 flex w-custom justify-center gap-1 rounded-full py-[18px] text-sm shadow-custom'>
      <button
        type='button'
        className='w-16 overflow-hidden text-ellipsis whitespace-nowrap border-r-2 border-subfont pr-1 text-center'
      >
        강남역
      </button>
      <button
        type='button'
        className='w-20 border-r-2 border-subfont text-center'
      >
        11월 30일
      </button>
      <button
        type='button'
        className='w-[100px] border-r-2 border-subfont text-center'
      >
        23:00 - 22:00
      </button>
      <button
        type='button'
        className='w-8 text-center'
      >
        4명
      </button>
    </div>
  );
};

export default ResultBar;
