import { Dispatch, useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { MdMyLocation } from 'react-icons/md';
import { MoonLoader } from 'react-spinners';
import { debounce } from 'lodash';
import { GetPositionWorkPlaceData, MapPosition } from '@typings/types';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { useGetWorkplaceMutation } from '../hooks/useGetWorkplaceData';
import type { Position } from '..';

interface KakaoMapProps {
  position: Position;
  onSetPosition: Dispatch<React.SetStateAction<Position>>;
  mapPosition: MapPosition;
  onSetMapPosition: Dispatch<React.SetStateAction<MapPosition>>;
  data: GetPositionWorkPlaceData[] | undefined;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<GetPositionWorkPlaceData[], Error>>;
}

const KakaoMap = (props: KakaoMapProps) => {
  const {
    position,
    onSetPosition,
    mapPosition,
    onSetMapPosition,
    data,
    refetch,
  } = props;
  const [center, setCenter] = useState(position.center);
  const mapRef = useRef<kakao.maps.Map>(null);

  const { mutate: getWorkPlace } = useGetWorkplaceMutation();

  const handleBoundsChange = debounce((map) => {
    const bound = map.getBounds();
    onSetMapPosition({
      topRight: {
        lat: bound.getNorthEast().getLat(),
        lng: bound.getNorthEast().getLng(),
      },
      bottomLeft: {
        lat: bound.getSouthWest().getLat(),
        lng: bound.getSouthWest().getLng(),
      },
    });
    const newNowPosition = {
      latitude: position.center.lat,
      longitude: position.center.lng,
    };

    getWorkPlace({ nowPosition: newNowPosition, mapPosition });
  }, 1000);

  // 사용자 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          onSetPosition((prevPosition: Position) => ({
            ...prevPosition,
            center: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            },
            isLoading: false,
          }));
          setCenter({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          onSetPosition((prevPosition: Position) => ({
            ...prevPosition,
            errMsg: err.message,
            isLoading: false,
          }));
        },
      );
    } else {
      onSetPosition((prevPosition: Position) => ({
        ...prevPosition,
        errMsg: 'geolocation을 사용할 수 없음',
        isLoading: false,
      }));
    }
  }, [onSetPosition]);

  const handleMapCreate = (map: kakao.maps.Map) => {
    onSetMapPosition((prevPosition) => {
      const bounds = map.getBounds();
      const newPosition = {
        topRight: {
          lat: bounds.getNorthEast().getLat(),
          lng: bounds.getNorthEast().getLng(),
        },
        bottomLeft: {
          lat: bounds.getSouthWest().getLat(),
          lng: bounds.getSouthWest().getLng(),
        },
      };
      if (JSON.stringify(prevPosition) === JSON.stringify(newPosition)) {
        return prevPosition;
      }
      return newPosition;
    });
    refetch();
  };

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
          ref={mapRef}
          onCreate={(map) => handleMapCreate(map)}
          onDragEnd={(map) => {
            const latlng = map.getCenter();
            setCenter({ lat: latlng.getLat(), lng: latlng.getLng() });
          }}
          onBoundsChanged={(map) => handleBoundsChange(map)}
        >
          {data &&
            data.length > 0 &&
            data.map((item) => (
              <MapMarker
                key={item.positionLat}
                position={{ lat: item.positionLat, lng: item.positionLon }}
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
