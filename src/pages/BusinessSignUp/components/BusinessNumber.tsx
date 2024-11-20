import { useEffect } from 'react';

interface HostFormData {
  businessNumber: string;
  nickname: string;
  email: string;
  password: string;
  passwordCheck: string;
}

interface BusinessNumberProps {
  hostFormData: HostFormData;
  setHostFormData: React.Dispatch<React.SetStateAction<HostFormData>>;
}

const BusinessNumber = ({
  hostFormData,
  setHostFormData,
}: BusinessNumberProps) => {
  const { businessNumber } = hostFormData;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 하이픈 포함 12자리까지만 입력 가능하도록 만들기
    if (e.target.name === 'businessNumber' && e.target.value.length > 12) {
      e.target.value = e.target.value.substring(0, 12);
    }
    setHostFormData({
      ...hostFormData,
      businessNumber: e.target.value,
    });
  };

  useEffect(() => {
    if (!businessNumber) return;

    if (businessNumber.length === 10) {
      const formatNumber = businessNumber.replace(
        /^(\d{1,3})(\d{0,2})(\d{0,5}).*$/,
        '$1-$2-$3',
      );
      if (businessNumber !== formatNumber) {
        setHostFormData({
          ...hostFormData,
          businessNumber: formatNumber,
        });
      }
    }

    if (businessNumber.length === 12) {
      const formatNumber = businessNumber
        .replace(/-/g, '')
        .replace(/^(\d{1,3})(\d{0,2})(\d{0,5}).*$/, '$1-$2-$3');
      if (businessNumber !== formatNumber) {
        setHostFormData({
          ...hostFormData,
          businessNumber: formatNumber,
        });
      }
    }
  }, [businessNumber, hostFormData, setHostFormData]);

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
        placeholder='사업자 등록 번호 입력'
        onChange={handleChange}
        value={hostFormData.businessNumber}
      />
    </div>
  );
};

export default BusinessNumber;
