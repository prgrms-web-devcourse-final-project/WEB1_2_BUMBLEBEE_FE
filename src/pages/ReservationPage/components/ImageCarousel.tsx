import { StudyRoomDetailData } from '@typings/types';
import { useState } from 'react';
import { GrPrevious, GrNext } from 'react-icons/gr';

interface ImageCarouselProps {
  data: StudyRoomDetailData;
}

const ImageCarousel = (props: ImageCarouselProps) => {
  const { data } = props;
  const roomImageList = data.imageUrl;
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
      <div className='relative mt-8 w-[375px]'>
        {roomImageList && roomImageList.length > 0 && (
          <>
            <img
              src={roomImageList[currentSlide]}
              alt='룸 사진'
              className='pointer-events-none h-[240px] w-full select-none object-cover'
            />
            <div className='absolute top-[100px] flex w-[375px] cursor-pointer items-center justify-between text-4xl text-white opacity-70'>
              <GrPrevious onClick={handleSlidePrev} />
              <GrNext onClick={handleSlideNext} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ImageCarousel;
