import CheckAgree from '@components/CheckAgree';
import DetailTitle from '@components/DetailTitle';
import type { CheckState, ErrorMessageType } from '..';

interface ReservationGuideProps {
  checkState: CheckState;
  onSetCheckState: (value: CheckState) => void;
  errorMessage: ErrorMessageType;
}

const ReservationGuide = (props: ReservationGuideProps) => {
  const { checkState, onSetCheckState, errorMessage } = props;

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

  const isChecked = (id: string) => checkState.reservation.includes(id);

  return (
    <div className='mx-auto mt-8 flex w-custom flex-col gap-4'>
      <DetailTitle title='예약 안내' />
      <div className='flex flex-col gap-2 text-xs'>
        <CheckAgree
          checkId='reservation1'
          isCheck={isChecked('reservation1')}
          description='개인정보 수집/이용
              동의'
          onChangeChecked={handleCheckItem}
        />
        <CheckAgree
          checkId='reservation2'
          isCheck={isChecked('reservation2')}
          description='개인정보 제3자 제공 동의'
          onChangeChecked={handleCheckItem}
        />

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
    </div>
  );
};

export default ReservationGuide;
