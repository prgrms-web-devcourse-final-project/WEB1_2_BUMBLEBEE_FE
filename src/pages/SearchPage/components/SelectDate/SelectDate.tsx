import { useState } from 'react';
import Calendar from 'react-calendar';
import './SelectDate.css';
import moment from 'moment';

type DatePiece = Date | null;

type SelectedDate = DatePiece | [DatePiece, DatePiece];

const SelectDate = () => {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

  return (
    <div className='flex flex-col gap-[4px]'>
      <label
        htmlFor='calendar'
        className='h-[32px] w-custom px-[6px] font-normal'
      >
        날짜 선택
      </label>
      <Calendar
        onChange={setSelectedDate}
        formatDay={(_, date) => moment(date).format('DD')}
        value={selectedDate}
        prev2Label={null}
        next2Label={null}
        showFixedNumberOfWeeks
      />
    </div>
  );
};

export default SelectDate;
