import LabelWithInput from '@components/LabelWithInput';

const user = {
  name: 'HYUN',
  email: 'hyun@gmail.com',
  phone: '010-1111-2222',
};

const UserInfoBox = () => {
  return (
    <div className='flex flex-col gap-12'>
      <LabelWithInput
        label='닉네임'
        value={user.name}
      />
      <LabelWithInput
        label='전화번호'
        value={user.phone}
      />
      <LabelWithInput
        label='이메일'
        value={user.email}
      />
    </div>
  );
};

export default UserInfoBox;
