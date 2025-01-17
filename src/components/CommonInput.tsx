interface InputProps {
  label: string;
  placeholder?: string;
  defaultValue?: string | number;
  value?: string;
  onChangeFunction?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  name?: string;
}

const CommonInput = ({
  label,
  placeholder,
  defaultValue,
  value,
  onChangeFunction,
  maxLength,
  name,
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
        maxLength={maxLength}
        name={name}
      />
    </div>
  );
};

export default CommonInput;
