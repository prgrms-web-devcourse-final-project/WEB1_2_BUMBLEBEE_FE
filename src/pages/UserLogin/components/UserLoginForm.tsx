import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLoginForm = () => {
  const navigate = useNavigate();

  const [userLoginForm, setUserLoginForm] = useState({
    email: '',
    password: '',
  });

  // input 값 반영
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLoginForm({ ...userLoginForm, [e.target.name]: e.target.value });
  };

  // 이메일 형식 확인
  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  // 비밀번호 형식 확인
  const isValidPassword = (pwd: string) => {
    const pwdRegex = /^[a-zA-Z0-9]{8,15}$/;
    return pwdRegex.test(pwd);
  };

  const [errorMessage, setErrorMessage] = useState({
    emailError: '',
    passwordError: '',
  });

  const isValid = () => {
    const newError = {
      emailError: '',
      passwordError: '',
    };

    if (!isValidEmail(userLoginForm.email)) {
      newError.emailError = '이메일 형식을 확인해주세요.';
    }
    if (!isValidPassword(userLoginForm.password)) {
      newError.passwordError =
        '비밀번호는 영문, 숫자를 포함하여 8자~15자 이내로 입력해주세요.';
    }

    setErrorMessage(newError);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isValid();
  };

  return (
    <div className='flex justify-center pt-[40px]'>
      <form
        className='w-custom'
        onSubmit={handleSubmit}
      >
        <div className='mt-[18px] flex flex-col'>
          <input
            name='email'
            type='text'
            className='main-input'
            placeholder='이메일 입력'
            onChange={handleChange}
          />
        </div>
        {errorMessage.emailError && (
          <div className='mt-[8px] text-[12px] font-medium text-[#F83A3A]'>
            {errorMessage.emailError}
          </div>
        )}
        <div className='mt-[13px] flex flex-col'>
          <input
            name='password'
            type='password'
            className='main-input'
            placeholder='비밀번호 입력 (영문, 숫자 포함 8~15자)'
            onChange={handleChange}
          />
        </div>
        {errorMessage.passwordError && (
          <div className='mt-[8px] text-[12px] font-medium text-[#F83A3A]'>
            {errorMessage.passwordError}
          </div>
        )}
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
