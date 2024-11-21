// YYYY-MM-DDTHH:mm:ss 에서 YYYY-MM-DD 추출하여 YYYY.MM.DD로 변환하는 함수
const getDateFunction = (timeString: string) => {
  const year = new Date(timeString).getFullYear();
  const month = (new Date(timeString).getMonth() + 1)
    .toString()
    .padStart(2, '0');
  const day = new Date(timeString).getDate().toString().padStart(2, '0');
  const dateString = `${year}.${month}.${day}`;

  return dateString;
};

export default getDateFunction;
