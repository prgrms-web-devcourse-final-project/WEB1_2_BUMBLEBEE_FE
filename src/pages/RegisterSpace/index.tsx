import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import SpaceForm from './components/SpaceForm';

const RegisterSpace = () => {
  return (
    <MainLayout>
      <HeaderOnlyTitle title='공간 등록' />
      <hr className='fixed top-[93px] mx-[22.5px] h-0.5 w-custom border-0 bg-black' />
      <SpaceForm />
    </MainLayout>
  );
};

export default RegisterSpace;
