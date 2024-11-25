import DeleteAccountButton from '@components/DeleteAccountButton';
import HostEditForm from './HostEditForm';

const HostEditContainer = () => {
  return (
    <div className='relative mt-14 flex w-[375px] flex-col'>
      <HostEditForm />
      <div className='absolute bottom-[-280px] left-[50%] translate-x-[-50%]'>
        <DeleteAccountButton />
      </div>
    </div>
  );
};

export default HostEditContainer;
