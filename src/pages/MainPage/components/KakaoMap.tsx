import { useCallback, useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { MdMyLocation } from 'react-icons/md';
import { debounce } from 'lodash';
import { GetPositionWorkPlaceData } from '@typings/types';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import usePositionStore from '@store/positionStore';
import { useGetWorkplaceMutation } from '../hooks/useGetWorkplaceData';
import PlaceModal from './PlaceModal';

interface KakaoMapProps {
  data: GetPositionWorkPlaceData[] | undefined;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<GetPositionWorkPlaceData[], Error>>;
}

const KakaoMap = (props: KakaoMapProps) => {
  const { data, refetch } = props;

  const {
    mapPosition,
    nowPosition,
    centerPosition,
    setMapPosition,
    setNowPosition,
    setCenterPosition,
    initializeCenterPosition,
  } = usePositionStore();

  const mapRef = useRef<kakao.maps.Map>(null);

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

    const position = {
      latitude: nowPosition.center.lat,
      longitude: nowPosition.center.lng,
    };

    getWorkPlace({ nowPosition: position, mapPosition });
  }, 1000);

  // 사용자 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setNowPosition({
          center: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
          isLoading: false,
        });
        initializeCenterPosition();
      });
    }
  }, [initializeCenterPosition, setNowPosition]);

  const handleMapCreate = (map: kakao.maps.Map) => {
    const bounds = map.getBounds();
    const newPosition = {
      topRight: {
        lat: bounds.getNorthEast().getLat() + 0.1,
        lng: bounds.getNorthEast().getLng() + 0.1,
      },
      bottomLeft: {
        lat: bounds.getSouthWest().getLat() - 0.1,
        lng: bounds.getSouthWest().getLng() - 0.1,
      },
    };
    if (JSON.stringify(mapPosition) === JSON.stringify(newPosition)) {
      return;
    }

    setMapPosition(newPosition);
    refetch();
  };

  // 모달
  const [selectedPlace, setSelectedPlace] =
    useState<GetPositionWorkPlaceData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleMarkerClick = (item: GetPositionWorkPlaceData) => {
    setSelectedPlace(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setSelectedPlace(null);
    setIsModalOpen(false);
  }, []);

  return (
    <div className='relative h-[298px] w-[375px]'>
      <Map
        center={centerPosition}
        className='h-full w-full'
        level={5}
        ref={mapRef}
        onCreate={(map) => handleMapCreate(map)}
        onDragEnd={(map) => {
          const latlng = map.getCenter();
          setCenterPosition({ lat: latlng.getLat(), lng: latlng.getLng() });
        }}
        onBoundsChanged={(map) => handleBoundsChange(map)}
      >
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <MapMarker
              onClick={() => handleMarkerClick(item)}
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
            onClick={() => setCenterPosition(nowPosition.center)}
          >
            <MdMyLocation />
          </button>
        </div>
      </Map>
      {isModalOpen && selectedPlace && (
        <PlaceModal
          place={selectedPlace}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default KakaoMap;
