interface TimeProps {
  label: string;
}

const ShowWithinSevenDays = ({ label }: TimeProps) => {
  return (
    <div className='mx-auto flex w-custom items-center justify-between gap-4'>
      <hr className='h-[0.5px] w-[calc(100%-50px)] border-0 bg-focusColor' />
      <span className='w-[50px] text-xs text-focusColor'>{label}</span>
    </div>
  );
};

export default ShowWithinSevenDays;
