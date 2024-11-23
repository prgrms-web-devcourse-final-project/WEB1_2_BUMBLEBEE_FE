import { useNavigate } from 'react-router-dom';

interface ResultBarProps {
  searchInfo: {
    place: string;
    date: string;
    time: string;
    people: string;
  };
}

const ResultBar = (props: ResultBarProps) => {
  const navigate = useNavigate();
  const { searchInfo } = props;
  const formattedDate = new Date(searchInfo.date).toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = searchInfo.time.replace(',', ' ~ ');

  const handleBackSearch = () => {
    navigate('/search', {
      state: {
        place: `${searchInfo.place}`,
        date: `${searchInfo.date}`,
        time: `${searchInfo.time}`,
        people: `${searchInfo.people}`,
        fromBack: true,
      },
    });
  };

  return (
    <div className='mx-auto mt-4 flex w-custom justify-center gap-1 rounded-full py-[18px] text-sm shadow-custom'>
      <button
        type='button'
        className='w-16 overflow-hidden text-ellipsis whitespace-nowrap border-r-2 border-subfont pr-1 text-center'
        onClick={handleBackSearch}
      >
        {searchInfo.place}
      </button>
      <button
        type='button'
        className='w-20 border-r-2 border-subfont text-center'
      >
        {formattedDate}
      </button>
      <button
        type='button'
        className='w-[100px] border-r-2 border-subfont text-center'
      >
        {formattedTime}
      </button>
      <button
        type='button'
        className='w-8 text-center'
      >
        {searchInfo.people}명
      </button>
    </div>
  );
};

export default ResultBar;
