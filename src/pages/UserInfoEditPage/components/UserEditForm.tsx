import CommonInput from '@components/CommonInput';
import { ERROR_MESSAGE } from '@constants/constants';
import { insertBirthHyphen } from '@utils/autoHyphen';
import {
  isValidBirth,
  isValidEmail,
  isValidNickname,
} from '@utils/validationCheckRegex';
import { ChangeEvent, FormEvent, useState } from 'react';

interface EditData {
  nickname: string;
  email: string;
  birth: string;
}

interface EditErrorMessage {
  nicknameError?: string;
  emailError?: string;
  birthError?: string;
}

const user = {
  nickname: 'HYUN',
  email: 'hyun@gmail.com',
  phone: '010-1111-2222',
  birth: '2002-12-22',
};

const UserEditForm = () => {
  const [newInformation, setNewInformation] = useState<EditData>({
    nickname: user.nickname,
    email: user.email,
    birth: user.birth,
  });
  const [errorMessage, setErrorMessage] = useState<EditErrorMessage>({});

  const handleGetNewValue = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value: originValue } = e.target;
    let value = originValue;

    if (name === 'birth') {
      value = insertBirthHyphen(value) || '';
    }

    // 닉네임이면 글자수 체크
    if (name === 'nickname' && value.length > 10) {
      value = value.substring(0, 10);
    }

    setNewInformation({ ...newInformation, [name]: value });
  };

  const isValid = () => {
    const errors: EditErrorMessage = {
      nicknameError: '',
      emailError: '',
      birthError: '',
    };

    if (!isValidNickname(newInformation.nickname)) {
      errors.nicknameError = ERROR_MESSAGE.nicknameError;
    }
    if (!isValidEmail(newInformation.email)) {
      errors.emailError = ERROR_MESSAGE.emailError;
    }
    if (!isValidBirth(newInformation.birth)) {
      errors.birthError = ERROR_MESSAGE.birthError;
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
      birth: newInformation.birth,
    };

    if (
      isValidEmail(newInformation.email) &&
      isValidNickname(newInformation.nickname) &&
      isValidBirth(newInformation.birth)
    ) {
      console.log(
        `정보 수정 완료: ${newData.nickname}, ${newData.birth}, ${newData.email}`,
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
            label='생년월일'
            name='birth'
            placeholder='YYYY-MM-DD'
            value={newInformation.birth}
            onChangeFunction={handleGetNewValue}
          />
          {errorMessage.birthError && (
            <p className='text-[12px] font-medium text-[#F83A3A]'>
              {errorMessage.birthError}
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

export default UserEditForm;
