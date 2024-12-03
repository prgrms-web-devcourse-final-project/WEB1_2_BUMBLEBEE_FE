import CommonInput from '@components/CommonInput';
import { ERROR_MESSAGE, PLACEHOLDER } from '@constants/constants';
import { Member } from '@typings/types';
import { insertBirthHyphen, insertPhoneNumberHyphen } from '@utils/autoHyphen';
import {
  isValidBirth,
  isValidEmail,
  isValidNickname,
  isValidUserPhoneNumber,
} from '@utils/validationCheckRegex';
import { ChangeEvent, FormEvent, useState } from 'react';
import usePutEditUserData from '../hooks/usePutEditUserData';

interface EditErrorMessage {
  nicknameError?: string;
  emailError?: string;
  birthError?: string;
  phoneNumberError?: string;
  sexError?: string;
}

const UserEditForm = ({ user }: { user: Member }) => {
  const [newInformation, setNewInformation] = useState<Member>({
    nickName: user.nickName,
    email: user.email,
    birthDay: user.birthDay,
    sex: user.sex,
    phoneNumber: user.phoneNumber,
  });
  const [errorMessage, setErrorMessage] = useState<EditErrorMessage>({});
  const { mutate: editUser } = usePutEditUserData();

  const handleGetNewValue = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value: originValue } = e.target;
    let value = originValue;

    if (name === 'birthDay') {
      value = insertBirthHyphen(value) || '';
    }
    // 닉네임이면 글자수 체크
    if (name === 'nickName' && value.length > 10) {
      value = value.substring(0, 10);
    }
    if (name === 'phoneNumber') {
      value = insertPhoneNumberHyphen(value) || '';
    }

    setNewInformation({ ...newInformation, [name]: value });
  };

  const isValid = () => {
    const errors: EditErrorMessage = {
      nicknameError: '',
      emailError: '',
      birthError: '',
      phoneNumberError: '',
      sexError: '',
    };

    if (!isValidNickname(newInformation.nickName)) {
      errors.nicknameError = ERROR_MESSAGE.nickname;
    }
    if (!isValidEmail(newInformation.email)) {
      errors.emailError = ERROR_MESSAGE.email;
    }
    if (!isValidBirth(newInformation.birthDay)) {
      errors.birthError = ERROR_MESSAGE.birth;
    }
    if (!isValidUserPhoneNumber(newInformation.phoneNumber)) {
      errors.phoneNumberError = ERROR_MESSAGE.phonNumber;
    }
    if (newInformation.sex === '') {
      errors.sexError = ERROR_MESSAGE.gender;
    }

    return errors;
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage({});

    const errors = isValid();
    const newData = {
      nickName: newInformation.nickName,
      email: newInformation.email,
      birthDay: newInformation.birthDay,
      sex: newInformation.sex,
      phoneNumber: newInformation.phoneNumber,
    };

    if (
      isValidEmail(newInformation.email) &&
      isValidNickname(newInformation.nickName) &&
      isValidBirth(newInformation.birthDay) &&
      isValidUserPhoneNumber(newInformation.phoneNumber)
    ) {
      editUser(newData);
      console.log(`정보 수정 완료: ${newInformation}`);
    } else {
      setErrorMessage(errors);
    }
  };

  return (
    <form
      className='mx-auto flex w-custom flex-col justify-center gap-10'
      onSubmit={onSubmitHandler}
    >
      <div className='flex flex-col gap-3'>
        <p className='mr-[34px] text-[14px] font-normal'>성별</p>
        <div className='flex'>
          <div className='flex items-center'>
            <input
              type='radio'
              name='sex'
              value='MALE'
              className='mr-[6px]'
              onChange={handleGetNewValue}
              checked={newInformation.sex === 'MALE'}
            />
            <label
              htmlFor='MALE'
              className='mr-[20px] text-[14px]'
            >
              남자
            </label>
          </div>
          <div className='flex items-center'>
            <input
              type='radio'
              name='sex'
              value='FEMALE'
              className='w-[14px mr-[6px] h-[14px]'
              onChange={handleGetNewValue}
              checked={newInformation.sex === 'FEMALE'}
            />
            <label
              htmlFor='FEMALE'
              className='text-[14px]'
            >
              여자
            </label>
          </div>
        </div>
        {errorMessage.sexError && (
          <p className='text-[12px] font-medium text-[#F83A3A]'>
            {errorMessage.sexError}
          </p>
        )}
      </div>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-1'>
          <CommonInput
            label='닉네임'
            name='nickName'
            placeholder={PLACEHOLDER.nickname}
            value={newInformation.nickName}
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
            placeholder={PLACEHOLDER.email}
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
            label='전화번호'
            name='phoneNumber'
            placeholder={PLACEHOLDER.phonNumber}
            value={newInformation.phoneNumber}
            onChangeFunction={handleGetNewValue}
          />
          {errorMessage.phoneNumberError && (
            <p className='text-[12px] font-medium text-[#F83A3A]'>
              {errorMessage.phoneNumberError}
            </p>
          )}
        </div>
        <div className='flex flex-col gap-1'>
          <CommonInput
            label='생년월일'
            name='birthDay'
            placeholder='YYYY-MM-DD'
            value={newInformation.birthDay}
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
