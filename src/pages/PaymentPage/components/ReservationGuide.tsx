import CheckAgree from '@components/CheckAgree';
import DetailTitle from '@components/DetailTitle';
import { useState } from 'react';

const ReservationGuide = () => {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const handleCheckItem = (checked: boolean, id: string) => {
    if (checked) {
      setCheckedList((prev) => [...prev, id]);
    } else {
      setCheckedList(checkedList.filter((item) => item !== id));
    }
  };

  const isChecked = (id: string) => checkedList.includes(id);

  return (
    <div className='mx-auto mt-8 flex w-custom flex-col gap-4'>
      <DetailTitle title='예약 안내' />
      <div className='flex flex-col gap-2 text-xs'>
        <CheckAgree
          checkId='reservation1'
          isCheck={isChecked('reservation1')}
          description='개인정보 수집/이용
              동의'
          onChangeChecked={handleCheckItem}
        />
        <CheckAgree
          checkId='reservation2'
          isCheck={isChecked('reservation2')}
          description='개인정보 제3자 제공 동의'
          onChangeChecked={handleCheckItem}
        />

        <CheckAgree
          checkId='reservation3'
          isCheck={isChecked('reservation3')}
          description='환불규정 안내에 대한 동의'
          onChangeChecked={handleCheckItem}
        />
      </div>
    </div>
  );
};

export default ReservationGuide;
