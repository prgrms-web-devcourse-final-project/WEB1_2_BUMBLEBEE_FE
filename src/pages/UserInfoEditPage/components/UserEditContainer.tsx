import DeleteAccountButton from '@components/DeleteAccountButton';
import UserEditForm from './UserEditForm';

const UserEditContainer = () => {
  return (
    <div className='relative mt-14 flex w-[375px] flex-col'>
      <UserEditForm />
      <div className='absolute bottom-[-280px] left-[50%] translate-x-[-50%]'>
        <DeleteAccountButton />
      </div>
    </div>
  );
};

export default UserEditContainer;
