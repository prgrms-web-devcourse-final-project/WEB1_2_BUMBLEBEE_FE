import { PLACEHOLDER } from '@constants/constants';
import { insertPhoneNumberHyphen } from '@utils/autoHyphen';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export interface UserFormData {
  gender: string;
  birth: string;
  nickname: string;
  phoneNumber: string;
  email: string;
  password: string;
  passwordCheck: string;
}

interface PhoneNumberInputProps {
  userFormData: UserFormData;
  setUserFormData: Dispatch<SetStateAction<UserFormData>>;
}

const PhoneNumberInput = ({
  userFormData,
  setUserFormData,
}: PhoneNumberInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatNumber = insertPhoneNumberHyphen(e.target.value);
    setUserFormData({ ...userFormData, phoneNumber: formatNumber });
  };

  return (
    <div className='mt-[18px] flex flex-col'>
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
        placeholder={PLACEHOLDER.phonNumber}
        onChange={handleChange}
        value={userFormData.phoneNumber}
      />
    </div>
  );
};

export default PhoneNumberInput;
