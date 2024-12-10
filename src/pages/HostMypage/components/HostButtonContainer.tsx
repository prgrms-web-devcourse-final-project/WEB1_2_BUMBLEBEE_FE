import CategoryButton from '@pages/UserMypage/components/CategoryButton';
import LogoutButton from '@components/LogoutButton';
import { useNavigate } from 'react-router-dom';
import HostCategoryButton from './HostCategoryButton';

const HostButtonContainer = () => {
  const navigate = useNavigate();

  const handleMoveBusinessInfo = () => {
    navigate('/host-info');
  };

  const handleMoveReserverList = () => {
    navigate('/management-reserver-list');
  };

  const handleMoveWorkplaceList = () => {
    navigate('/management-place-list');
  };

  return (
    <div className='absolute top-[260px] flex w-[330px] flex-col gap-[18px]'>
      <HostCategoryButton
        category='예약자 확인'
        onClickFunction={handleMoveReserverList}
      />
      <HostCategoryButton
        category='사업장 관리'
        onClickFunction={handleMoveWorkplaceList}
      />
      <CategoryButton
        category='회원 정보'
        onClickFunction={handleMoveBusinessInfo}
      />
      <LogoutButton />
    </div>
  );
};

export default HostButtonContainer;
