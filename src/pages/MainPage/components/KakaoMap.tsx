import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { MdMyLocation } from 'react-icons/md';
import { MoonLoader } from 'react-spinners';
import { GetPositionWorkPlaceData, MapPosition } from '@typings/types';
import { debounce } from 'lodash';
import useGetWorkplaceMutation from '../hooks/useGetWorkplaceMutation';

interface KakaoMapProps {
  data: GetPositionWorkPlaceData[];
}

const KakaoMap = (props: KakaoMapProps) => {
  const [mapPosition, setMapPosition] = useState<MapPosition>({
    topRight: { lat: 0, lng: 0 },
    bottomLeft: { lat: 0, lng: 0 },
  });

  const [position, setPosition] = useState({
    center: {
      lat: 37.496486063,
      lng: 127.028361548,
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
        errMsg: 'geolocation을 사용할 수 없음',
        isLoading: false,
      }));
    }
  }, []);

  const { mutate: getWorkPlace } = useGetWorkplaceMutation();

  const handleBoundsChange = debounce((map) => {
    const bound = map.getBounds();
    setMapPosition({
      topRight: {
        lat: bound.getNorthEast().getLat(),
        lng: bound.getNorthEast().getLng(),
      },
      bottomLeft: {
        lat: bound.getSouthWest().getLat(),
        lng: bound.getSouthWest().getLng(),
      },
    });
    const nowPosition = {
      latitude: position.center.lat,
      longitude: position.center.lng,
    };
    getWorkPlace({ nowPosition, mapPosition });
  }, 500);

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
          onBoundsChanged={(map) => handleBoundsChange(map)}
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

          {/* {data.length > 0 &&
            data.map((item, index) => (
              <MapMarker
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                position={{ lat: item.latitude, lng: item.longitude }}
                image={{
                  src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                  size: {
                    width: 24,
                    height: 35,
                  },
                }}
              />
            ))} */}
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
