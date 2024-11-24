import DeleteAccountButton from '@pages/UserInfoPage/components/DeleteAccountButton';
import HostInfoBox from './HostInfoBox';

const HostInfoContainer = () => {
  return (
    <div className='mt-14 flex w-[375px] flex-col justify-center gap-60'>
      <div className='mx-auto flex w-custom flex-col justify-center gap-10'>
        <HostInfoBox />
        <button
          type='button'
          className='btn-primary border border-primary bg-white text-primary active:bg-primary active:text-white'
        >
          수정하기
        </button>
      </div>
      <DeleteAccountButton />
    </div>
  );
};

export default HostInfoContainer;
