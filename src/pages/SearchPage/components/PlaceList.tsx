interface PlaceListProps {
  onShowList: (value: boolean) => void;
  showList: boolean;
  onSetSearchPlace: (value: string) => void;
}

const PlaceList = ({
  onShowList,
  showList,
  onSetSearchPlace,
}: PlaceListProps) => {
  const mapList = [
    '강남역',
    '서초역',
    '의정부역',
    '신사역',
    '신사역',
    '신사역',
  ];

  const handleClickPlace = (place: string) => {
    onSetSearchPlace(place);
    onShowList(!showList);
  };

  return (
    <>
      <div className='flex h-[160px] w-[330px] flex-col overflow-auto rounded-[10px] border border-subfont bg-white'>
        {mapList.map((map) => (
          <li
            key={map}
            className='flex h-[40px] list-none items-center border-b border-b-subfont px-[30px] py-3 text-sm last:border-none hover:bg-subfont'
            onClick={() => handleClickPlace(map)}
          >
            {map}
          </li>
        ))}
      </div>
    </>
  );
};

export default PlaceList;
