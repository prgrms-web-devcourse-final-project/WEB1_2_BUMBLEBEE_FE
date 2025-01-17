import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PaymentRoomCard from './components/PaymentRoomCard';
import ReservationInfo from './components/ReservationInfo';
import CancelRule from './components/CancelRule';
import ReservationGuide from './components/ReservationGuide';
import ReservationPrice from './components/ReservationPrice';
import PaymentAgree from './components/PaymentAgree';
import PaymentButton from './components/PaymentButton';
import PaymentMethod from './components/PaymentMethod';

export interface StudyRoomInfo {
  studyRoomId: number;
  workplaceName: string;
  studyRoomTitle: string;
  studyRoomPrice: number;
  studyRoomImage: string;
}

export interface ReservationFormData {
  name: string;
  phoneNumber: string;
}

export interface ErrorMessageType {
  nameError: string;
  phonNumberError: string;
  reservationCheckError: string;
  paymentCheckError: string;
  payMethodError: string;
}

export interface CheckState {
  reservation: string[];
  payment: string[];
}

export type PayMethodType = 'TOSS' | 'KAKAOPAY' | null;

const PaymentPage = () => {
  const location = useLocation();
  const studyRoomInfo = location.state;

  const [totalAmount, setTotalAmount] = useState(0);

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
    payMethodError: '',
  });

  const [payMethod, setPayMethod] = useState<PayMethodType>(null);

  return (
    <>
      <MainLayout>
        <HeaderOnlyTitle title='예약 확인 및 결제' />
        <div className='flex h-auto flex-col gap-4 pb-[110px]'>
          <PaymentRoomCard studyRoomInfo={studyRoomInfo} />
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
            workplaceName={studyRoomInfo.workplaceName}
          />
          <ReservationPrice
            studyRoomInfo={studyRoomInfo}
            totalAmount={totalAmount}
            onSetTotalAmount={setTotalAmount}
          />
          <PaymentAgree
            checkState={checkState}
            onSetCheckState={setCheckState}
            errorMessage={errorMessage}
          />
          <PaymentMethod
            payMethod={payMethod}
            onSetPayMethod={setPayMethod}
            errorMessage={errorMessage}
          />
        </div>
        <PaymentButton
          studyRoomInfo={studyRoomInfo}
          reservationForm={reservationForm}
          onSetErrorMessage={setErrorMessage}
          checkState={checkState}
          payMethod={payMethod}
          totalAmount={totalAmount}
        />
      </MainLayout>
    </>
  );
};

export default PaymentPage;
