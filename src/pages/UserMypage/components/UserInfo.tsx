const user = {
  name: 'HYUN',
  email: 'hyun@gmail.com',
};

const UserInfo = () => {
  return (
    <div className='self-start pl-[33px] pt-[30px]'>
      <div className='text-[32px] font-semibold leading-none text-white'>
        {user.name}
      </div>
      <div className='pt-0 text-[14px] text-white'>{user.email}</div>
    </div>
  );
};

export default UserInfo;
