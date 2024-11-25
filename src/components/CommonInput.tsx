interface InputProps {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChangeFunction?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CommonInput = ({
  label,
  placeholder,
  defaultValue,
  value,
  onChangeFunction,
}: InputProps) => {
  return (
    <div className='mx-auto flex w-custom flex-col gap-1.5'>
      <p className='w-[100%] text-sm font-normal'>{label}</p>
      <input
        className='main-input'
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChangeFunction}
      />
    </div>
  );
};

export default CommonInput;
