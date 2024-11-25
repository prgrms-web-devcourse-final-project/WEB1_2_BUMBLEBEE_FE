import { useNavigate } from 'react-router-dom';
import HostInfoBox from './HostInfoBox';

const HostInfoContainer = () => {
  const navigate = useNavigate();

  const handleMoveEditPage = () => {
    navigate('/host-info-edit');
  };

  return (
    <div className='mt-14 flex w-[375px] flex-col justify-center'>
      <div className='mx-auto flex w-custom flex-col justify-center gap-10'>
        <HostInfoBox />
        <button
          type='button'
          className='btn-primary border border-primary bg-white text-primary active:bg-primary active:text-white'
          onClick={handleMoveEditPage}
        >
          수정하기
        </button>
      </div>
    </div>
  );
};

export default HostInfoContainer;
