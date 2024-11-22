import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import RoomForm from './components/RoomForm';

const AddRoom = () => {
  return (
    <MainLayout>
      <HeaderOnlyTitle title='룸 등록하기' />
      <hr className='fixed top-[93px] mx-[22.5px] h-0.5 w-custom border-0 bg-black' />
      <RoomForm />
    </MainLayout>
  );
};

export default AddRoom;
