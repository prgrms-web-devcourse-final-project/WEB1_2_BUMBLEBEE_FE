import LabelWithInput from '@components/LabelWithInput';
import { Business } from '@typings/types';

const HostInfoBox = ({ business }: { business: Business }) => {
  return (
    <div className='flex flex-col gap-10'>
      <LabelWithInput
        label='닉네임'
        value={business.businessName}
      />
      <LabelWithInput
        label='이메일'
        value={business.businessEmail}
      />
      <LabelWithInput
        label='사업자 등록번호'
        value={business.businessNum}
      />
    </div>
  );
};

export default HostInfoBox;
