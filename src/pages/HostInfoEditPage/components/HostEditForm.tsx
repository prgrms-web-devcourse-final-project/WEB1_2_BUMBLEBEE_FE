import CommonInput from '@components/CommonInput';
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

  // 닉네임 형식 확인 - 공백 없이 2~10자
  const isValidNickname = (nickname: string) => {
    const nicknameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9-]{2,10}$/;
    return nicknameRegex.test(nickname);
  };

  // 이메일 형식 확인
  const isValidEmail = (email: string) => {
    const emailRegex =
      /^(?=.{1,100}$)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  // 사업자 등록 번호 형식 확인
  const isValidBusinessNumber = (businessNumber: string) => {
    const businessNumberRegex = /^[0-9]{3}-[0-9]{2}-[0-9]{5}/;
    return businessNumberRegex.test(businessNumber);
  };

  // 사업자 등록번호 자동 하이픈
  const insertBusinessNumberHyphen = (value: string) => {
    const numberText = value.replace(/[^0-9]/g, '');
    let formattedValue = numberText.slice(0, 10);

    if (numberText.length > 3) {
      formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3)}`;
    }
    if (numberText.length > 5) {
      formattedValue = `${formattedValue.slice(0, 6)}-${formattedValue.slice(6)}`;
    }

    return formattedValue;
  };

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
      errors.nicknameError = '닉네임은 공백없이 2~10자 이내로 입력해주세요.';
    }
    if (!isValidEmail(newInformation.email)) {
      errors.emailError = '이메일 형식을 확인해주세요.';
    }
    if (!isValidBusinessNumber(newInformation.businessNumber)) {
      errors.businessNumberError = '사업자 등록번호 형식을 확인해주세요.';
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
