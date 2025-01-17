import Calendar from 'react-calendar';
import './ReservationDate.css';
import moment from 'moment';
import useSearchStore from '@store/searchStore';

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

const ReservationDate = () => {
  const { searchDate, setDate, setTime, setFormattedTime } = useSearchStore();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  const handleChangeDate = (newDate: SelectedDate) => {
    if (newDate instanceof Date) {
      setDate(newDate);
      setTime([]);
      setFormattedTime([]);
    }
  };
  return (
    <div className='absolute top-20 flex flex-col gap-[4px]'>
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

export default ReservationDate;
