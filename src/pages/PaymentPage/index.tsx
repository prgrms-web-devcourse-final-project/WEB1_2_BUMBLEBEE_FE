import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import { useState } from 'react';
import PaymentRoomCard from './components/PaymentRoomCard';
import ReservationInfo from './components/ReservationInfo';
import CancelRule from './components/CancelRule';
import ReservationGuide from './components/ReservationGuide';
import ReservationPrice from './components/ReservationPrice';
import PaymentAgree from './components/PaymentAgree';
import PaymentButton from './components/PaymentButton';

export interface ReservationFormData {
  name: string;
  phoneNumber: string;
}

export interface ErrorMessageType {
  nameError: string;
  phonNumberError: string;
  reservationCheckError: string;
  paymentCheckError: string;
}

export interface CheckState {
  reservation: string[];
  payment: string[];
}

const PaymentPage = () => {
  const [reservationForm, setReservationForm] = useState<ReservationFormData>({
    name: '',
    phoneNumber: '',
  });

  const [checkState, setCheckState] = useState<CheckState>({
    reservation: [],
    payment: [],
  });

  const [errorMessage, setErrorMessage] = useState<ErrorMessageType>({
    nameError: '',
    phonNumberError: '',
    reservationCheckError: '',
    paymentCheckError: '',
  });

  return (
    <>
      <MainLayout>
        <HeaderOnlyTitle title='예약 확인 및 결제' />
        <div className='flex h-auto flex-col gap-4 pb-[110px]'>
          <PaymentRoomCard />
          <ReservationInfo
            reservationForm={reservationForm}
            onSetReservationForm={setReservationForm}
            errorMessage={errorMessage}
          />
          <CancelRule />
          <ReservationGuide
            checkState={checkState}
            onSetCheckState={setCheckState}
            errorMessage={errorMessage}
          />
          <ReservationPrice />
          <PaymentAgree
            checkState={checkState}
            onSetCheckState={setCheckState}
            errorMessage={errorMessage}
          />
        </div>
        <PaymentButton
          reservationForm={reservationForm}
          onSetErrorMessage={setErrorMessage}
          checkState={checkState}
        />
      </MainLayout>
    </>
  );
};

export default PaymentPage;
