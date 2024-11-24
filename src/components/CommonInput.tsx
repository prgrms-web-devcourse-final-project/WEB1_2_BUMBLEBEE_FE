interface InfoProps {
  label: string;
  placeholder?: string;
  defaultValue?: string;
}

const CommonInput = ({ label, placeholder, defaultValue }: InfoProps) => {
  return (
    <div className='mx-auto flex w-custom flex-col gap-1.5'>
      <p className='w-[100%] text-sm font-normal'>{label}</p>
      <input
        className='main-input'
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default CommonInput;
