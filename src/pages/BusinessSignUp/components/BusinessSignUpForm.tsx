import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BusinessNumber from './BusinessNumber';

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'nickname' && e.target.value.length > 8) {
      e.target.value = e.target.value.substring(0, 8);
    }
    setHostFormData({
      ...hostFormData,
      [e.target.name]: e.target.value,
    });
  };

  // 사업자 등록 번호 형식 확인
  const isValidBusinessNumber = (businessNumber: string) => {
    const businessNumberRegex = /^[0-9]{3}-[0-9]{2}-[0-9]{5}/;
    return businessNumberRegex.test(businessNumber);
  };

  // 닉네임 형식 확인 - 공백확인
  const isValidNickname = (nickname: string) => {
    const nicknameRegex = /^(?!.*\s)[\S]{1,8}$/;
    return nicknameRegex.test(nickname);
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
      newErrorMessage.businessNumberError =
        '사업자 등록 번호 형식을 확인해주세요.';
    }

    if (!isValidNickname(hostFormData.nickname)) {
      newErrorMessage.nicknameError =
        '닉네임은 공백없이 8자 이내로 입력해주세요.';
    }

    if (!isValidEmail(hostFormData.email)) {
      newErrorMessage.emailError = '이메일 형식을 확인해주세요.';
    }
    if (!isValidPassword(hostFormData.password)) {
      newErrorMessage.passwordError =
        '비밀번호는 영문, 숫자를 포함하여 8자~15자 이내로 입력해주세요.';
    }
    if (hostFormData.password !== hostFormData.passwordCheck) {
      newErrorMessage.checkPasswordError = '비밀번호가 일치하지 않습니다.';
    }

    setErrorMessage(newErrorMessage);
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
            placeholder='닉네임 입력 (8자 이내)'
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
            placeholder='이메일 입력'
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
            placeholder='비밀번호 입력 (영문, 숫자 포함 8~15자)'
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
            placeholder='비밀번호 확인'
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
