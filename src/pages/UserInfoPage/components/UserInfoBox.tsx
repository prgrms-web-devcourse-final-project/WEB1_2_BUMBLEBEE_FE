import LabelWithInput from '@components/LabelWithInput';
import useGetUserData from '@pages/UserMypage/hooks/useGetUserData';
import { getDateFunction } from '@utils/formatTime';

const UserInfoBox = () => {
  const { user } = useGetUserData();

  return (
    <div className='flex flex-col gap-10'>
      <LabelWithInput
        label='닉네임'
        value={user.nickName}
      />
      <LabelWithInput
        label='이메일'
        value={user.email}
      />
      <LabelWithInput
        label='전화번호'
        value={user.phoneNumber}
      />
      <LabelWithInput
        label='생년월일'
        value={getDateFunction(user.birthDay)}
      />
    </div>
  );
};

export default UserInfoBox;
