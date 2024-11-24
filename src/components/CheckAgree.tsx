interface CheckAgreeProps {
  checkId: string;
  isCheck: boolean;
  description: string;
  onChangeChecked: (checked: boolean, id: string) => void;
  children?: React.ReactNode;
}

const CheckAgree = (props: CheckAgreeProps) => {
  const { checkId, isCheck, description, onChangeChecked, children } = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeChecked(e.target.checked, checkId);
  };

  return (
    <div className='flex gap-1'>
      <input
        type='checkbox'
        id={checkId}
        name={checkId}
        checked={isCheck}
        onChange={handleChange}
        className='h-4 w-4'
      />
      <div className='flex w-full items-center justify-between'>
        <label htmlFor={checkId}>
          <span className='font-normal'>[필수]</span> {description}
        </label>
        {children}
      </div>
    </div>
  );
};

export default CheckAgree;
