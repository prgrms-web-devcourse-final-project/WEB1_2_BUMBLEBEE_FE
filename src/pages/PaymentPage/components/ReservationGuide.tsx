import CheckAgree from '@components/CheckAgree';
import DetailTitle from '@components/DetailTitle';
import { useCallback, useState } from 'react';
import type { CheckState, ErrorMessageType } from '..';
import CollectionModal from './CollectionModal';
import OfferModal from './OfferModal';

interface ReservationGuideProps {
  checkState: CheckState;
  onSetCheckState: (value: CheckState) => void;
  errorMessage: ErrorMessageType;
  workplaceName: string;
}

const ReservationGuide = (props: ReservationGuideProps) => {
  const { checkState, onSetCheckState, errorMessage, workplaceName } = props;

  const [isCollectionModalOpen, setIsCollectionModalOpen] =
    useState<boolean>(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState<boolean>(false);

  const handleCheckItem = (checked: boolean, id: string) => {
    if (checked) {
      onSetCheckState({
        ...checkState,
        reservation: [...checkState.reservation, id],
      });
    } else {
      onSetCheckState({
        ...checkState,
        reservation: checkState.reservation.filter((item) => item !== id),
      });
    }
  };

  const handleCloseModal = useCallback(() => {
    setIsCollectionModalOpen(false);
    setIsOfferModalOpen(false);
  }, []);

  const isChecked = (id: string) => checkState.reservation.includes(id);

  return (
    <div className='mx-auto mt-8 flex w-custom flex-col gap-4'>
      <DetailTitle title='예약 안내' />
      <div className='flex flex-col gap-2 text-xs'>
        <CheckAgree
          checkId='reservation1'
          isCheck={isChecked('reservation1')}
          description='개인정보 수집/이용 동의'
          onChangeChecked={handleCheckItem}
        >
          <button
            type='button'
            className='text-subfont underline'
            onClick={() => setIsCollectionModalOpen(true)}
          >
            보기
          </button>
        </CheckAgree>
        <CheckAgree
          checkId='reservation2'
          isCheck={isChecked('reservation2')}
          description='개인정보 제3자 제공 동의'
          onChangeChecked={handleCheckItem}
        >
          <button
            type='button'
            className='text-subfont underline'
            onClick={() => setIsOfferModalOpen(true)}
          >
            보기
          </button>
        </CheckAgree>
        <CheckAgree
          checkId='reservation3'
          isCheck={isChecked('reservation3')}
          description='환불규정 안내에 대한 동의'
          onChangeChecked={handleCheckItem}
        />
      </div>
      {errorMessage.reservationCheckError && (
        <div className='-mt-[6px] text-[12px] font-medium text-[#F83A3A]'>
          {errorMessage.reservationCheckError}
        </div>
      )}
      {isCollectionModalOpen && <CollectionModal onClose={handleCloseModal} />}
      {isOfferModalOpen && (
        <OfferModal
          onClose={handleCloseModal}
          workplaceName={workplaceName}
        />
      )}
    </div>
  );
};

export default ReservationGuide;
