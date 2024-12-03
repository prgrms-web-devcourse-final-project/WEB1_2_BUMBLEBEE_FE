interface ListProps {
  name: string;
  value: string | number;
}

const ListStyle = ({ name, value }: ListProps) => {
  return (
    <li className='flex gap-[12px]'>
      <p className='w-[48px]'>{name}</p>
      <span className='w-auto break-keep font-normal'>{value}</span>
    </li>
  );
};

export default ListStyle;
