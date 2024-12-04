interface DeleteAccountProp {
  onClickButton: () => void;
}

const DeleteAccountButton = ({ onClickButton }: DeleteAccountProp) => {
  return (
    <button
      type='button'
      className='h-[23px] w-[100%] text-[12px] text-subfont underline active:text-black'
      onClick={onClickButton}
    >
      탈퇴하시겠습니까?
    </button>
  );
};

export default DeleteAccountButton;
