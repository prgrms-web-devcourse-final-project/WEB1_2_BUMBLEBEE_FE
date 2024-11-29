import useGetUserData from '../hooks/useGetUserData';

const UserInfo = () => {
  const { data } = useGetUserData();
  // const navigate = useNavigate();

  // 마이페이지 진입 시 토큰 유무(로그인 상태) 확인할 것

  return (
    <div className='flex flex-col gap-1 self-start pl-[33px] pt-[30px]'>
      <div className='text-[32px] font-semibold leading-none text-white'>
        {data?.nickName || (
          <p className='text-2xl'>닉네임을 불러올 수 없습니다.</p>
        )}
      </div>
      <div className='pt-0 text-[14px] text-white'>
        {data?.email || <p>이메일을 불러올 수 없습니다.</p>}
      </div>
    </div>
  );
};

export default UserInfo;
