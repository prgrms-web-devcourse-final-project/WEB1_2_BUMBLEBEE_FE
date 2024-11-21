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

// YYYY-MM-DDTHH:mm:ss 에서 시간(HH:mm) 추출
export const getTimeFunction = (timeString: string) => {
  const hour = new Date(timeString).getHours().toString().padStart(2, '0');
  const minutes = new Date(timeString).getMinutes().toString().padStart(2, '0');
  const formattedTimeString = `${hour}:${minutes}`;

  return formattedTimeString;
};
