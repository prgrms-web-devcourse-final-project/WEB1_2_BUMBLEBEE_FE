import DeleteAccountButton from '@components/DeleteAccountButton';
import { useState } from 'react';
import Modal from '@components/Modal';
import { useLocation } from 'react-router-dom';
import { Business } from '@typings/types';
import HostEditForm from './HostEditForm';
import useDeleteBusiness from '../hooks/useDeleteBusiness';

const HostEditContainer = () => {
  const location = useLocation();
  const business: Business = { ...location.state };
  const { mutate } = useDeleteBusiness();

  const [modalOpen, setModalOpen] = useState(false);

  const handleDeleteAccountClick = () => {
    mutate();
  };

  return (
    <>
      <div className='relative mt-14 flex w-[375px] flex-col'>
        <HostEditForm business={business} />
        <div className='absolute bottom-[-280px] left-[50%] translate-x-[-50%]'>
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

export default HostEditContainer;
