import { useNavigate } from 'react-router-dom';

const UserLoginForm = () => {
  const navigate = useNavigate();
  return (
    <div className='flex justify-center pt-[40px]'>
      <form className='w-custom'>
        <div className='mt-[18px] flex flex-col'>
          <input
            name='email'
            type='text'
            className='main-input'
            placeholder='이메일 입력'
          />
        </div>
        <div className='mt-[13px] flex flex-col'>
          <input
            name='password'
            type='password'
            className='main-input'
            placeholder='비밀번호 입력 (영문, 숫자 포함 8~15자)'
          />
        </div>
        <button
          type='submit'
          className='btn-primary mt-[30px] text-[16px]'
        >
          로그인
        </button>
        <div className='mt-[10px] flex justify-center'>
          <span className='text-[12px] font-normal text-[#717171]'>
            아직 회원이 아니신가요?
          </span>
          <button
            type='button'
            className='ml-[6px] border-b border-b-black text-[12px] font-semibold leading-[14px]'
            onClick={() => navigate('/signup/user')}
          >
            회원가입
          </button>
        </div>
        <div className='mt-[40px] flex w-custom justify-center'>
          <button
            type='button'
            className='mr-[12px]'
          >
            <img
              src='/Public/KakaoLogo.svg'
              alt='카카오 로고'
            />
          </button>
          <button type='button'>
            <img
              src='/Public/NaverLogo.svg'
              alt='카카오 로고'
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserLoginForm;
