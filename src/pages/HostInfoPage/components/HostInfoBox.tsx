import LabelWithInput from '@components/LabelWithInput';

const host = {
  name: 'HOST',
  email: 'host@gmail.com',
  businessNumber: '000-00-0000',
};

const HostInfoBox = () => {
  return (
    <div className='flex flex-col gap-12'>
      <LabelWithInput
        label='닉네임'
        value={host.name}
      />
      <LabelWithInput
        label='사업자 등록번호'
        value={host.businessNumber}
      />
      <LabelWithInput
        label='이메일'
        value={host.email}
      />
    </div>
  );
};

export default HostInfoBox;
