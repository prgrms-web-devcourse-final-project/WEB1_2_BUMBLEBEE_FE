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
    // 하이픈 포함 13자리까지만 입력 가능하도록 만들기
    if (e.target.value.length > 13) {
      e.target.value = e.target.value.substring(0, 13);
    }
    const basicNumber = e.target.value;
    // 숫자만 남기기
    const onlyNumber = e.target.value.replace(/[^0-9]/g, '');
    let formatNumber = basicNumber;

    if (onlyNumber.length === 11) {
      formatNumber = onlyNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }

    if (userFormData.phoneNumber !== formatNumber) {
      setUserFormData({ ...userFormData, phoneNumber: formatNumber });
    }
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
        placeholder='전화번호 입력'
        onChange={handleChange}
        value={userFormData.phoneNumber}
      />
    </div>
  );
};

export default PhoneNumberInput;
