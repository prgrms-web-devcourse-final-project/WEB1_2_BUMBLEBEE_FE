interface ListProps {
  name: string;
  value: string | number;
}

const ListStyle = ({ name, value }: ListProps) => {
  return (
    <li className='flex gap-[12px]'>
      <p className='w-[46px]'>{name}</p>
      <span className='font-normal'>{value}</span>
    </li>
  );
};

export default ListStyle;
