import { BsTelephoneFill } from 'react-icons/bs';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const DetailComponent = () => {
  const center = { lat: 37.5525909469274, lng: 126.826197321696 };

  return (
    <div className='w-custom'>
      <div className='flex items-center'>
        <BsTelephoneFill
          size='16px'
          color='#c3c3c3'
        />
        <span className='ml-[10px] text-[16px]'>0507-1234-5678</span>
      </div>
      <div className='mb-[16px] mt-[16px] flex'>
        <FaMapMarkerAlt
          size='25px'
          color='#c3c3c3'
        />
        <span className='ml-[10px] text-[16px]'>
          서울특별시 강서구 수명로 74 발산시티타워 3층, 루모스 스터디카페
          (르하임 강서 마곡점)
        </span>
      </div>
      <div className='h-[140px] w-custom'>
        <Map
          center={center}
          className='h-full w-full'
          level={3}
          style={{ borderRadius: '8px' }}
          draggable={false}
        >
          <MapMarker
            position={center}
            image={{
              src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
              size: {
                width: 24,
                height: 35,
              },
            }}
          />
        </Map>
      </div>
      <hr className='border-top my-[26px] border-dashed border-subfont' />
      <p className='whitespace-pre-wrap text-[16px]'>
        강서구 내발산동 수명산파크 중심상가에 위치해있으며, 김포공항, 마곡,
        마곡나루, 우장산, 화곡역 등에 가깝고 대로변에 위치하고 있어 접근성이
        매우 용이합니다. 관리자가 늦은 오후~새벽까지 상주하고 있어, 관리가 잘
        되고 안전하게 이용하실 수 있습니다. 스터디룸은 예약제로 운영중입니다..*
        간혹, 선예약이 있는 경우라도 조정을 통해, 최대한 이용하실 수 있는 방법을
        찾을 수 있으니 전화나 톡톡으로 문의주시기 바랍니다. * 스터디존(1인석)은
        총 60석으로 방문 선착순 이용가능합니다.
      </p>
    </div>
  );
};

export default DetailComponent;
