import { IoAdd } from 'react-icons/io5';
import ManagementPlaceCard from './ManagementPlaceCard';
import { useGetWorkplacesList } from '../hooks/useGetBusinessWorkplaces';

// export interface WorkPlace {
//   workPlaceId: number;
//   workplaceName: string;
//   workplaceAddress: string;
//   workPlacePhoneNumber: string;
//   createdAt: string;
//   numberOfRooms: number;
//   workplaceImage: string;
// }

// const workPlaceList: WorkPlace[] = [
//   {
//     workPlaceId: 1,
//     workplaceName: '스터디랩',
//     workplaceAddress: '경기 수원시 팔달구 권광로 274 2층',
//     workPlacePhoneNumber: '031-111-2222',
//     createdAt: '2024-06-07T13:02:34',
//     numberOfRooms: 10,
//     workplaceImage:
//       'https://modo-phinf.pstatic.net/20180304_61/1520159998510ED9Yt_JPEG/mosaSDaCsR.jpeg',
//   },
//   {
//     workPlaceId: 2,
//     workplaceName: 'ABC 스터디카페',
//     workplaceAddress: '경기 수원시 팔달구 권광로 274 2층',
//     workPlacePhoneNumber: '031-222-2222',
//     createdAt: '2024-06-08T13:02:34',
//     numberOfRooms: 17,
//     workplaceImage:
//       'https://modo-phinf.pstatic.net/20180304_61/1520159998510ED9Yt_JPEG/mosaSDaCsR.jpeg',
//   },
// ];

const ManagementPlaceList = () => {
  const workplaces = useGetWorkplacesList();

  const sortedWorkPlaceList = [...workplaces].sort((b, a) => {
    return +new Date(a.createdAt) - +new Date(b.createdAt);
  });

  return (
    <div className='mt-[6px] flex w-[375px] flex-col justify-center'>
      {workplaces.length > 0 &&
        sortedWorkPlaceList.map((item) => {
          return (
            <ManagementPlaceCard
              key={item.workplaceId}
              item={item}
            />
          );
        })}

      <button
        type='button'
        className='group mx-auto my-6 flex h-32 w-custom flex-col items-center justify-center rounded-[8px] border border-dashed p-2 active:border-primary'
      >
        <IoAdd className='text-6xl text-subfont group-active:text-primary' />
        <p className='text-sm text-subfont group-active:text-primary'>
          새로운 사업장 등록하기
        </p>
      </button>
    </div>
  );
};

export default ManagementPlaceList;
