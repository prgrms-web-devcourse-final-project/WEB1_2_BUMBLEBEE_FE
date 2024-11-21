import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BusinessLoginForm = () => {
  const navigate = useNavigate();

  const [hostLoginForm, setHostLoginForm] = useState({
    email: '',
    password: '',
  });

  // input 값 반영
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHostLoginForm({ ...hostLoginForm, [e.target.name]: e.target.value });
  };

  // 이메일 형식 확인
  const isValidEmail = (email: string) => {
    const emailRegex =
      /^(?=.{1,100}@)[A-Za-z0-9-]+(.[A-Za-z0-9_-]+)@[^-][A-Za-z0-9-]+(.[A-Za-z0-9-]+)(.[A-Za-z]{2,})$/;
    return emailRegex.test(email);
  };

  // 비밀번호 형식 확인
  const isValidPassword = (pwd: string) => {
    const pwdRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%?&])[A-Za-z\d$@$!%?&]{8,20}$/;
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

    if (!isValidEmail(hostLoginForm.email)) {
      newError.emailError = '이메일 형식을 확인해주세요.';
    }
    if (!isValidPassword(hostLoginForm.password)) {
      newError.passwordError =
        '대소문자, 숫자, 특수문자($,@,!,%,?,&)를 모두 포함해야 합니다.';
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
            placeholder='비밀번호 입력 (8~20자 이내)'
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
