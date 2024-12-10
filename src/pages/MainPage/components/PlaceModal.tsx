import { GetPositionWorkPlaceData } from '@typings/types';
import { useEffect, useRef } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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
  }, [onClose]);

  const navigate = useNavigate();
  const handleClickDetail = () => {
    onClose();
    navigate(`/detail/${place.workplaceId}`);
  };

  return (
    <div className='fixed left-[50%] top-0 z-[1500] flex h-[100%] w-[375px] translate-x-[-50%] items-center justify-center bg-[rgba(0,0,0,0.4)]'>
      <div
        ref={modalRef}
        className='flex h-auto min-h-[140px] w-[320px] flex-col rounded-lg bg-[rgba(255,255,255,0.98)] text-center'
      >
        <div className='flex h-auto min-h-[160px] flex-col items-center justify-between gap-2 px-6 py-6'>
          <div className='flex w-[270px] justify-between'>
            <img
              src={place.imageUrl}
              alt='사업장 사진'
              className='h-[60px] w-[60px] rounded-lg object-cover'
            />
            <div className='flex w-[200px] flex-col items-start justify-center gap-[6px] text-sm'>
              <div className='flex'>
                <FaMapMarkerAlt className='text-base leading-none' />
                <p className='px-1 text-left font-medium leading-none'>
                  {place.workplaceName}
                </p>
              </div>
              <p className='px-1 text-left text-xs leading-none'>
                {place.workplaceAddress}
              </p>
            </div>
          </div>

          <button
            type='button'
            className='flex h-8 w-[270px] cursor-pointer items-center justify-center rounded-[4px] bg-primary text-xs text-white'
            onClick={handleClickDetail}
          >
            상세보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceModal;
