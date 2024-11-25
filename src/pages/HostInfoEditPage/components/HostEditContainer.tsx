import DeleteAccountButton from '@components/DeleteAccountButton';
import HostEditForm from './HostEditForm';

const HostEditContainer = () => {
  return (
    <div className='mt-14 flex w-[375px] flex-col justify-center gap-60'>
      <HostEditForm />
      <DeleteAccountButton />
    </div>
  );
};

export default HostEditContainer;
