import Calendar from 'react-calendar';
import './SelectDate.css';
import moment from 'moment';
import useSearchStore from '@store/searchStore';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

type DatePiece = Date | null;

type SelectedDate = DatePiece | [DatePiece, DatePiece];

const SelectDate = () => {
  const { searchDate, setDate, setTime, setFormattedTime } = useSearchStore();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  const location = useLocation();
  const isBack = location.state || false;

  useEffect(() => {
    if (!isBack) {
      setDate(new Date());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBack]);

  const handleChangeDate = (newDate: SelectedDate) => {
    if (newDate instanceof Date) {
      setDate(new Date(newDate));
      setTime([]);
      setFormattedTime([]);
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
        maxDate={maxDate}
      />
    </div>
  );
};

export default SelectDate;
