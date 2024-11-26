import CommonInput from '@components/CommonInput';
import { ERROR_MESSAGE } from '@constants/constants';
import { insertBusinessNumberHyphen } from '@utils/autoHyphen';
import {
  isValidBusinessNumber,
  isValidEmail,
  isValidNickname,
} from '@utils/validationCheckRegex';
import { ChangeEvent, FormEvent, useState } from 'react';

interface EditData {
  nickname: string;
  email: string;
  businessNumber: string;
}

interface EditErrorMessage {
  nicknameError?: string;
  emailError?: string;
  businessNumberError?: string;
}

const host = {
  nickname: 'HOST',
  email: 'host@gmail.com',
  businessNumber: '000-00-00000',
};

const HostEditForm = () => {
  const [newInformation, setNewInformation] = useState<EditData>({
    nickname: host.nickname,
    email: host.email,
    businessNumber: host.businessNumber,
  });
  const [errorMessage, setErrorMessage] = useState<EditErrorMessage>({});

  const handleGetNewValue = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value: originValue } = e.target;
    let value = originValue;

    // 닉네임이면 글자수 체크
    if (name === 'nickname' && value.length > 10) {
      value = value.substring(0, 10);
    }

    if (name === 'businessNumber') {
      value = insertBusinessNumberHyphen(value) || '';
    }

    setNewInformation({ ...newInformation, [name]: value });
  };

  const isValid = () => {
    const errors: EditErrorMessage = {
      nicknameError: '',
      emailError: '',
      businessNumberError: '',
    };

    if (!isValidNickname(newInformation.nickname)) {
      errors.nicknameError = ERROR_MESSAGE.nickname;
    }
    if (!isValidEmail(newInformation.email)) {
      errors.emailError = ERROR_MESSAGE.email;
    }
    if (!isValidBusinessNumber(newInformation.businessNumber)) {
      errors.businessNumberError = ERROR_MESSAGE.businessNumber;
    }

    return errors;
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage({});

    const errors = isValid();
    const newData = {
      nickname: newInformation.nickname,
      email: newInformation.email,
      businessNumber: newInformation.businessNumber,
    };

    if (
      isValidEmail(newInformation.email) &&
      isValidNickname(newInformation.nickname) &&
      isValidBusinessNumber(newInformation.businessNumber)
    ) {
      console.log(
        `정보 수정 완료: ${newData.nickname}, ${newData.businessNumber}, ${newData.email}`,
      );
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
            name='nickname'
            placeholder='새로운 닉네임을 입력하세요.'
            value={newInformation.nickname}
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
            label='이메일'
            name='email'
            placeholder='새로운 이메일을 입력하세요.'
            value={newInformation.email}
            onChangeFunction={handleGetNewValue}
          />
          {errorMessage.emailError && (
            <p className='text-[12px] font-medium text-[#F83A3A]'>
              {errorMessage.emailError}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-1'>
          <CommonInput
            label='사업자 등록번호'
            name='businessNumber'
            placeholder='000-00-00000'
            value={newInformation.businessNumber}
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
