import { useNavigate } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';
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
          className='flex h-[30px] items-center gap-1 self-end text-subfont active:text-primary'
          onClick={handleMoveEditPage}
        >
          정보 수정하기
          <MdArrowForwardIos />
        </button>
      </div>
    </div>
  );
};

export default HostInfoContainer;
