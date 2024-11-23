import { useState } from 'react';
import { GrPrevious, GrNext } from 'react-icons/gr';

const ImageCarousel = () => {
  const roomImageList = [
    'https://modo-phinf.pstatic.net/20180304_61/1520159998510ED9Yt_JPEG/mosaSDaCsR.jpeg?type=w1100',
    'https://regainstudy.com/theme/basic/img/sub/sub3-1_img_01.jpg',
    'https://img1.yna.co.kr/etc/inner/KR/2018/01/15/AKR20180115024900004_01_i_P4.jpg',
    'https://d2v80xjmx68n4w.cloudfront.net/gigs/YhLlk1707054944.jpg',
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const showSlide = (index: number) => {
    const listLength = roomImageList.length - 1;
    if (index < 0) {
      setCurrentSlide(listLength);
    } else if (index > listLength) {
      setCurrentSlide(0);
    } else if (index <= listLength) {
      setCurrentSlide(index);
    }
  };

  const handleSlidePrev = () => {
    showSlide(currentSlide - 1);
  };

  const handleSlideNext = () => {
    showSlide(currentSlide + 1);
  };

  return (
    <>
      <div className='relative mx-auto mt-8 w-custom'>
        <img
          src={roomImageList[currentSlide]}
          alt='룸 사진'
          className='pointer-events-none h-[240px] w-full select-none object-cover'
        />
        <div className='absolute top-[100px] flex w-custom items-center justify-between text-4xl text-white opacity-70'>
          <GrPrevious onClick={handleSlidePrev} />
          <GrNext onClick={handleSlideNext} />
        </div>
      </div>
    </>
  );
};

export default ImageCarousel;
