import HeaderWithTitle from '@layouts/HeaderWithTitle';
import MainLayout from '@layouts/MainLayout';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailNavigation from './components/DetailNavigation';
import TabComponent from './components/TabComponent';
import useGetWorkplaceData from './hooks/useGetWorkplaceData';

const DetailPage = () => {
  const { workplaceId } = useParams() as { workplaceId: string };
  const { data, isLoading } = useGetWorkplaceData(Number(workplaceId));
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  if (isLoading) {
    return <p>로딩중</p>;
  }

  return (
    <MainLayout headerType='both'>
      <HeaderWithTitle title={data?.workplaceName || 'Unknown'} />
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
          />
        )}
      </div>
      <DetailNavigation
        workplaceId={data?.workplaceId}
        isBtnDisabled={isBtnDisabled}
      />
    </MainLayout>
  );
};

export default DetailPage;
