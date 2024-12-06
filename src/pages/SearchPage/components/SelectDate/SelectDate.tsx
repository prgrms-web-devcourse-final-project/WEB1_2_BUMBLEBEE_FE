import Calendar from 'react-calendar';
import './SelectDate.css';
import moment from 'moment';
import useSearchStore from '@store/searchStore';

type DatePiece = Date | null;

type SelectedDate = DatePiece | [DatePiece, DatePiece];

const SelectDate = () => {
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
        minDate={new Date()}
      />
    </div>
  );
};

export default SelectDate;
