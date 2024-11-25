import DeleteAccountButton from '@components/DeleteAccountButton';
import UserEditForm from './UserEditForm';

const HostEditContainer = () => {
  return (
    <div className='mt-14 flex w-[375px] flex-col justify-center'>
      <UserEditForm />
      <DeleteAccountButton />
    </div>
  );
};

export default HostEditContainer;
