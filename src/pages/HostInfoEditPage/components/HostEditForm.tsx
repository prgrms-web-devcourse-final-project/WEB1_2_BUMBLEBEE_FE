import CommonInput from '@components/CommonInput';
import { ERROR_MESSAGE, PLACEHOLDER } from '@constants/constants';
import { Business } from '@typings/types';
import { insertBusinessNumberHyphen } from '@utils/autoHyphen';
import {
  isValidBusinessNumber,
  isValidNickname,
} from '@utils/validationCheckRegex';
import { ChangeEvent, FormEvent, useState } from 'react';
import usePutEditBusinessData from '../hooks/usePutEditBusinessData';

interface EditErrorMessage {
  nicknameError?: string;
  businessNumberError?: string;
}

const HostEditForm = ({ business }: { business: Business }) => {
  const [newInformation, setNewInformation] = useState<Business>({
    businessName: business.businessName,
    businessEmail: business.businessEmail,
    businessNum: business.businessNum,
  });
  const [errorMessage, setErrorMessage] = useState<EditErrorMessage>({});
  const { mutate: editBusiness } = usePutEditBusinessData();

  const handleGetNewValue = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value: originValue } = e.target;
    let value = originValue;

    // 닉네임이면 글자수 체크
    if (name === 'businessName' && value.length > 10) {
      value = value.substring(0, 10);
    }
    if (name === 'businessNum') {
      value = insertBusinessNumberHyphen(value) || '';
    }

    setNewInformation({ ...newInformation, [name]: value });
  };

  const isValid = () => {
    const errors: EditErrorMessage = {
      nicknameError: '',
      businessNumberError: '',
    };

    if (!isValidNickname(newInformation.businessName)) {
      errors.nicknameError = ERROR_MESSAGE.nickname;
    }
    if (!isValidBusinessNumber(newInformation.businessNum)) {
      errors.businessNumberError = ERROR_MESSAGE.businessNumber;
    }

    return errors;
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage({});

    const errors = isValid();
    const newData = {
      businessName: newInformation.businessName,
      businessEmail: business.businessEmail,
      businessNum: newInformation.businessNum,
    };

    if (
      isValidNickname(newInformation.businessName) &&
      isValidBusinessNumber(newInformation.businessNum)
    ) {
      editBusiness(newData);
    } else {
      setErrorMessage(errors);
    }
  };

  return (
    <form
      className='mx-auto flex w-custom flex-col justify-center gap-10'
      onSubmit={onSubmitHandler}
    >
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-1'>
          <CommonInput
            label='닉네임'
            name='businessName'
            placeholder={PLACEHOLDER.nickname}
            value={newInformation.businessName}
            onChangeFunction={handleGetNewValue}
            maxLength={10}
          />
          {errorMessage.nicknameError && (
            <p className='text-[12px] font-medium text-[#F83A3A]'>
              {errorMessage.nicknameError}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-1'>
          <CommonInput
            label='사업자 등록번호'
            name='businessNum'
            placeholder={PLACEHOLDER.businessNumber}
            value={newInformation.businessNum}
            onChangeFunction={handleGetNewValue}
          />
          {errorMessage.businessNumberError && (
            <p className='text-[12px] font-medium text-[#F83A3A]'>
              {errorMessage.businessNumberError}
            </p>
          )}
        </div>
      </div>
      <button
        type='submit'
        className='btn-primary'
      >
        수정하기
      </button>
    </form>
  );
};

export default HostEditForm;
