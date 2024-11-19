import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KakaoMap = () => {
  return (
    <Map
      center={{ lat: 33.5563, lng: 126.79581 }} // 지도의 중심 좌표
      style={{ width: '375px', height: '298px' }} // 지도 크기
      level={3} // 지도 확대 레벨
    >
      <MapMarker position={{ lat: 33.55635, lng: 126.795841 }} />
    </Map>
  );
};

export default KakaoMap;
