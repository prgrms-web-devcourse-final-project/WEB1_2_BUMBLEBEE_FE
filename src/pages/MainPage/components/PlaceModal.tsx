import React from 'react';

const PlaceModal = () => {
  return (
    <div className='fixed left-[50%] top-0 z-[1500] flex h-[100%] w-[375px] translate-x-[-50%] items-center justify-center bg-[rgba(0,0,0,0.4)]'>
      <div className='flex h-auto min-h-[140px] w-[280px] flex-col rounded-lg bg-[rgba(255,255,255,0.98)] text-center'>
        <div className='flex h-auto min-h-[140px] items-center justify-between px-4 py-5'>
          <img
            src='https://modo-phinf.pstatic.net/20180304_61/1520159998510ED9Yt_JPEG/mosaSDaCsR.jpeg?type=w1100'
            alt='사업장 사진'
            className='h-20 w-20 rounded-lg object-cover'
          />

          <div className='flex w-[150px] flex-col items-start gap-[6px] text-sm'>
            <p className='px-1 font-medium'>ㄱㄴㄷ 스터디룸</p>
            <p className='px-1 text-left text-xs'>서울 강남구 강남대로94길</p>
            <button
              type='button'
              className='flex h-7 w-[150px] cursor-pointer items-center justify-center rounded-[8px] bg-primary text-xs text-white'
            >
              상세보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceModal;
