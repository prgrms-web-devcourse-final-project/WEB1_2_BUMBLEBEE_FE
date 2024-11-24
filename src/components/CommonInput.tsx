interface InputPros {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  value: string;
}

const CommonInput = ({ label, placeholder, disabled, value }: InputPros) => {
  return (
    <div className='mx-auto flex w-custom flex-col gap-1.5'>
      <p className='w-[100%] text-sm font-normal'>{label}</p>
      {disabled ? (
        <input
          className='h-[48px] w-[100%] border-b border-subfont bg-transparent outline-none'
          placeholder={placeholder}
          disabled
          value={value}
        />
      ) : (
        <input
          className='main-input w-[100%]'
          placeholder={placeholder}
          value={value}
        />
      )}
    </div>
  );
};

export default CommonInput;
