import DeleteAccountButton from '@components/DeleteAccountButton';
import { useLocation } from 'react-router-dom';
import { Member } from '@typings/types';
import UserEditForm from './UserEditForm';

const UserEditContainer = () => {
  const location = useLocation();
  const user: Member = { ...location.state };
  console.log(user);

  return (
    <div className='relative mt-14 flex w-[375px] flex-col'>
      <UserEditForm user={user} />
      <div className='absolute bottom-[-280px] left-[50%] translate-x-[-50%]'>
        <DeleteAccountButton />
      </div>
    </div>
  );
};

export default UserEditContainer;
