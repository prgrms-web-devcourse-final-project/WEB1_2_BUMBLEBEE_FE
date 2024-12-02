import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  isValidBusinessNumber,
  isValidEmail,
  isValidNickname,
  isValidPassword,
} from '@utils/validationCheckRegex';
import { ERROR_MESSAGE, PLACEHOLDER } from '@constants/constants';
import BusinessNumber from './BusinessNumber';
import useBusinessSignUp from '../hooks/useBusinessSignUp';

const BusinessSignUpForm = () => {
  const navigate = useNavigate();

  const [hostFormData, setHostFormData] = useState({
    businessNumber: '',
    nickname: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  // input 값 반영
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'nickname' && e.target.value.length > 8) {
      e.target.value = e.target.value.substring(0, 8);
    }
    setHostFormData({
      ...hostFormData,
      [e.target.name]: e.target.value,
    });
  };

  const [errorMessage, setErrorMessage] = useState({
    businessNumberError: '',
    nicknameError: '',
    emailError: '',
    passwordError: '',
    checkPasswordError: '',
  });

  const isValid = () => {
    const newErrorMessage = {
      businessNumberError: '',
      nicknameError: '',
      emailError: '',
      passwordError: '',
      checkPasswordError: '',
    };

    if (!isValidBusinessNumber(hostFormData.businessNumber)) {
      newErrorMessage.businessNumberError = ERROR_MESSAGE.businessNumber;
    }

    if (!isValidNickname(hostFormData.nickname)) {
      newErrorMessage.nicknameError = ERROR_MESSAGE.nickname;
    }

    if (!isValidEmail(hostFormData.email)) {
      newErrorMessage.emailError = ERROR_MESSAGE.email;
    }
    if (!isValidPassword(hostFormData.password)) {
      newErrorMessage.passwordError = ERROR_MESSAGE.password;
    }
    if (hostFormData.password !== hostFormData.passwordCheck) {
      newErrorMessage.checkPasswordError = ERROR_MESSAGE.checkPassword;
    }

    setErrorMessage(newErrorMessage);
  };

  const { mutate } = useBusinessSignUp();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isValid();
    if (
      isValidBusinessNumber(hostFormData.businessNumber) &&
      isValidNickname(hostFormData.nickname) &&
      isValidEmail(hostFormData.email) &&
      isValidPassword(hostFormData.password) &&
      hostFormData.password === hostFormData.passwordCheck
    ) {
      mutate({
        businessName: hostFormData.nickname,
        businessEmail: hostFormData.email,
        businessPwd: hostFormData.password,
        businessNum: hostFormData.businessNumber,
      });
    }
  };

  return (
    <div className='flex justify-center pt-[40px]'>
      <form
        className='w-custom'
        onSubmit={handleSubmit}
      >
        <BusinessNumber
          hostFormData={hostFormData}
          setHostFormData={setHostFormData}
        />
        {errorMessage.businessNumberError && (
          <div className='mt-[8px] text-[12px] font-medium text-[#F83A3A]'>
            {errorMessage.businessNumberError}
          </div>
        )}
        <div className='mt-[18px] flex flex-col'>
          <label
            htmlFor='nickname'
            className='mb-[6px] text-[14px] font-normal'
          >
            닉네임
          </label>
          <input
            name='nickname'
            type='text'
            className='main-input'
            placeholder={PLACEHOLDER.nickname}
            onChange={handleChange}
          />
        </div>
        {errorMessage.nicknameError && (
          <div className='mt-[8px] text-[12px] font-medium text-[#F83A3A]'>
            {errorMessage.nicknameError}
          </div>
        )}
        <div className='mt-[18px] flex flex-col'>
          <label
            htmlFor='email'
            className='mb-[6px] text-[14px] font-normal'
          >
            이메일
          </label>
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
        <div className='mt-[18px] flex flex-col'>
          <label
            htmlFor='password'
            className='mb-[6px] text-[14px] font-normal'
          >
            비밀번호
          </label>
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
        <div className='mt-[18px] flex flex-col'>
          <label
            htmlFor='checkPassword'
            className='mb-[6px] text-[14px] font-normal'
          >
            비밀번호 확인
          </label>
          <input
            name='passwordCheck'
            type='password'
            className='main-input'
            placeholder={PLACEHOLDER.checkPassword}
            onChange={handleChange}
          />
        </div>
        {errorMessage.checkPasswordError && (
          <div className='mt-[8px] text-[12px] font-medium text-[#F83A3A]'>
            {errorMessage.checkPasswordError}
          </div>
        )}
        <button
          type='submit'
          className='btn-primary mt-[30px] text-[16px]'
        >
          가입 완료
        </button>
        <div className='mt-[10px] flex justify-center'>
          <span className='text-[12px] font-normal text-[#717171]'>
            이미 계정이 있으신가요?
          </span>
          <button
            type='button'
            className='ml-[6px] border-b border-b-black text-[12px] font-semibold leading-[14px]'
            onClick={() => navigate('/login/business')}
          >
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessSignUpForm;
