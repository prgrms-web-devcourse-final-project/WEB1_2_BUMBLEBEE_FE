import BottomNavigation from '@layouts/BottomNavigation';
import HeaderNoTitle from './layouts/HeaderNoTitle';
import MainLayout from './layouts/MainLayout';

const App = () => {
  return (
    <>
      <MainLayout>
        <HeaderNoTitle />
        <BottomNavigation />
      </MainLayout>
    </>
  );
};

export default App;
