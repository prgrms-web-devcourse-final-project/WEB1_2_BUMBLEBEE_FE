import { ChangeEvent, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

export interface AddressProps {
  onUpdateAddress: (address: { basic: string; detail: string }) => void;
  address: { basic: string; detail: string };
}

const Address = ({ onUpdateAddress, address }: AddressProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const completeHandler = (data: { address: string }) => {
    onUpdateAddress({ ...address, basic: data.address });
  };

  const closeHandler = (state: string) => {
    if (state === 'FORCE_CLOSE') {
      setIsOpen(false);
    } else if (state === 'COMPLETE_CLOSE') {
      setIsOpen(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const detailAddress = e.target.value;
    onUpdateAddress({ ...address, detail: detailAddress });
  };

  return (
    <div className='mt-[40px]'>
      <label
        htmlFor='address'
        className='mb-[6px] text-[14px] font-normal'
      >
        주소 등록
      </label>
      <div className='mt-[6px]'>
        <div className='flex'>
          <input
            name='address'
            type='text'
            className='mb-[10px] mr-[12px] h-[38px] w-[234px] border-b border-solid border-subfont px-[6px] py-[5.5px] text-[14px] focus:outline-none'
            placeholder='주소를 등록해주세요.'
            defaultValue={address.basic}
            readOnly
          />
          <button
            type='button'
            onClick={handleClick}
            className='h-[38px] w-[84px] rounded-[8px] bg-primary px-[11px] py-[10px] text-[12px] font-medium text-white'
          >
            주소 등록
          </button>
        </div>
        <input
          name='addressDetail'
          type='text'
          className='h-[38px] w-custom border-b border-solid border-subfont px-[6px] py-[5.5px] text-[14px] focus:border-focusColor focus:outline-none'
          placeholder='상세 주소를 입력해주세요.'
          onChange={handleChange}
          value={address.detail}
        />
      </div>
      {isOpen && (
        <div className='my-[12px]'>
          <DaumPostcode
            onComplete={completeHandler}
            onClose={closeHandler}
          />
        </div>
      )}
    </div>
  );
};

export default Address;
