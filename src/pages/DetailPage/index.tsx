import HeaderWithTitle from '@layouts/HeaderWithTitle';
import MainLayout from '@layouts/MainLayout';
import { useState } from 'react';
import DetailNavigation from './components/DetailNavigation';
import TabComponent from './components/TabComponent';

const DetailPage = () => {
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  return (
    <MainLayout headerType='both'>
      <HeaderWithTitle title='룸 이름' />
      <div className='pt-[14px]'>
        <img
          src='https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20231010_137%2F1696921495758atsIS_JPEG%2FKakaoTalk_20231007_203318440_01.jpg'
          alt='사업장 사진'
          className='h-[240px] w-[100%]'
        />
        <TabComponent setIsBtnDisabled={setIsBtnDisabled} />
      </div>
      <DetailNavigation isBtnDisabled={isBtnDisabled} />
    </MainLayout>
  );
};

export default DetailPage;
