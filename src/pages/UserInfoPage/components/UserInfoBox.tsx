import LabelWithInput from '@components/LabelWithInput';
import { Member } from '@typings/types';
import { getDateFunction } from '@utils/formatTime';

const UserInfoBox = ({ user }: { user: Member }) => {
  const { nickName, email, phoneNumber, birthDay, sex } = user;

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-col gap-3'>
        <p className='mr-[34px] text-[14px] font-normal'>성별</p>
        <div className='flex'>
          <div className='flex items-center'>
            <input
              type='radio'
              name='gender'
              value='MALE'
              className='mr-[6px]'
              checked={sex === 'MALE'}
              readOnly
            />
            <label
              htmlFor='MALE'
              className={`mr-[20px] ${sex === 'MALE' ? 'text-black' : 'text-subfont'}`}
            >
              남자
            </label>
          </div>
          <div className='flex items-center'>
            <input
              type='radio'
              name='gender'
              value='FEMALE'
              className='w-[14px mr-[6px] h-[14px]'
              checked={sex === 'FEMALE'}
              readOnly
            />
            <label
              htmlFor='FEMALE'
              className={`mr-[20px] ${sex === 'FEMALE' ? 'text-black' : 'text-subfont'}`}
            >
              여자
            </label>
          </div>
        </div>
      </div>
      <LabelWithInput
        label='닉네임'
        value={nickName}
      />
      <LabelWithInput
        label='이메일'
        value={email}
      />
      <LabelWithInput
        label='전화번호'
        value={phoneNumber}
      />
      <LabelWithInput
        label='생년월일'
        value={getDateFunction(birthDay)}
      />
    </div>
  );
};

export default UserInfoBox;
