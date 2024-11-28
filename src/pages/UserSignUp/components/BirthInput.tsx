import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { insertBirthHyphen } from '@utils/autoHyphen';
import { PLACEHOLDER } from '@constants/constants';
import { UserFormData } from './PhoneNumberInput';

interface BirthInputProps {
  userFormData: UserFormData;
  setUserFormData: Dispatch<SetStateAction<UserFormData>>;
}

const BirthInput = ({ userFormData, setUserFormData }: BirthInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatBirth = insertBirthHyphen(e.target.value);
    setUserFormData({ ...userFormData, birth: formatBirth });
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
        placeholder={PLACEHOLDER.birth}
        onChange={handleChange}
        value={userFormData.birth}
      />
    </div>
  );
};

export default BirthInput;
