interface DetailTitleProps {
  title: string;
  children?: React.ReactNode;
}

const DetailTitle = ({ title, children }: DetailTitleProps) => {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <p>{title}</p>
        {children}
      </div>
      <hr className='mt-2 w-custom border border-black' />
    </div>
  );
};

export default DetailTitle;
