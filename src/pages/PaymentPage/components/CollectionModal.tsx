import { useEffect, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface CollectionModalProps {
  onClose: () => void;
}

const CollectionModal = (props: CollectionModalProps) => {
  const { onClose } = props;

  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleOutsideClose = (e: { target: unknown }) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClose);

    return () => document.removeEventListener('mousedown', handleOutsideClose);
  }, [onClose]);

  return (
    <div className='fixed left-[50%] top-0 z-[1500] flex h-[100%] w-[375px] translate-x-[-50%] items-center justify-center bg-[rgba(0,0,0,0.4)]'>
      <div
        ref={modalRef}
        className='flex h-auto min-h-[500px] w-[330px] flex-col gap-4 rounded-lg bg-[rgba(255,255,255,0.98)] px-8 py-10 text-center'
      >
        <button
          type='button'
          className='-mt-4 flex w-full justify-end'
          onClick={onClose}
        >
          <AiOutlineClose size={20} />
        </button>
        <p className='font-medium'>개인정보 수집/이용 동의</p>
        <p className='text-sm'>
          (주)룸잇(ROOM:IT)은 아래의 목적으로 개인정보를 수집 및 이용하며,
          회원의 개인정보를 안전하게 처리하는데 최선을 다하고 있습니다. 아래의
          내용을 확인 후 동의하여 주시기 바랍니다.
        </p>
        <table className='w-full table-auto border-collapse border border-focusColor text-left text-sm'>
          <thead className='bg-subfont text-xs'>
            <tr>
              <th className='border border-focusColor px-2 py-2 text-center align-middle'>
                수집 목적
              </th>
              <th className='border border-focusColor px-2 py-2 text-center align-middle'>
                필수 항목
              </th>
              <th className='border border-focusColor px-2 py-2 text-center align-middle'>
                보유 및 이용기간
              </th>
            </tr>
          </thead>
          <tbody className='text-xs'>
            <tr>
              <td className='border border-focusColor px-2 py-2'>
                사업자와 사용자의 거래의 원활한 진행
              </td>
              <td className='border border-focusColor px-2 py-2'>
                주문자 정보 (성함)
                <br />
                <br />
                휴대폰 정보 (전화번호)
                <br />
                <br />
                예약 및 결제 내역
              </td>
              <td className='border border-focusColor px-2 py-2'>
                탈퇴 요청 시 지체 없이 파기
                <br />
                <br />
                단, 관련 법령에 따른 보관 의무가 있는 경우에 그 기간동안 보관
              </td>
            </tr>
          </tbody>
        </table>
        <p className='text-sm'>
          필수적인 개인정보 수집 및 이용에 동의하지 않을 권리가 있습니다. 다만,
          동의하지 않을 경우 거래가 제한됩니다.
        </p>
      </div>
    </div>
  );
};

export default CollectionModal;
