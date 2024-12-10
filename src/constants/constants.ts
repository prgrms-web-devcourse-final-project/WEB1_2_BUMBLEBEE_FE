export const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;

export const WS_URL = `${BASE_URL}/ws`;

export const ERROR_MESSAGE = {
  nickname: '닉네임은 공백없이 2~10자 이내로 입력해주세요.',
  email: '이메일 형식을 확인해주세요.',
  password: '대소문자, 숫자, 특수문자($,@,!,%,?,&)를 모두 포함해야 합니다.',
  businessNumber: '사업자 등록 번호 형식을 확인해주세요.',
  checkPassword: '비밀번호가 일치하지 않습니다.',
  gender: '성별을 선택해주세요.',
  phonNumber: '전화번호 형식을 확인해주세요.',
  birth: '생년월일을 다시 확인해주세요.',
  name: '성함을 올바르게 입력해주세요.',
  check: '필수 항목에 동의해주세요.',
  payMethod: '결제 수단을 선택해주세요.',
  people: '인원을 선택해주세요.',
  time: '시간을 선택해주세요.',
  place: '장소를 선택해주세요.',
  date: '날짜를 선택해주세요.',
  spaceName: '사업장명은 특수문자 없이 20자 이내로 입력해주세요.',
  description: '사업장 소개 문구를 입력해주세요.',
  address: '주소는 5~100자 이내이며, 가능한 특수문자는 (,-())입니다.',
  image: '이미지를 등록해주세요.',
  room: '룸은 적어도 하나 이상 등록해야 합니다.',
  roomName: '룸 이름을 입력해주세요.',
  roomDescription: '룸 소개를 입력해주세요.',
  priceAndPeople: '가격 또는 인원수를 필수로 입력해주세요.',
};

export const PLACEHOLDER = {
  businessNumber: '사업자 등록 번호 입력',
  nickname: '닉네임 입력 (2~10자 이내)',
  email: '이메일 입력',
  password: '비밀번호 입력 (8~20자 이내)',
  checkPassword: '비밀번호 확인',
  birth: 'YYYY-MM-DD',
  phonNumber: '전화번호 입력',
  name: '이름 입력',
};
