import HeaderWithTitle from '@layouts/HeaderWithTitle';
import MainLayout from '@layouts/MainLayout';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import DetailNavigation from './components/DetailNavigation';
import TabComponent from './components/TabComponent';
import useGetWorkplaceData from './hooks/useGetWorkplaceData';

const DetailPage = () => {
  const { workplaceId } = useParams() as { workplaceId: string };
  const { data, isLoading } = useGetWorkplaceData(Number(workplaceId));
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [selectedRoomId, setSelectedRoomId] = useState<number>(0);

  return (
    <MainLayout headerType='both'>
      <HeaderWithTitle title={data?.workplaceName || 'Unknown'} />
      {isLoading ? (
        <div className='flex h-[calc(100vh-132px-94px)] w-full items-center justify-center'>
          <SyncLoader color='#50BEAD' />
        </div>
      ) : (
        <div className='pt-[10px]'>
          <img
            src={data?.imageUrl}
            alt='사업장 사진'
            className='h-[240px] w-[100%] object-cover'
          />
          {data && (
            <TabComponent
              setIsBtnDisabled={setIsBtnDisabled}
              workplaceDetailData={data}
              workplaceId={Number(workplaceId)}
              selectedRoomId={selectedRoomId}
              setSelectedRoomId={setSelectedRoomId}
            />
          )}
        </div>
      )}
      <DetailNavigation
        workplaceId={data?.workplaceId || 0}
        isBtnDisabled={isBtnDisabled}
        selectedRoomId={selectedRoomId}
      />
    </MainLayout>
  );
};

export default DetailPage;
