interface ModalProps {
  message: string;
  cancelPaymentMessage?: string;
  onCancelButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  onConfirmButtonClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Modal = ({
  message,
  onCancelButtonClick,
  onConfirmButtonClick,
  cancelPaymentMessage,
}: ModalProps) => {
  return (
    <div className='fixed left-[50%] top-0 z-[1500] flex h-[100%] w-[375px] translate-x-[-50%] items-center justify-center bg-[rgba(0,0,0,0.4)]'>
      <div className='flex h-auto min-h-[140px] w-[280px] flex-col rounded-lg bg-[rgba(255,255,255,0.98)] text-center'>
        <div className='flex h-auto min-h-[calc(100%-44px)] flex-grow flex-col items-center justify-center whitespace-pre-line px-5 py-4'>
          {cancelPaymentMessage && (
            <span className='text-primary'>{cancelPaymentMessage}</span>
          )}
          {message}
        </div>
        <div className='flex h-[44px] w-[100%] border-t-[0.5px] border-subfont'>
          <button
            type='button'
            className='w-[50%] border-r-[0.5px] border-subfont'
            onClick={onCancelButtonClick}
          >
            취소
          </button>
          <button
            type='button'
            onClick={onConfirmButtonClick}
            className='w-[50%] active:text-primary'
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
