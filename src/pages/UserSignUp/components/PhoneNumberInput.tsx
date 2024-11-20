import { useEffect } from 'react';

interface UserFormData {
  gender: string;
  ages: string;
  nickname: string;
  phoneNumber: string;
  email: string;
  password: string;
  passwordCheck: string;
}

interface PhoneNumberInputProps {
  userFormData: UserFormData;
  setUserFormData: React.Dispatch<React.SetStateAction<UserFormData>>;
}

const PhoneNumberInput = ({
  userFormData,
  setUserFormData,
}: PhoneNumberInputProps) => {
  const { phoneNumber } = userFormData;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 하이픈 포함 13자리까지만 입력 가능하도록 만들기
    if (e.target.name === 'phoneNumber' && e.target.value.length > 13) {
      e.target.value = e.target.value.substring(0, 13);
    }
    setUserFormData({
      ...userFormData,
      phoneNumber: e.target.value,
    });
  };

  useEffect(() => {
    if (!phoneNumber) return;

    if (phoneNumber.length === 11) {
      const formatNumber = phoneNumber.replace(
        /(\d{3})(\d{4})(\d{4})/,
        '$1-$2-$3',
      );
      if (phoneNumber !== formatNumber) {
        setUserFormData({
          ...userFormData,
          phoneNumber: formatNumber,
        });
      }
    } else if (phoneNumber.length === 13) {
      const formatNumber = phoneNumber
        .replace(/-/g, '')
        .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      if (phoneNumber !== formatNumber) {
        setUserFormData({
          ...userFormData,
          phoneNumber: formatNumber,
        });
      }
    }
  }, [phoneNumber, setUserFormData, userFormData]);

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
