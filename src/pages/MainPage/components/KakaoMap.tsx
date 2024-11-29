import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { MdMyLocation } from 'react-icons/md';

const KakaoMap = () => {
  const [position, setPosition] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: '',
    isLoading: true,
  });

  const [center, setCenter] = useState(position.center);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition((prev) => ({
            ...prev,
            center: {
              lat: pos.coords.latitude, // 위도
              lng: pos.coords.longitude, // 경도
            },
            isLoading: false,
          }));
          setCenter({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          setPosition((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        },
      );
    } else {
      setPosition((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  }, []);

  return (
    <div className='relative h-[298px] w-[375px]'>
      <Map
        center={center}
        className='h-full w-full'
        level={3}
        onDragEnd={(map) => {
          const latlng = map.getCenter();
          setCenter({ lat: latlng.getLat(), lng: latlng.getLng() });
        }}
      >
        {!position.isLoading && (
          <MapMarker
            position={position.center}
            image={{
              src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
              size: {
                width: 24,
                height: 35,
              },
            }}
          />
        )}

        <div className='absolute right-0 top-0 z-10 m-4'>
          <button
            type='button'
            className='flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full bg-white shadow-custom'
            onClick={() => setCenter(position.center)}
          >
            <MdMyLocation />
          </button>
        </div>
      </Map>
    </div>
  );
};

export default KakaoMap;
