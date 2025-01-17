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

// 사업장 전화번호 자동 하이픈
export const insertWorkPlacetPhoneNumberHyphen = (value: string) => {
  // 숫자만 남기기
  const numberText = value.replace(/\D/g, '');
  let formattedValue = numberText;

  if (numberText.startsWith('02')) {
    if (numberText.length > 2 && numberText.length <= 5) {
      formattedValue = `${numberText.slice(0, 2)}-${numberText.slice(2)}`;
    } else if (numberText.length > 5 && numberText.length <= 9) {
      formattedValue = `${numberText.slice(0, 2)}-${numberText.slice(2, 5)}-${numberText.slice(5)}`;
    } else if (numberText.length > 9) {
      formattedValue = `${numberText.slice(0, 2)}-${numberText.slice(2, 6)}-${numberText.slice(6, 10)}`;
    }
  } else if (numberText.startsWith('010')) {
    if (numberText.length > 3 && numberText.length <= 7) {
      formattedValue = `${numberText.slice(0, 3)}-${numberText.slice(3)}`;
    } else if (numberText.length > 7 && numberText.length <= 11) {
      formattedValue = `${numberText.slice(0, 3)}-${numberText.slice(3, 7)}-${numberText.slice(7)}`;
    } else if (numberText.length > 11) {
      formattedValue = `${numberText.slice(0, 3)}-${numberText.slice(3, 7)}-${numberText.slice(7, 11)}`;
    }
  } else if (numberText.startsWith('0507')) {
    if (numberText.length > 4 && numberText.length <= 8) {
      formattedValue = `${numberText.slice(0, 4)}-${numberText.slice(4)}`;
    } else if (numberText.length > 8 && numberText.length <= 12) {
      formattedValue = `${numberText.slice(0, 4)}-${numberText.slice(4, 8)}-${numberText.slice(8)}`;
    } else if (numberText.length > 12) {
      formattedValue = `${numberText.slice(0, 4)}-${numberText.slice(4, 8)}-${numberText.slice(8, 12)}`;
    }
  } else if (/^\d{3}/.test(numberText)) {
    if (numberText.length > 3 && numberText.length <= 6) {
      formattedValue = `${numberText.slice(0, 3)}-${numberText.slice(3)}`;
    } else if (numberText.length > 6 && numberText.length <= 10) {
      formattedValue = `${numberText.slice(0, 3)}-${numberText.slice(3, 6)}-${numberText.slice(6)}`;
    } else if (numberText.length > 10) {
      formattedValue = `${numberText.slice(0, 3)}-${numberText.slice(3, 6)}-${numberText.slice(6, 10)}`;
    }
  }

  return formattedValue;
};
