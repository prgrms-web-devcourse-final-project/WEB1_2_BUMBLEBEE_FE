import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectAges from './SelectAges';
import PhoneNumberInput from './PhoneNumberInput';

const UserSignUpForm = () => {
  const navigate = useNavigate();

  const [userFormData, setUserFormData] = useState({
    gender: '',
    ages: '선택',
    nickname: '',
    phoneNumber: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  // input 값 반영
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'nickname' && e.target.value.length > 8) {
      e.target.value = e.target.value.substring(0, 8);
    }
    setUserFormData({
      ...userFormData,
      [e.target.name]: e.target.value,
    });
  };

  // 닉네임 형식 확인 - 공백확인
  const isValidNickname = (nickname: string) => {
    const nicknameRegex = /^(?!.*\s)[\S]{1,8}$/;
    return nicknameRegex.test(nickname);
  };

  // 전화번호 형식 확인
  const isValidNumber = (number: string) => {
    const numberRegex = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/;
    return numberRegex.test(number);
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
    genderError: '',
    agesError: '',
    nicknameError: '',
    phonNumberError: '',
    emailError: '',
    passwordError: '',
    checkPasswordError: '',
  });

  const isValid = () => {
    const newErrorMessage = {
      genderError: '',
      agesError: '',
      nicknameError: '',
      phonNumberError: '',
      emailError: '',
      passwordError: '',
      checkPasswordError: '',
    };

    if (userFormData.gender === '') {
      newErrorMessage.genderError = '성별을 선택해주세요.';
    }

    if (userFormData.ages === '선택') {
      newErrorMessage.agesError = '나이대를 선택해주세요.';
    }

    if (!isValidNickname(userFormData.nickname)) {
      newErrorMessage.nicknameError =
        '닉네임은 공백없이 8자 이내로 입력해주세요.';
    }
    if (!isValidNumber(userFormData.phoneNumber)) {
      newErrorMessage.phonNumberError = '전화번호 형식을 확인해주세요.';
    }
    if (!isValidEmail(userFormData.email)) {
      newErrorMessage.emailError = '이메일 형식을 확인해주세요.';
    }
    if (!isValidPassword(userFormData.password)) {
      newErrorMessage.passwordError =
        '비밀번호는 영문, 숫자를 포함하여 8자~15자 이내로 입력해주세요.';
    }
    if (userFormData.password !== userFormData.passwordCheck) {
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
        <div className='flex items-center'>
          <p className='mr-[34px] text-[14px] font-normal'>성별</p>
          <input
            type='radio'
            name='gender'
            value='male'
            className='mr-[6px]'
            onChange={handleChange}
          />
          <label
            htmlFor='male'
            className='mr-[20px] text-[14px]'
          >
            남자
          </label>
          <input
            type='radio'
            name='gender'
            value='female'
            className='w-[14px mr-[6px] h-[14px]'
            onChange={handleChange}
          />
          <label
            htmlFor='female'
            className='text-[14px]'
          >
            여자
          </label>
        </div>
        {errorMessage.genderError && (
          <div className='mt-[8px] text-[12px] font-medium text-[#F83A3A]'>
            {errorMessage.genderError}
          </div>
        )}
        <SelectAges
          userFormData={userFormData}
          setUserFormData={setUserFormData}
        />
        {errorMessage.agesError && (
          <div className='mt-[8px] text-[12px] font-medium text-[#F83A3A]'>
            {errorMessage.agesError}
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
        <PhoneNumberInput
          userFormData={userFormData}
          setUserFormData={setUserFormData}
        />
        {errorMessage.phonNumberError && (
          <div className='mt-[8px] text-[12px] font-medium text-[#F83A3A]'>
            {errorMessage.phonNumberError}
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
          className='btn-primary mt-[30px] text-[16px] font-medium'
        >
          가입 완료
        </button>
        <div className='mt-[10px] flex justify-center'>
          <span className='text-[12px] font-normal text-[#717171]'>
            이미 계정이 있으신가요?
          </span>
          <button
            type='button'
            className='ml-[6px] border-b border-b-black text-[12px] font-bold leading-[14px]'
            onClick={() => navigate('/login/user')}
          >
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserSignUpForm;
