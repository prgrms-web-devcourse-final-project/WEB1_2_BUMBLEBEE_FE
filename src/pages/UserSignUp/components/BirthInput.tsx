import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { UserFormData } from './PhoneNumberInput';

interface BirthInputProps {
  userFormData: UserFormData;
  setUserFormData: Dispatch<SetStateAction<UserFormData>>;
}

const BirthInput = ({ userFormData, setUserFormData }: BirthInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 하이픈 포함 10자리까지만 입력 가능하도록 만들기
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.substring(0, 10);
    }
    const basicBirth = e.target.value;
    // 숫자만 남기기
    const onlyNumber = e.target.value.replace(/[^0-9]/g, '');
    let formatBirth = basicBirth;

    if (onlyNumber.length === 8) {
      formatBirth = onlyNumber.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    }

    if (userFormData.birth !== formatBirth) {
      setUserFormData({ ...userFormData, birth: formatBirth });
    }
  };

  return (
    <div className='mt-[18px] flex flex-col'>
      <label
        htmlFor='birth'
        className='mb-[6px] text-[14px] font-normal'
      >
        생년월일
      </label>
      <input
        name='birth'
        type='text'
        className='main-input'
        placeholder='YYYY-MM-DD'
        onChange={handleChange}
        value={userFormData.birth}
      />
    </div>
  );
};

export default BirthInput;
