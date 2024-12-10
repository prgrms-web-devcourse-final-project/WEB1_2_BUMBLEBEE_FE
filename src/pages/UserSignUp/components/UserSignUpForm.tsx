import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  isValidBirth,
  isValidEmail,
  isValidNickname,
  isValidPassword,
  isValidUserPhoneNumber,
} from '@utils/validationCheckRegex';
import { ERROR_MESSAGE, PLACEHOLDER } from '@constants/constants';
import PhoneNumberInput from './PhoneNumberInput';
import BirthInput from './BirthInput';
import useUserSignUp from '../hooks/useUserSignUp';

const UserSignUpForm = () => {
  const navigate = useNavigate();

  const [userFormData, setUserFormData] = useState({
    gender: '',
    birth: '',
    nickname: '',
    phoneNumber: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  // input 값 반영
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'nickname' && e.target.value.length > 8) {
      e.target.value = e.target.value.substring(0, 10);
    }
    setUserFormData({
      ...userFormData,
      [e.target.name]: e.target.value,
    });
  };

  const [errorMessage, setErrorMessage] = useState({
    genderError: '',
    birthError: '',
    nicknameError: '',
    phonNumberError: '',
    emailError: '',
    passwordError: '',
    checkPasswordError: '',
  });

  const isValid = () => {
    const newErrorMessage = {
      genderError: '',
      birthError: '',
      nicknameError: '',
      phonNumberError: '',
      emailError: '',
      passwordError: '',
      checkPasswordError: '',
    };

    if (userFormData.gender === '') {
      newErrorMessage.genderError = ERROR_MESSAGE.gender;
    }
    if (!isValidBirth(userFormData.birth)) {
      newErrorMessage.birthError = ERROR_MESSAGE.birth;
    }
    if (!isValidNickname(userFormData.nickname)) {
      newErrorMessage.nicknameError = ERROR_MESSAGE.nickname;
    }
    if (!isValidUserPhoneNumber(userFormData.phoneNumber)) {
      newErrorMessage.phonNumberError = ERROR_MESSAGE.phonNumber;
    }
    if (!isValidEmail(userFormData.email)) {
      newErrorMessage.emailError = ERROR_MESSAGE.email;
    }
    if (!isValidPassword(userFormData.password)) {
      newErrorMessage.passwordError = ERROR_MESSAGE.password;
    }
    if (userFormData.password !== userFormData.passwordCheck) {
      newErrorMessage.checkPasswordError = ERROR_MESSAGE.checkPassword;
    }

    setErrorMessage(newErrorMessage);
  };

  const { mutate } = useUserSignUp();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isValid();
    if (
      userFormData.gender !== '' &&
      isValidBirth(userFormData.birth) &&
      isValidNickname(userFormData.nickname) &&
      isValidUserPhoneNumber(userFormData.phoneNumber) &&
      isValidEmail(userFormData.email) &&
      isValidPassword(userFormData.password) &&
      userFormData.password === userFormData.passwordCheck
    ) {
      mutate({
        nickName: userFormData.nickname,
        phoneNumber: userFormData.phoneNumber,
        sex: userFormData.gender,
        email: userFormData.email,
        pwd: userFormData.password,
        birthDay: userFormData.birth,
      });
    }
  };

  return (
    <div className='flex justify-center pt-[30px]'>
      <form
        className='w-custom'
        onSubmit={handleSubmit}
      >
        <div className='flex items-center'>
          <p className='mr-[34px] text-[14px] font-normal'>성별</p>
          <input
            type='radio'
            name='gender'
            value='MALE'
            className='mr-[6px]'
            onChange={handleChange}
          />
          <label
            htmlFor='MALE'
            className='mr-[20px] text-[14px]'
          >
            남자
          </label>
          <input
            type='radio'
            name='gender'
            value='FEMALE'
            className='w-[14px mr-[6px] h-[14px]'
            onChange={handleChange}
          />
          <label
            htmlFor='FEMALE'
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
        <BirthInput
          userFormData={userFormData}
          setUserFormData={setUserFormData}
        />
        {errorMessage.birthError && (
          <div className='mt-[8px] text-[12px] font-medium text-[#F83A3A]'>
            {errorMessage.birthError}
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
        <div className='mt-[10px] flex justify-center pb-[80px]'>
          <span className='text-[12px] font-normal text-[#717171]'>
            이미 계정이 있으신가요?
          </span>
          <button
            type='button'
            className='ml-[6px] border-b border-b-black text-[12px] font-semibold leading-[14px]'
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
