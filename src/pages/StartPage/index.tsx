import MainLayout from '@layouts/MainLayout';
import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
  const navigate = useNavigate();
  const handleUserClick: MouseEventHandler<HTMLButtonElement> = () => {
    navigate('/login/user');
  };
  const handleBusinessClick: MouseEventHandler<HTMLButtonElement> = () => {
    navigate('/login/business');
  };
  return (
    <MainLayout>
      <div className='flex flex-col items-center'>
        <h1 className='w-custom text-[24px]'>
          원하는 서비스에 따라 <br />
          사용자 유형을 선택해주세요.
        </h1>

        <button
          type='button'
          className='w-custom mt-[30px] flex h-[90px] flex-col rounded-[10px] bg-primary bg-opacity-[8%] px-[20px] py-[22.5px]'
          onClick={handleUserClick}
        >
          <p className='text-[12px]'>
            스터디룸 예약 서비스를 이용하고 싶으신가요?
          </p>
          <h3 className='text-[18px] font-semibold'>사용자로 이용하기</h3>
        </button>
        <button
          type='button'
          className='w-custom mt-[10px] flex h-[90px] flex-col rounded-[10px] bg-primary bg-opacity-[8%] px-[20px] py-[22.5px]'
          onClick={handleBusinessClick}
        >
          <p className='text-[12px]'>
            스터디룸을 효율적으로 관리하고 싶으신가요?
          </p>
          <h3 className='text-[18px] font-semibold'>사업자로 이용하기</h3>
        </button>
      </div>
    </MainLayout>
  );
};

export default StartPage;
