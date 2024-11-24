import CommonInput from '@components/CommonInput';
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

const UserEditContainer = () => {
  const [newInformation, setNewInformation] = useState<EditData>({
    nickname: user.nickname,
    email: user.email,
    birth: user.birth,
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

  // 생년월일 형식 확인 - 1920년 이전, 현재 년도 이후는 입력할 수 없도록 처리
  const isValidBirth = (date: string) => {
    const currentYear = new Date().getFullYear();
    const dateRegex = new RegExp(
      `^(19[2-9][0-9]|20[0-${Math.floor((currentYear - 2000) / 10)}][0-9])-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$`,
    );
    return dateRegex.test(date);
  };

  // 생년월일 자동하이픈
  const insertBirthHyphen = (value: string) => {
    // 숫자만 남기기
    const dateText = value.replace(/\D/g, '');
    let formattedValue = dateText.slice(0, 8);

    // 4번째 자리와 6번째 자리 뒤에 하이픈 추가
    if (dateText.length > 4) {
      formattedValue = `${formattedValue.slice(0, 4)}-${formattedValue.slice(4)}`;
    }
    if (dateText.length > 6) {
      formattedValue = `${formattedValue.slice(0, 7)}-${formattedValue.slice(7)}`;
    }

    return formattedValue;
  };

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
      errors.nicknameError = '닉네임은 공백없이 2~10자 이내로 입력해주세요.';
    }
    if (!isValidEmail(newInformation.email)) {
      errors.emailError = '이메일 형식을 확인해주세요.';
    }
    if (!isValidBirth(newInformation.birth)) {
      errors.birthError = '생년월일을 다시 확인해주세요';
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
    <div className='mt-14 flex w-[375px] flex-col justify-center gap-[135px]'>
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
          className='btn-primary border border-primary bg-white text-primary active:bg-primary active:text-white'
        >
          수정하기
        </button>
      </form>
    </div>
  );
};

export default UserEditContainer;
