import DetailTitle from '@components/DetailTitle';
import { PLACEHOLDER } from '@constants/constants';
import { insertPhoneNumberHyphen } from '@utils/autoHyphen';
import { ChangeEvent } from 'react';
import type { ErrorMessageType, ReservationFormData } from '..';

interface ReservationInfoProps {
  reservationForm: ReservationFormData;
  onSetReservationForm: (value: ReservationFormData) => void;
  errorMessage: ErrorMessageType;
}

const ReservationInfo = (props: ReservationInfoProps) => {
  const { reservationForm, onSetReservationForm, errorMessage } = props;
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    onSetReservationForm({ ...reservationForm, name: e.target.value });
  };

  const handleChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const formatNumber = insertPhoneNumberHyphen(e.target.value);
    onSetReservationForm({ ...reservationForm, phoneNumber: formatNumber });
  };

  return (
    <div className='mx-auto mt-8 flex w-custom flex-col gap-4'>
      <DetailTitle title='예약자 정보' />
      <div className='flex w-custom flex-col gap-[10px]'>
        <div className='flex w-full items-center justify-between text-sm'>
          <p>예약자명</p>
          <input
            type='text'
            name='name'
            placeholder={PLACEHOLDER.name}
            value={reservationForm.name}
            onChange={handleChangeName}
            className='h-[38px] w-[200px] rounded-[5px] border-[1px] border-subfont px-[10px] py-[10px] focus:border-focusColor focus:outline-none'
          />
        </div>
        {errorMessage.nameError && (
          <div className='ml-32 text-[12px] font-medium text-[#F83A3A]'>
            {errorMessage.nameError}
          </div>
        )}
        <div className='flex w-full items-center justify-between text-sm'>
          <p>예약자 전화번호</p>
          <input
            type='text'
            name='phoneNumber'
            placeholder={PLACEHOLDER.phonNumber}
            value={reservationForm.phoneNumber}
            onChange={handleChangePhoneNumber}
            className='h-[38px] w-[200px] rounded-[5px] border-[1px] border-subfont px-[10px] py-[10px] focus:border-focusColor focus:outline-none'
          />
        </div>
        {errorMessage.phonNumberError && (
          <div className='ml-32 text-[12px] font-medium text-[#F83A3A]'>
            {errorMessage.phonNumberError}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationInfo;
