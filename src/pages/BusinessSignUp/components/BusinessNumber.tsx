import { PLACEHOLDER } from '@constants/constants';
import { insertBusinessNumberHyphen } from '@utils/autoHyphen';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface HostFormData {
  businessNumber: string;
  nickname: string;
  email: string;
  password: string;
  passwordCheck: string;
}

interface BusinessNumberProps {
  hostFormData: HostFormData;
  setHostFormData: Dispatch<SetStateAction<HostFormData>>;
}

const BusinessNumber = ({
  hostFormData,
  setHostFormData,
}: BusinessNumberProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatNumber = insertBusinessNumberHyphen(e.target.value);
    setHostFormData({ ...hostFormData, businessNumber: formatNumber });
  };

  return (
    <div className='mt-[18px] flex flex-col'>
      <label
        htmlFor='businessNumber'
        className='mb-[6px] text-[14px] font-normal'
      >
        사업자 등록 번호
      </label>
      <input
        name='businessNumber'
        type='text'
        className='main-input'
        placeholder={PLACEHOLDER.businessNumber}
        onChange={handleChange}
        value={hostFormData.businessNumber}
      />
    </div>
  );
};

export default BusinessNumber;
