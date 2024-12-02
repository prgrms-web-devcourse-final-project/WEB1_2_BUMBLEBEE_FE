import { GetPositionWorkPlaceData } from '@typings/types';
import { useEffect, useRef } from 'react';

interface PlaceModalProps {
  place: GetPositionWorkPlaceData;
  onClose: () => void;
}

const PlaceModal = (props: PlaceModalProps) => {
  const { place, onClose } = props;

  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleOutsideClose = (e: { target: unknown }) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClose);

    return () => document.removeEventListener('mousedown', handleOutsideClose);
  }, []);

  return (
    <div className='fixed left-[50%] top-0 z-[1500] flex h-[100%] w-[375px] translate-x-[-50%] items-center justify-center bg-[rgba(0,0,0,0.4)]'>
      <div
        ref={modalRef}
        className='flex h-auto min-h-[140px] w-[280px] flex-col rounded-lg bg-[rgba(255,255,255,0.98)] text-center'
      >
        <div className='flex h-auto min-h-[140px] items-center justify-between px-4 py-5'>
          <img
            src={place.imageUrl}
            alt='사업장 사진'
            className='h-20 w-20 rounded-lg object-cover'
          />

          <div className='flex w-[150px] flex-col items-start gap-[6px] text-sm'>
            <p className='px-1 text-left font-medium'>{place.workplaceName}</p>
            <p className='px-1 text-left text-xs'>{place.workplaceAddress}</p>
            <button
              type='button'
              className='flex h-7 w-[150px] cursor-pointer items-center justify-center rounded-[4px] bg-primary text-xs text-white'
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
