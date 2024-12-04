import useGetBusinessData from '../hooks/useGetBusinessData';

const HostInfo = () => {
  const { data } = useGetBusinessData();

  // 마이페이지 진입 시 토큰 유무(로그인 상태) 확인할 것

  return (
    <>
      {data && (
        <div className='flex flex-col gap-1 self-start pl-[24px] pt-[30px]'>
          <div className='text-[32px] font-bold leading-none text-white'>
            {data.businessName}
          </div>
          <div className='pt-0 text-[14px] text-white'>
            {data.businessEmail}
          </div>
        </div>
      )}
    </>
  );
};

export default HostInfo;
