// 닉네임 형식 확인 - 공백 없이 2~10자
export const isValidNickname = (nickname: string) => {
  const nicknameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9-]{2,10}$/;
  return nicknameRegex.test(nickname);
};

// 이메일 형식 확인
export const isValidEmail = (email: string) => {
  const emailRegex =
    /^(?=.{1,100}$)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

// 비밀번호 형식 확인
export const isValidPassword = (pwd: string) => {
  const pwdRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%?&])[A-Za-z\d$@$!%?&]{8,20}$/;
  return pwdRegex.test(pwd);
};

// 사용자 전화번호 형식 확인
export const isValidUserPhoneNumber = (number: string) => {
  const numberRegex = /\d{3}-\d{4}-\d{4}$/;
  return numberRegex.test(number);
};

// 사업장 전화번호 형식 확인
export const isValidBusinessPhoneNumber = (number: string) => {
  const numberRegex = /^(0507-\d{4}-\d{4}|\d{2,3}-\d{3,4}-\d{4})$/;
  return numberRegex.test(number);
};

// 사업자 등록 번호 형식 확인
export const isValidBusinessNumber = (businessNumber: string) => {
  const businessNumberRegex = /^[0-9]{3}-[0-9]{2}-[0-9]{5}/;
  return businessNumberRegex.test(businessNumber);
};

// 생년월일 형식 확인 - 1920년 이전, 현재 년도 이후는 입력할 수 없도록 처리
export const isValidBirth = (date: string) => {
  // 기본 생년월일 정규식 통과 못하면 false 반환
  const dateRegex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
  if (!dateRegex.test(date)) {
    return false;
  }

  // 받은 날짜를 년도, 달, 일로 분리한 후 숫자로 변환
  const [year, month, day] = date.split('-').map(Number);
  const currentYear = new Date().getFullYear();

  // 윤년 구하는 함수
  const isLeapYear = (numberYear: number): boolean => {
    return (
      (numberYear % 4 === 0 && numberYear % 100 !== 0) || numberYear % 400 === 0
    );
  };

  // 1920년 이전, 현재 년도 초과하면 false 반환
  if (year < 1920 || year > currentYear) {
    return false;
  }

  // 월별 일수 검증 (윤년 고려)
  const daysInMonth = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  // 입력된 일이 지정된 일보다 크면 false 반환
  if (day > daysInMonth[month - 1]) {
    return false;
  }

  return true;
};

// 주소 형식 확인
export const isValidAddress = (detail: string) => {
  const addressRegex = /^[a-zA-Z가-힣0-9\s(),-]{5,100}$/;
  return addressRegex.test(detail);
};

// 사업장명 형식 확인
export const isValidSpaceName = (name: string) => {
  const nameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9-\s]{1,20}$/;
  return nameRegex.test(name);
};
