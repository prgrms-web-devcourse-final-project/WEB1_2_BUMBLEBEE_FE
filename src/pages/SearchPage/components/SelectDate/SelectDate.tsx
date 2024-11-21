import Calendar from 'react-calendar';
import './SelectDate.css';
import moment from 'moment';
import { SearchType } from '@pages/SearchPage';

type DatePiece = Date | null;

type SelectedDate = DatePiece | [DatePiece, DatePiece];

interface SelectDateProps {
  searchValue: SearchType;
  onSetSearchValue: (value: SearchType) => void;
}

const SelectDate = (props: SelectDateProps) => {
  const { searchValue, onSetSearchValue } = props;

  const handleChangeDate = (newDate: SelectedDate) => {
    const newDateString = newDate?.toString() || '';
    onSetSearchValue({ ...searchValue, date: newDateString });
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
        value={searchValue.date}
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
