import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { SpaceForm } from './SelectClosedTime';

interface AddressProps {
  spaceForm: SpaceForm;
  setSpaceForm: Dispatch<SetStateAction<SpaceForm>>;
}

const Address = ({ spaceForm, setSpaceForm }: AddressProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [addressChange, setAddressChange] = useState('');

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const completeHandler = (data: { address: SetStateAction<string> }) => {
    setAddressChange(data.address);
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
    const fullAddress = `${addressChange} ${detailAddress}`;
    setSpaceForm({
      ...spaceForm,
      address: fullAddress,
    });
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
            value={addressChange}
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
