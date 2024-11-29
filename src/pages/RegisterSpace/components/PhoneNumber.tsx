import { Space } from '@typings/types';
import { insertWorkPlacetPhoneNumberHyphen } from '@utils/autoHyphen';
import { ChangeEvent } from 'react';

export interface PhoneNumberProps {
  spaceFormData: Space;
  changeFormdata: (data: Partial<Space>) => void;
}

const PhoneNumber = ({ spaceFormData, changeFormdata }: PhoneNumberProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatNumber = insertWorkPlacetPhoneNumberHyphen(e.target.value);
    changeFormdata({ phoneNumber: formatNumber });
  };

  return (
    <div className='mt-[40px] flex flex-col'>
      <label
        htmlFor='phoneNumber'
        className='mb-[6px] text-[14px] font-normal'
      >
        전화번호
      </label>
      <input
        name='phoneNumber'
        type='text'
        className='main-input'
        placeholder='사업장 전화번호를 입력해주세요.'
        onChange={handleChange}
        value={spaceFormData.phoneNumber}
        maxLength={14}
      />
    </div>
  );
};

export default PhoneNumber;
