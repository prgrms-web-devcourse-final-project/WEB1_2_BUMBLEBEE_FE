import useGetBusinessData from '../hooks/useGetBusinessData';

const HostInfo = () => {
  const { data, isLoading, isError } = useGetBusinessData();

  // 마이페이지 진입 시 토큰 유무(로그인 상태) 확인할 것

  if (isLoading) {
    return <p>로딩중...</p>;
  }
  if (isError) {
    return <p>404</p>;
  }

  return (
    <div className='self-start pl-[33px] pt-[30px]'>
      <div className='text-[32px] font-bold leading-none text-white'>
        {data?.businessName || '닉네임을 불러올 수 없습니다.'}
      </div>
      <div className='pt-0 text-[14px] text-white'>
        {data?.businessEmail || '이메일을 불러올 수 없습니다.'}
      </div>
    </div>
  );
};

export default HostInfo;
