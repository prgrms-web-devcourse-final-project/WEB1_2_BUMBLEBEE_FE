interface LabelAndInputProps {
  label: string;
  value: string;
}

const LabelWithInput = ({ label, value }: LabelAndInputProps) => {
  return (
    <div className='mx-auto flex w-custom flex-col gap-2.5'>
      <p className='w-[100%] text-sm font-normal'>{label}</p>
      <p className='h-[36px] w-custom border-b border-subfont py-2 leading-[20px]'>
        {value}
      </p>
    </div>
  );
};

export default LabelWithInput;
