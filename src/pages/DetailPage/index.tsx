import HeaderWithTitle from '@layouts/HeaderWithTitle';
import MainLayout from '@layouts/MainLayout';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailNavigation from './components/DetailNavigation';
import TabComponent from './components/TabComponent';
import useGetWorplaceData from './hooks/useGetWorkplaceData';

const DetailPage = () => {
  const { workplaceId } = useParams() as { workplaceId: string };
  const { data, isLoading } = useGetWorplaceData(Number(workplaceId));
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  if (!data) {
    return <p>데이터를 받아오는 데 실패했습니다.</p>;
  }

  return (
    <MainLayout headerType='both'>
      <HeaderWithTitle title={data?.workplaceName || 'Unknown'} />
      <div className='pt-[14px]'>
        <img
          src={data?.imageUrl}
          alt='사업장 사진'
          className='h-[240px] w-[100%]'
        />
        <TabComponent
          setIsBtnDisabled={setIsBtnDisabled}
          workplaceDetailData={data}
          workplaceId={Number(workplaceId)}
        />
      </div>
      <DetailNavigation isBtnDisabled={isBtnDisabled} />
    </MainLayout>
  );
};

export default DetailPage;
