import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetUserData from '../hooks/useGetUserData';

const UserInfo = () => {
  const { data, isLoading, isError } = useGetUserData();
  const navigate = useNavigate();

  // 렌더링 이후 데이터가 없고, 로딩중이 아니면 로그인 페이지로 이동
  useEffect(() => {
    if (!data && !isLoading) {
      navigate('/login/user');
    }
  });

  if (isLoading) {
    return <p>로딩중...</p>;
  }
  if (isError) {
    return <p>404</p>;
  }

  return (
    <div className='self-start pl-[33px] pt-[30px]'>
      <div className='text-[32px] font-semibold leading-none text-white'>
        {data?.nickName || '닉네임을 불러올 수 없습니다.'}
      </div>
      <div className='pt-0 text-[14px] text-white'>
        {data?.email || '이메일을 불러올 수 없습니다.'}
      </div>
    </div>
  );
};

export default UserInfo;
