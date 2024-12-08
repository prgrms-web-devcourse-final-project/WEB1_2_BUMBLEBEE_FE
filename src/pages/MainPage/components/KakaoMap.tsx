import { useCallback, useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { MdMyLocation } from 'react-icons/md';
import { GetPositionWorkPlaceData } from '@typings/types';
import usePositionStore from '@store/positionStore';
import PlaceModal from './PlaceModal';

interface KakaoMapProps {
  data: GetPositionWorkPlaceData[] | undefined;
  activeTab: string;
  recommendData: GetPositionWorkPlaceData[];
}

const KakaoMap = (props: KakaoMapProps) => {
  const { data, activeTab, recommendData } = props;

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

  // 지도 변경 시 데이터 새로 가져오기
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

  // 지도에 표시할 데이터
  const markerData = activeTab === '주변 스터디룸' ? data : recommendData;

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
      >
        {markerData &&
          markerData.length > 0 &&
          markerData.map((item) => (
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
