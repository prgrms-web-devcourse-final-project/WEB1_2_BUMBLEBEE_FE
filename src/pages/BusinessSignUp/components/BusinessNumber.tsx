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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 하이픈 포함 12자리까지만 입력 가능하도록 만들기
    if (e.target.value.length > 12) {
      e.target.value = e.target.value.substring(0, 12);
    }
    const basicNumber = e.target.value;
    // 숫자만 남기기
    const onlyNumber = e.target.value.replace(/[^0-9]/g, '');
    let formatNumber = basicNumber;

    if (onlyNumber.length === 10) {
      formatNumber = onlyNumber.replace(
        /^(\d{1,3})(\d{0,2})(\d{0,5}).*$/,
        '$1-$2-$3',
      );
    }

    if (hostFormData.businessNumber !== formatNumber) {
      setHostFormData({ ...hostFormData, businessNumber: formatNumber });
    }
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
        placeholder='사업자 등록 번호 입력'
        onChange={handleChange}
        value={hostFormData.businessNumber}
      />
    </div>
  );
};

export default BusinessNumber;
