import { useEffect, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface OfferModalProps {
  onClose: () => void;
  workplaceName: string;
}

const OfferModal = (props: OfferModalProps) => {
  const { onClose, workplaceName } = props;

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
        <p className='font-medium'>개인정보 제3자 제공 동의</p>
        <p className='text-sm'>
          (주)룸잇(ROOM:IT)은 사업자 회원과 예약 이용자의 원활한 거래 진행을
          위해 판매자에게 아래와 같이 개인정보를 제공하고 있습니다. 아래의
          내용을 확인 후 동의하여 주시기 바랍니다.
        </p>
        <table className='w-full table-auto border-collapse border border-focusColor text-left text-sm'>
          <tbody>
            <tr>
              <th className='w-1/3 border border-focusColor bg-subfont px-2 py-2 text-center align-middle'>
                제공받는 자
              </th>
              <td className='border border-focusColor px-2 py-2'>
                {workplaceName}
              </td>
            </tr>
            <tr>
              <th className='border border-focusColor bg-subfont px-2 py-2 text-center align-middle'>
                제공 목적
              </th>
              <td className='border border-focusColor px-2 py-2'>
                예약 서비스 제공, 서비스 분석과 통계에 따른 맞춤 서비스 제공,
                고객 상담 및 관리
              </td>
            </tr>
            <tr>
              <th className='border border-focusColor bg-subfont px-2 py-2 text-center align-middle'>
                제공 항목
              </th>
              <td className='border border-focusColor px-2 py-2'>
                성명, 휴대폰 번호
              </td>
            </tr>
            <tr>
              <th className='border border-focusColor bg-subfont px-2 py-2 text-center align-middle'>
                보유 및 이용기간
              </th>
              <td className='border border-focusColor px-2 py-2'>
                탈퇴 시 또는 위 개인 정보 이용목적 달성 시까지 이용
                <br />
                <br />
                단, 관련 법령에 따른 보관의무가 있는 경우에 그 기간동안 보관
              </td>
            </tr>
          </tbody>
        </table>
        <p className='text-sm'>
          필수적인 개인정보 제3자 제공에 동의하지 않을 권리가 있습니다. 다만,
          동의하지 않을 경우 거래가 제한됩니다.
        </p>
      </div>
    </div>
  );
};

export default OfferModal;
