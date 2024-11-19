import { IoMdArrowDropdown } from 'react-icons/io';

const UserSignUpForm = () => {
  return (
    <div className='flex justify-center pt-[40px]'>
      <form className='w-custom'>
        <div className='flex items-center'>
          <p className='mr-[34px] text-[14px] font-normal'>성별</p>
          <input
            id='male'
            type='radio'
            name='gender'
            value='male'
            className='" mr-[6px]'
          />
          <label
            htmlFor='male'
            className='mr-[20px] text-[14px]'
          >
            남자
          </label>
          <input
            id='female'
            type='radio'
            name='gender'
            value='female'
            className='w-[14px mr-[6px] h-[14px]'
          />
          <label
            htmlFor='female'
            className='text-[14px]'
          >
            여자
          </label>
        </div>
        <div className='mt-[18px] flex items-center py-[15px]'>
          <p className='mr-[20px] text-[14px] font-normal'>나이대</p>
          <div className='flex h-[38px] w-[90px] items-center justify-evenly rounded-[5px] border border-solid border-subfont'>
            <span className='text-[14px]'>10대</span>
            <button
              type='button'
              className=''
            >
              <IoMdArrowDropdown size='20px' />
            </button>
          </div>
        </div>
        <div className='mt-[18px] flex flex-col'>
          <label
            htmlFor='nickname'
            className='mb-[6px] text-[14px] font-normal'
          >
            닉네임
          </label>
          <input
            id='nickname'
            type='text'
            className='main-input'
            placeholder='닉네임 입력'
          />
        </div>
        <div className='mt-[18px] flex flex-col'>
          <label
            htmlFor='phoneNumber'
            className='mb-[6px] text-[14px] font-normal'
          >
            전화번호
          </label>
          <input
            id='phoneNumber'
            type='number'
            className='main-input'
            placeholder='전화번호 입력'
          />
        </div>
        <div className='mt-[18px] flex flex-col'>
          <label
            htmlFor='email'
            className='mb-[6px] text-[14px] font-normal'
          >
            이메일
          </label>
          <input
            id='email'
            type='text'
            className='main-input'
            placeholder='이메일 입력'
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
            id='password'
            type='text'
            className='main-input'
            placeholder='비밀번호 입력'
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
            id='checkPassword'
            type='text'
            className='main-input'
            placeholder='비밀번호 확인'
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
          >
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserSignUpForm;
