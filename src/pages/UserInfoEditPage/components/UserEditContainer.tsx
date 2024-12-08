import DeleteAccountButton from '@components/DeleteAccountButton';
import { useLocation } from 'react-router-dom';
import { Member } from '@typings/types';
import { useState } from 'react';
import Modal from '@components/Modal';
import UserEditForm from './UserEditForm';
import useDeleteMember from '../hooks/useDeleteMember';

const UserEditContainer = () => {
  const location = useLocation();
  const user: Member = { ...location.state };

  const { mutate } = useDeleteMember();

  const [modalOpen, setModalOpen] = useState(false);

  const handleDeleteAccountClick = () => {
    mutate();
  };

  return (
    <>
      <div className='relative mt-10 flex w-[375px] flex-col items-center'>
        <UserEditForm user={user} />
        <div className='mb-4 mt-[100px]'>
          <DeleteAccountButton onClickButton={() => setModalOpen(true)} />
        </div>
      </div>
      {modalOpen && (
        <Modal
          message='정말 탈퇴하시겠습니까?'
          onCancelButtonClick={() => setModalOpen(false)}
          onConfirmButtonClick={handleDeleteAccountClick}
        />
      )}
    </>
  );
};

export default UserEditContainer;
