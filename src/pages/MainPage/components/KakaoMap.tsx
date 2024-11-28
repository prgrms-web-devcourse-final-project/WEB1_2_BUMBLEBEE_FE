import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { MdMyLocation } from 'react-icons/md';
import { getDistance } from '@utils/getDistance';
import { MoonLoader } from 'react-spinners';
import { WorkPlaceData } from '@typings/types';

interface KakaoMapProps {
  data: WorkPlaceData[];
  onDistanceChange: (value: { id: string; distance: number }[]) => void;
}

const KakaoMap = (props: KakaoMapProps) => {
  const { data, onDistanceChange } = props;
  const { kakao } = window;
  const [position, setPosition] = useState({
    center: {
      lat: 0,
      lng: 0,
    },
    errMsg: '',
    isLoading: true,
  });

  const [center, setCenter] = useState(position.center);

  // 사용자 위치 가져오기
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

  // 거리 계산 및 업데이트
  const [studyRoomList, setStudyRoomList] = useState<kakao.maps.LatLng[]>([]);

  useEffect(() => {
    const newStudyRoomList: kakao.maps.LatLng[] = [];
    const distanceData: { id: string; distance: number }[] = [];

    const geocoder = new kakao.maps.services.Geocoder();
    data.forEach((item) =>
      geocoder.addressSearch(item.workplaceAddress, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(
            parseFloat(result[0].y),
            parseFloat(result[0].x),
          );

          const distance = getDistance(
            position.center.lat,
            position.center.lng,
            parseFloat(result[0].y),
            parseFloat(result[0].x),
          );
          newStudyRoomList.push(coords);
          distanceData.push({ id: item.workplaceName, distance });
          console.log(
            `${item.workplaceName} 간의 거리는 ${distance}km 입니다.`,
          );

          if (distanceData.length === data.length) {
            setStudyRoomList(newStudyRoomList);
            onDistanceChange(distanceData);
          }
        }
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onDistanceChange, position]);

  return (
    <div className='relative h-[298px] w-[375px]'>
      {position.isLoading ? (
        <div className='flex h-full w-full items-center justify-center'>
          <MoonLoader
            color='#50BEAD'
            size={30}
            speedMultiplier={0.7}
          />
        </div>
      ) : (
        <Map
          center={center}
          className='h-full w-full'
          level={3}
          onDragEnd={(map) => {
            const latlng = map.getCenter();
            setCenter({ lat: latlng.getLat(), lng: latlng.getLng() });
          }}
        >
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

          {studyRoomList.length > 0 &&
            studyRoomList.map((item, index) => (
              <MapMarker
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                position={{ lat: item.getLat(), lng: item.getLng() }}
                image={{
                  src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                  size: {
                    width: 24,
                    height: 35,
                  },
                }}
              />
            ))}
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
      )}
    </div>
  );
};

export default KakaoMap;
