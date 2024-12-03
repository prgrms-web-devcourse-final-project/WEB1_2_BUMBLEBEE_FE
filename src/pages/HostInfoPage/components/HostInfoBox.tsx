import LabelWithInput from '@components/LabelWithInput';

const host = {
  name: 'HOST',
  email: 'host@gmail.com',
  businessNumber: '000-00-0000',
};

const HostInfoBox = () => {
  return (
    <div className='flex flex-col gap-10'>
      <LabelWithInput
        label='닉네임'
        value={host.name}
      />
      <LabelWithInput
        label='이메일'
        value={host.email}
      />
      <LabelWithInput
        label='사업자 등록번호'
        value={host.businessNumber}
      />
    </div>
  );
};

export default HostInfoBox;
