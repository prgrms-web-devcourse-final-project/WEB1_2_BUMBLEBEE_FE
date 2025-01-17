import { GetWorkPlaceData } from '@typings/types';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { IoTime } from 'react-icons/io5';
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
  return (
    <div className='w-custom'>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center'>
          <FaPhoneAlt
            color='#c3c3c3'
            className='ml-[2.5px] size-4'
          />
          <span className='ml-[12px] text-[16px]'>
            {workplaceDetailData.workplacePhoneNumber}
          </span>
        </div>
        <div className='flex items-center'>
          <IoTime
            color='#c3c3c3'
            className='size-5'
          />
          <span className='ml-[10px] text-[16px]'>
            {workplaceDetailData.workplaceStartTime} ~{' '}
            {workplaceDetailData.workplaceEndTime}
          </span>
        </div>
        <div className='flex items-center'>
          <FaMapMarkerAlt
            color='#c3c3c3'
            className='size-5'
          />
          <span className='ml-[10px] text-[16px]'>
            {workplaceDetailData.workplaceAddress}
          </span>
        </div>
      </div>

      <div className='mt-3 h-[140px] w-custom'>
        <Map
          center={center}
          className='h-full w-full rounded-lg'
          level={3}
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
