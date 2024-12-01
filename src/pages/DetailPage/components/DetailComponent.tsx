import { GetWorkPlaceData } from '@typings/types';
import { BsTelephoneFill } from 'react-icons/bs';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const DetailComponent = ({
  workplaceDetailData,
}: {
  workplaceDetailData: GetWorkPlaceData;
}) => {
  const center = {
    lat: Number(workplaceDetailData.latitude),
    lng: Number(workplaceDetailData.longitude),
  };
  console.log(workplaceDetailData, center);

  return (
    <div className='w-custom'>
      <div className='flex items-center'>
        <BsTelephoneFill
          size='16px'
          color='#c3c3c3'
        />
        <span className='ml-[10px] text-[16px]'>
          {workplaceDetailData.workplacePhoneNumber}
        </span>
      </div>
      <div className='mb-[16px] mt-[16px] flex'>
        <FaMapMarkerAlt
          size='25px'
          color='#c3c3c3'
        />
        <span className='ml-[10px] text-[16px]'>
          {workplaceDetailData.workplaceAddress}
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
        {workplaceDetailData.workplaceDescription}
      </p>
    </div>
  );
};

export default DetailComponent;
