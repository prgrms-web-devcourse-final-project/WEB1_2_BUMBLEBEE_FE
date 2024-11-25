import CommonInput from '@components/CommonInput';
import { useState } from 'react';

const user = {
  name: 'HYUN',
  email: 'hyun@gmail.com',
  phone: '010-1111-2222',
  birth: '2002.12.22',
};

const UserEditInputBox = () => {
  const [nickname, setNickname] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [birth, setBirth] = useState(user.birth);

  return (
    <div className='flex flex-col gap-6'>
      <CommonInput
        label='닉네임'
        defaultValue={nickname}
        onChangeFunction={() => setNickname(nickname)}
      />
      <CommonInput
        label='이메일'
        defaultValue={email}
        onChangeFunction={() => setEmail(email)}
      />
      <CommonInput
        label='생년월일'
        defaultValue={birth}
        onChangeFunction={() => setBirth(birth)}
      />
    </div>
  );
};

export default UserEditInputBox;
