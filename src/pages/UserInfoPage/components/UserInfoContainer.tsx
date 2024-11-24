import DeleteAccountButton from './DeleteAccountButton';
import UserInfoBox from './UserInfoBox';

const UserInfoContainer = () => {
  return (
    <div className='mt-14 flex w-[375px] flex-col justify-center gap-52'>
      <div className='mx-auto flex w-custom flex-col justify-center gap-10'>
        <UserInfoBox />
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

export default UserInfoContainer;
