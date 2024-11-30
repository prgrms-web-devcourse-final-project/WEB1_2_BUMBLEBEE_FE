import { MdArrowForwardIos } from 'react-icons/md';
import LogoutButton from '@components/LogoutButton';
import { useNavigate } from 'react-router-dom';
import LatestReservation from './LatestReservation';
import CategoryButton from './CategoryButton';
import { useGetLatestReservation } from '../hooks/useGetMyReservations';

const UserButtonContainer = () => {
  const latestReservation = useGetLatestReservation();
  const navigate = useNavigate();

  const handleMoveReservationList = () => {
    navigate('/reservation-list');
  };

  const handleMoveReviewList = () => {
    navigate('/review-list');
  };

  const handleMoveUserInfo = () => {
    navigate('/user-info');
  };

  return (
    <div className='absolute top-[265px] flex w-[330px] flex-col gap-[18px]'>
      <div className='flex flex-col gap-[10px]'>
        <button
          type='button'
          className='flex items-center gap-[2px] self-end text-[14px] text-white'
          onClick={handleMoveReservationList}
        >
          예약 내역
          <MdArrowForwardIos />
        </button>
        {latestReservation ? (
          <LatestReservation data={latestReservation} />
        ) : (
          <div className='flex h-[172px] w-[330px] items-center justify-center rounded-[10px] bg-white p-[16px] shadow-[0_0_6px_0_rgba(0,0,0,0.25)]'>
            <p className='text-sm font-normal text-subfont'>
              예약 내역이 없습니다.
            </p>
          </div>
        )}
      </div>
      <CategoryButton
        category='리뷰 관리'
        onClickFunction={handleMoveReviewList}
      />
      <CategoryButton
        category='회원 정보'
        onClickFunction={handleMoveUserInfo}
      />
      <LogoutButton />
    </div>
  );
};

export default UserButtonContainer;
