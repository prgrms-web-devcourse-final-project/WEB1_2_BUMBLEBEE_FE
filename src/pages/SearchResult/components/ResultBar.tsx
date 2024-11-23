import useSearchStore from '@store/searchStore';
import { useNavigate } from 'react-router-dom';

const ResultBar = () => {
  const navigate = useNavigate();
  const { searchPlace, searchDate, searchTime, searchPeople } =
    useSearchStore();

  const formattedDate = searchDate.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
  });

  const setTimeArray = (timeArr: string[]) => {
    const lastTime = timeArr[timeArr.length - 1];
    const [hour] = lastTime.split(':');
    const newTimeArray = [timeArr[0], `${hour}:59`];
    return newTimeArray;
  };

  const formattedTime = setTimeArray(searchTime).join(' ~ ');

  return (
    <div className='mx-auto mt-4 flex w-custom justify-center gap-1 rounded-full py-[18px] text-sm shadow-custom'>
      <button
        type='button'
        className='w-16 overflow-hidden text-ellipsis whitespace-nowrap border-r-2 border-subfont pr-1 text-center'
        onClick={() => navigate('/search')}
      >
        {searchPlace}
      </button>
      <button
        type='button'
        className='w-20 border-r-2 border-subfont text-center'
        onClick={() => navigate('/search')}
      >
        {formattedDate}
      </button>
      <button
        type='button'
        className='w-[100px] border-r-2 border-subfont text-center'
        onClick={() => navigate('/search')}
      >
        {formattedTime}
      </button>
      <button
        type='button'
        className='w-8 text-center'
        onClick={() => navigate('/search')}
      >
        {searchPeople}명
      </button>
    </div>
  );
};

export default ResultBar;
