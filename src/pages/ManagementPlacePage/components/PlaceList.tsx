import PlaceCard from './PlaceCard';

export interface WorkPlace {
  workPlaceId: number;
  workplaceName: string;
  workplaceAddress: string;
  workPlacePhoneNumber: string;
  createdAt: string;
  numberOfRooms: number;
  workplaceImage: string;
}

const workPlaceList: WorkPlace[] = [
  {
    workPlaceId: 1,
    workplaceName: '스터디랩',
    workplaceAddress: '경기 수원시 팔달구 권광로 274 2층',
    workPlacePhoneNumber: '031-111-2222',
    createdAt: '2024-06-07T13:02:34',
    numberOfRooms: 10,
    workplaceImage:
      'https://modo-phinf.pstatic.net/20180304_61/1520159998510ED9Yt_JPEG/mosaSDaCsR.jpeg',
  },
  {
    workPlaceId: 2,
    workplaceName: 'ABC 스터디카페',
    workplaceAddress: '경기 수원시 팔달구 권광로 274 2층',
    workPlacePhoneNumber: '031-222-2222',
    createdAt: '2024-06-08T13:02:34',
    numberOfRooms: 17,
    workplaceImage:
      'https://modo-phinf.pstatic.net/20180304_61/1520159998510ED9Yt_JPEG/mosaSDaCsR.jpeg',
  },
];

const PlaceList = () => {
  const sortedWorkPlaceList = [...workPlaceList].sort((b, a) => {
    return +new Date(a.createdAt) - +new Date(b.createdAt);
  });

  return (
    <>
      {workPlaceList.length > 0 ? (
        <div className='mt-[6px] flex w-[375px] flex-col justify-center'>
          {sortedWorkPlaceList.map((item) => {
            return (
              <PlaceCard
                key={item.workPlaceId}
                item={item}
              />
            );
          })}
        </div>
      ) : (
        <div className='mt-[47px] w-[375px] text-center text-[14px] font-normal text-subfont'>
          작성한 리뷰가 없습니다.
        </div>
      )}
    </>
  );
};

export default PlaceList;
