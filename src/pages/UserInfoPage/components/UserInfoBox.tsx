import LabelWithInput from '@components/LabelWithInput';

const user = {
  name: 'HYUN',
  email: 'hyun@gmail.com',
  phone: '010-1111-2222',
  birth: '2002.12.22',
};

const UserInfoBox = () => {
  return (
    <div className='flex flex-col gap-10'>
      <LabelWithInput
        label='닉네임'
        value={user.name}
      />
      <LabelWithInput
        label='이메일'
        value={user.email}
      />
      <LabelWithInput
        label='생년월일'
        value={user.birth}
      />
      <LabelWithInput
        label='전화번호'
        value={user.phone}
      />
    </div>
  );
};

export default UserInfoBox;
