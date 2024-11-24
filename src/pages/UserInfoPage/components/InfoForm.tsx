import DeleteAccountButton from './DeleteAccountButton';
import InputContainer from './InputContainer';

const InfoForm = () => {
  return (
    <div className='mt-14 flex w-[375px] flex-col justify-center'>
      <div className='mx-auto flex w-custom flex-col justify-center gap-10'>
        <InputContainer />
        <button
          type='button'
          className='btn-primary border border-primary bg-white text-primary active:bg-primary active:text-white'
        >
          수정하기
        </button>
      </div>
      <div>
        <DeleteAccountButton />
      </div>
    </div>
  );
};

export default InfoForm;
