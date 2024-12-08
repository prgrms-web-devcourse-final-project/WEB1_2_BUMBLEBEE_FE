import { ERROR_MESSAGE, PLACEHOLDER, BASE_URL } from '@constants/constants';
import { isValidEmail, isValidPassword } from '@utils/validationCheckRegex';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserLogIn from '../hooks/useUserLogIn';

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
      newError.emailError = ERROR_MESSAGE.email;
    }
    if (!isValidPassword(userLoginForm.password)) {
      newError.passwordError = ERROR_MESSAGE.password;
    }

    setErrorMessage(newError);
  };

  const { mutate } = useUserLogIn();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isValid();
    if (
      isValidEmail(userLoginForm.email) &&
      isValidPassword(userLoginForm.password)
    ) {
      mutate({ email: userLoginForm.email, password: userLoginForm.password });
    }
  };

  return (
    <div className='flex justify-center pt-[30px]'>
      <form
        className='w-custom'
        onSubmit={handleSubmit}
      >
        <div className='mt-[18px] flex flex-col'>
          <input
            name='email'
            type='text'
            className='main-input'
            placeholder={PLACEHOLDER.email}
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
            placeholder={PLACEHOLDER.password}
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
          <a
            href={`${BASE_URL}/oauth2/authorization/kakao`}
            className='mr-[12px]'
          >
            <img
              src='/src/assets/icons/KakaoLogo.svg'
              alt='카카오 로고'
            />
          </a>
          <a href={`${BASE_URL}/oauth2/authorization/naver`}>
            <img
              src='/src/assets/icons/NaverLogo.svg'
              alt='네이버 로고'
            />
          </a>
        </div>
      </form>
    </div>
  );
};

export default UserLoginForm;
