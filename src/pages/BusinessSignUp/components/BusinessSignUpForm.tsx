const BusinessSignUpForm = () => {
  return (
    <div className='flex justify-center pt-[40px]'>
      <form className='w-custom'>
        <div className='mt-[18px] flex flex-col'>
          <label
            htmlFor='businessNumber'
            className='mb-[6px] text-[14px] font-medium'
          >
            사업자 등록 번호
          </label>
          <input
            id='businessNumber'
            type='number'
            className='main-input'
            placeholder='사업자 등록 번호 입력'
          />
        </div>
        <div className='mt-[18px] flex flex-col'>
          <label
            htmlFor='nickname'
            className='mb-[6px] text-[14px] font-medium'
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
            htmlFor='email'
            className='mb-[6px] text-[14px] font-medium'
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
            className='mb-[6px] text-[14px] font-medium'
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
            className='mb-[6px] text-[14px] font-medium'
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
          className='btn-primary mt-[30px] text-[16px] font-semibold'
        >
          가입 완료
        </button>
        <div className='mt-[10px] flex justify-center'>
          <span className='text-[12px] font-medium text-[#717171]'>
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

export default BusinessSignUpForm;
