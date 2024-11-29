// YYYY-MM-DDTHH:mm:ss 에서 YYYY-MM-DD 추출하여 YYYY.MM.DD로 변환하는 함수
export const getDateFunction = (timeString: string) => {
  const year = new Date(timeString).getFullYear();
  const month = (new Date(timeString).getMonth() + 1)
    .toString()
    .padStart(2, '0');
  const day = new Date(timeString).getDate().toString().padStart(2, '0');
  const dateString = `${year}.${month}.${day}`;

  return dateString;
};

// Date 타입의 날짜를 MM월 DD일(요일)로 변환하는 함수
export const getFormattedDateFunction = (date: Date) => {
  const formattedDate = date.toLocaleDateString('ko-KR', {
    month: 'long', // 월
    day: 'numeric', // 일
    weekday: 'short', // (요일)
  });

  return formattedDate.replace('일 (', '일(');
};

// date타입에서 YYYY-MM-DD 추출해 YYYY.MM.DD로 변환
export const getStringFromDate = (value: Date) => {
  const year = value.getFullYear();
  const month = (value.getMonth() + 1).toString().padStart(2, '0');
  const day = value.getDate().toString().padStart(2, '0');
  const dateString = `${year}.${month}.${day}`;

  return dateString;
};

// YYYY-MM-DDTHH:mm:ss 에서 시간(HH:mm) 추출
export const getTimeFunction = (timeString: string) => {
  const hour = new Date(timeString).getHours().toString().padStart(2, '0');
  const minutes = new Date(timeString).getMinutes().toString().padStart(2, '0');
  const formattedTimeString = `${hour}:${minutes}`;

  return formattedTimeString;
};

// date타입에서 시간(HH:mm) 추출
export const getStringFromDateTime = (value: Date) => {
  const hour = value.getHours().toString().padStart(2, '0');
  const minutes = value.getMinutes().toString().padStart(2, '0');
  const formattedTimeString = `${hour}:${minutes}`;

  return formattedTimeString;
};

// 시간 차이 구하는 함수
export const getTimeDifference = (timeString: string) => {
  const milliSeconds = +new Date() - +new Date(timeString);
  let message = '';

  const seconds = milliSeconds / 1000;
  if (seconds < 60) {
    message = `방금 전`;
  }
  const minutes = seconds / 60;
  if (minutes < 60) {
    message = `${Math.floor(minutes)}분 전`;
  }
  const hours = minutes / 60;
  if (hours < 24) {
    message = `${Math.floor(hours)}시간 전`;
  }
  const days = hours / 24;
  if (days < 7) {
    message = `${Math.floor(days)}일 전`;
  }

  return message;
};

export const getWithinSevenDays = (timeString: string) => {
  const milliSeconds = +new Date() - +new Date(timeString);
  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
  let message = '';

  if (milliSeconds < SEVEN_DAYS) {
    message = '7일 이내';
  }

  return message;
};
