import Calendar from 'react-calendar';
import './ReservationDate.css';
import moment from 'moment';
import useSearchStore from '@store/searchStore';
import { usePossibleTimeMutation } from '@pages/ReservationPage/hooks/useGetPossibleTime';

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];
interface ReservationDateProps {
  studyroomId: number;
}

const ReservationDate = (props: ReservationDateProps) => {
  const { studyroomId } = props;
  const { searchDate, setDate } = useSearchStore();
  const { mutate } = usePossibleTimeMutation();
  mutate({ studyRoomId: studyroomId, checkDate: searchDate });

  const handleChangeDate = (newDate: SelectedDate) => {
    if (newDate instanceof Date) {
      setDate(new Date(newDate));
      mutate({ studyRoomId: studyroomId, checkDate: new Date(newDate) });
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
      />
    </div>
  );
};

export default ReservationDate;
