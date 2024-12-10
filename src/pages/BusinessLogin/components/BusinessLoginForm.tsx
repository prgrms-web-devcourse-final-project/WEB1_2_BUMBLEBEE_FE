import { ERROR_MESSAGE, PLACEHOLDER } from '@constants/constants';
import { isValidEmail, isValidPassword } from '@utils/validationCheckRegex';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBusinessLogIn from '../hooks/useBusinessLogin';

const BusinessLoginForm = () => {
  const navigate = useNavigate();

  const [hostLoginForm, setHostLoginForm] = useState({
    email: '',
    password: '',
  });

  // input 값 반영
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHostLoginForm({ ...hostLoginForm, [e.target.name]: e.target.value });
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

    if (!isValidEmail(hostLoginForm.email)) {
      newError.emailError = ERROR_MESSAGE.email;
    }
    if (!isValidPassword(hostLoginForm.password)) {
      newError.passwordError = ERROR_MESSAGE.password;
    }

    setErrorMessage(newError);
  };

  const { mutate } = useBusinessLogIn();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isValid();
    if (
      isValidEmail(hostLoginForm.email) &&
      isValidPassword(hostLoginForm.password)
    ) {
      mutate({ email: hostLoginForm.email, password: hostLoginForm.password });
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
            onClick={() => navigate('/signup/business')}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessLoginForm;
