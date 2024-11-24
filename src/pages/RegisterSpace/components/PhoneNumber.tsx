import { Space } from '@typings/Types';

export interface PhoneNumberProps {
  spaceFormData: Space;
  changeFormdata: (data: Partial<Space>) => void;
}

const PhoneNumber = ({ spaceFormData, changeFormdata }: PhoneNumberProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 하이픈 포함 최대 14자리까지만 입력 가능
    if (e.target.value.length > 14) {
      e.target.value = e.target.value.substring(0, 14);
    }
    const basicNumber = e.target.value;
    // 숫자만 남기기
    const onlyNumber = e.target.value.replace(/[^0-9]/g, '');
    let formatNumber = basicNumber;
    // 전화번호 경우의 수에 따라 자동 하이픈
    if (onlyNumber.length === 9) {
      formatNumber = onlyNumber.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
    } else if (onlyNumber.length === 10) {
      formatNumber = onlyNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    } else if (onlyNumber.length === 11) {
      formatNumber = onlyNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (onlyNumber.length === 12) {
      formatNumber = onlyNumber.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
    }

    if (spaceFormData.phoneNumber !== formatNumber) {
      changeFormdata({ phoneNumber: formatNumber });
    }
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
      />
    </div>
  );
};

export default PhoneNumber;
