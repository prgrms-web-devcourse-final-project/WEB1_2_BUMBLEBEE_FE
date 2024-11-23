interface ModalProps {
  message: string;
  cancelButton: React.MouseEventHandler<HTMLButtonElement>;
  confirmButton: React.MouseEventHandler<HTMLButtonElement>;
}

const Modal = ({ message, cancelButton, confirmButton }: ModalProps) => {
  return (
    <div className='fixed left-0 top-0 z-[1100] flex h-[100%] w-[100%] items-center justify-center bg-[rgba(0,0,0,0.4)]'>
      <div className='flex h-[140px] w-[280px] flex-col rounded-lg bg-[rgba(255,255,255,0.98)]'>
        <div className='flex h-[calc(100%-44px)] items-center justify-center'>
          {message}
        </div>
        <div className='flex h-[44px] border-t-[0.5px] border-subfont'>
          <button
            type='button'
            className='w-[50%] border-r-[0.5px] border-subfont'
            onClick={cancelButton}
          >
            취소
          </button>
          <button
            type='button'
            onClick={confirmButton}
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
