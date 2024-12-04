import useGetUserData from '../hooks/useGetUserData';

const UserInfo = () => {
  const { user } = useGetUserData();
  // const navigate = useNavigate();

  // 마이페이지 진입 시 토큰 유무(로그인 상태) 확인할 것

  return (
    <>
      {user && (
        <div className='flex flex-col gap-1 self-start pl-[24px] pt-[30px]'>
          <div className='text-[32px] font-semibold leading-none text-white'>
            {user.nickName}
          </div>
          <div className='pt-0 text-[14px] text-white'>{user.email}</div>
        </div>
      )}
    </>
  );
};

export default UserInfo;
