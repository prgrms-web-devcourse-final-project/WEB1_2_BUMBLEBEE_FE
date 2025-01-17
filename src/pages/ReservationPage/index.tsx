import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';
import useSearchStore from '@store/searchStore';
import { toast } from 'react-toastify';
import { ERROR_MESSAGE } from '@constants/constants';
import useAuthStore from '@store/authStore';
import { useEffect, useState } from 'react';
import { getRole } from '@utils/auth';
import ReservationBar from './components/ReservationBar';
import ImageCarousel from './components/ImageCarousel';
import RoomDetail from './components/RoomDetail';
import useGetStudyroomDetail from './hooks/useGetStudyroomDetail';

const ReservationPage = () => {
  const navigate = useNavigate();
  const { studyroomId } = useParams<{ studyroomId: string }>();
  const { data } = useGetStudyroomDetail(Number(studyroomId));
  const { searchTime, searchPeople } = useSearchStore();

  const studyRoomInfo = {
    studyRoomId: studyroomId,
    workplaceName: data.workplaceName,
    studyRoomTitle: data.studyRoomName,
    studyRoomPrice: data.price,
    studyRoomImage: Array.isArray(data.imageUrl)
      ? data.imageUrl[0]
      : data.imageUrl,
  };

  const handleClickReservation = () => {
    if (searchTime.length === 0) {
      toast.error(ERROR_MESSAGE.time);
      return;
    }
    if (searchPeople === 0) {
      toast.error(ERROR_MESSAGE.people);
      return;
    }
    navigate('/payment', { state: studyRoomInfo });
  };

  // 사용자 / 사업자인지 확인
  const { isLogin } = useAuthStore();
  const [isUser, setIsUser] = useState<boolean>(false);

  useEffect(() => {
    if (isLogin) {
      const role = getRole();
      if (role === 'ROLE_USER') {
        setIsUser(true);
      }
    }
  }, [isLogin]);

  return (
    <MainLayout>
      <HeaderOnlyTitle title={data?.studyRoomName || '스터디룸'} />
      <ReservationBar studyroomId={Number(studyroomId)} />
      <ImageCarousel data={data} />
      <RoomDetail data={data} />
      <div className='fixed bottom-0 z-10 flex h-[94px] w-[375px] items-center justify-center border-t-[1px] border-t-subfont bg-white pb-[16px]'>
        <div className='flex items-center gap-2'>
          <button
            type='button'
            className={`btn-primary w-custom px-1 ${isLogin && !isUser ? 'pointer-events-none w-custom bg-subfont font-normal' : ''}`}
            onClick={handleClickReservation}
          >
            {isLogin && !isUser
              ? '사업자는 예약할 수 없습니다.'
              : '룸 선택하기'}
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReservationPage;
