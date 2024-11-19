import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectAges from './SelectAges';
import PhoneNumberInput from './PhoneNumberInput';

const UserSignUpForm = () => {
  const navigate = useNavigate();

  const [userFormData, setUserFormData] = useState({
    gender: '',
    ages: '10대',
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        <SelectAges
          userFormData={userFormData}
          setUserFormData={setUserFormData}
        />
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
        <PhoneNumberInput
          userFormData={userFormData}
          setUserFormData={setUserFormData}
        />
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
