import CommonInput from '@components/CommonInput';
import { useState } from 'react';

const user = {
  name: 'HYUN',
  email: 'hyun@gmail.com',
  phone: '010-1111-2222',
};

const InputContainer = () => {
  const [disabled, setDisabled] = useState(true);

  return (
    <div className='flex flex-col gap-10'>
      <CommonInput
        label='닉네임'
        disabled={disabled}
        value={user.name}
      />
      <CommonInput
        label='전화번호'
        disabled={disabled}
        value={user.phone}
      />
      <CommonInput
        label='이메일'
        disabled={disabled}
        value={user.email}
      />
    </div>
  );
};

export default InputContainer;
