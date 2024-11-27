import CheckAgree from '@components/CheckAgree';
import DetailTitle from '@components/DetailTitle';
import { useState } from 'react';

const PaymentAgree = () => {
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
      <DetailTitle title='주문 내용 확인 및 결제 동의' />
      <div className='flex flex-col gap-2 text-xs'>
        <CheckAgree
          checkId='payment1'
          isCheck={isChecked('payment1')}
          description='결제 서비스 이용 약관'
          onChangeChecked={handleCheckItem}
        />
        <CheckAgree
          checkId='payment2'
          isCheck={isChecked('payment2')}
          description='주문정보 및 결제정보를 확인하였으며, 구매진행에 동의합니다.'
          onChangeChecked={handleCheckItem}
        />
      </div>
    </div>
  );
};

export default PaymentAgree;
