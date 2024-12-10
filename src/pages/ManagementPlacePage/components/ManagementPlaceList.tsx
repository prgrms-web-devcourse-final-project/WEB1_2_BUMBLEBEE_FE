import { IoAdd } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import ManagementPlaceCard from './ManagementPlaceCard';
import useGetBusinessWorkplaces from '../hooks/useGetBusinessWorkplaces';

const ManagementPlaceList = () => {
  const navigate = useNavigate();
  const { workplaces } = useGetBusinessWorkplaces();

  const sortedWorkPlaceList = [...workplaces].sort((b, a) => {
    return +new Date(a.createdAt) - +new Date(b.createdAt);
  });

  const handleAddBusinessPlace = () => {
    navigate('/register-Space');
  };

  return (
    <div className='mt-[6px] flex w-[375px] flex-col justify-center pb-24'>
      {workplaces.length > 0 &&
        sortedWorkPlaceList.map((item) => {
          return (
            <ManagementPlaceCard
              key={item.workplaceId}
              item={item}
            />
          );
        })}

      <button
        type='button'
        className='group mx-auto my-6 flex h-32 w-custom flex-col items-center justify-center rounded-[8px] border border-dashed p-2 active:border-primary'
        onClick={handleAddBusinessPlace}
      >
        <IoAdd className='text-6xl text-subfont group-active:text-primary' />
        <p className='text-sm text-subfont group-active:text-primary'>
          새로운 사업장 등록하기
        </p>
      </button>
    </div>
  );
};

export default ManagementPlaceList;
