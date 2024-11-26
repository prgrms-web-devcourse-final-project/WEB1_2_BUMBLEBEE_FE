// 사업자 등록번호 자동 하이픈
export const insertBusinessNumberHyphen = (value: string) => {
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

// 생년월일 자동 하이픈
export const insertBirthHyphen = (value: string) => {
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

// 전화번호 자동 하이픈
export const insertPhoneNumberHyphen = (value: string) => {
  // 숫자만 남기기
  const numberText = value.replace(/\D/g, '');
  let formattedValue = numberText.slice(0, 11);

  // 3번째 자리와 7번째 자리 뒤에 하이픈 추가
  if (numberText.length > 3) {
    formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3)}`;
  }
  if (numberText.length > 7) {
    formattedValue = `${formattedValue.slice(0, 8)}-${formattedValue.slice(8)}`;
  }

  return formattedValue;
};
