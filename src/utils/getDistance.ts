// eslint-disable-next-line import/prefer-default-export
export const getDistance = (
  myLat: number,
  myLng: number,
  destLat: number,
  destLng: number,
) => {
  if (myLat === destLat && myLng === destLng) {
    return 0;
  }
  const radius = 6371; // 지구 반지름(km)
  const toRadian = Math.PI / 180;
  const deltaLat = Math.abs(myLat - destLat) * toRadian;
  const deltaLng = Math.abs(myLng - destLng) * toRadian;

  const squareSinDeltLat = Math.sin(deltaLat / 2) ** 2;
  const squareSinDeltLng = Math.sin(deltaLng / 2) ** 2;

  const squareRoot = Math.sqrt(
    squareSinDeltLat +
      Math.cos(myLat * toRadian) *
        Math.cos(destLat * toRadian) *
        squareSinDeltLng,
  );

  const distance = 2 * radius * Math.asin(squareRoot);

  return Number(distance.toFixed(1));
};
