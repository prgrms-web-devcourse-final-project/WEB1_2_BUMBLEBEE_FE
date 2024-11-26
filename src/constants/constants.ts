export const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;

export const ERROR_MESSAGE = {
  nicknameError: '닉네임은 공백없이 2~10자 이내로 입력해주세요.',
  emailError: '이메일 형식을 확인해주세요.',
  passwordError:
    '대소문자, 숫자, 특수문자($,@,!,%,?,&)를 모두 포함해야 합니다.',
  businessNumberError: '사업자 등록 번호 형식을 확인해주세요.',
  checkPasswordError: '비밀번호가 일치하지 않습니다.',
  genderError: '성별을 선택해주세요.',
  phonNumberError: '전화번호 형식을 확인해주세요.',
  birthError: '생년월일을 다시 확인해주세요.',
};
