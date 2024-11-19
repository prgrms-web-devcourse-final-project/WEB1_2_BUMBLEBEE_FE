const host = {
  name: 'HOST',
  email: 'host@gmail.com',
};

const HostInfo = () => {
  return (
    <div className='self-start pl-[33px] pt-[30px]'>
      <div className='text-[32px] font-bold leading-none text-white'>
        {host.name}
      </div>
      <div className='pt-0 text-[14px] text-white'>{host.email}</div>
    </div>
  );
};

export default HostInfo;
