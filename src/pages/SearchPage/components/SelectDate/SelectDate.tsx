import Calendar from 'react-calendar';
import './SelectDate.css';
import moment from 'moment';
import useSearchStore from '@store/searchStore';
// import { SearchType } from '@typings/types';

type DatePiece = Date | null;

type SelectedDate = DatePiece | [DatePiece, DatePiece];

// interface SelectDateProps {
//   searchValue: SearchType;
//   onSetSearchValue: (value: SearchType) => void;
// }

const SelectDate = () => {
  // const { searchValue, onSetSearchValue } = props;
  const { searchDate, setDate } = useSearchStore();
  const handleChangeDate = (newDate: SelectedDate) => {
    if (newDate instanceof Date) {
      setDate(new Date(newDate));
    }
  };
  return (
    <div className='flex flex-col gap-[4px]'>
      <label
        htmlFor='calendar'
        className='h-[32px] w-custom px-[6px] font-normal'
      >
        날짜 선택
      </label>
      <Calendar
        onChange={handleChangeDate}
        formatDay={(_, date) => moment(date).format('DD')}
        value={searchDate}
        calendarType='gregory'
        view='month'
        prev2Label={null}
        next2Label={null}
        showFixedNumberOfWeeks
      />
    </div>
  );
};

export default SelectDate;
