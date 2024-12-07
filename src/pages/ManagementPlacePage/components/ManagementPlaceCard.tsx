import { MdArrowForwardIos } from 'react-icons/md';
import { getDateFunction } from '@utils/formatTime';
import ButtonInCard from '@components/ButtonInCard';
import ListStyle from '@components/ListStyle';
import { GetWorkPlaceData } from '@typings/types';
import { useState } from 'react';
import Modal from '@components/Modal';
import { Link, useNavigate } from 'react-router-dom';
import useDeleteBusinessPlace from '../hooks/useDeleteBusinessPlace';
import { useGetNumberOfRooms } from '../hooks/useGetBusinessWorkplaces';

interface ManagementPlaceCardProps {
  item: GetWorkPlaceData;
}

const ManagementPlaceCard = ({ item }: ManagementPlaceCardProps) => {
  const {
    workplaceId,
    workplaceName,
    workplaceAddress,
    workplacePhoneNumber,
    createdAt,
    imageUrl,
  } = item;

  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const numberOfRooms = useGetNumberOfRooms(workplaceId);
  const { mutate: deleteMutation } = useDeleteBusinessPlace();

  // 사업장 삭제
  const handleDeleteBusinessWorkplace = () => {
    deleteMutation({
      workPlaceId: workplaceId,
      fileLocation: `workplace-${workplaceId}`,
    });
    setModalOpen(() => false);
  };

  // 사업장 수정 페이지로 이동
  const handleMoveWorkplaceEditPage = (pageId: number) => {
    navigate(`/modify-Space/${pageId}`);
  };

  return (
    <>
      <div className='mx-auto flex w-custom flex-col gap-4 border-b border-solid border-b-black px-[13px] py-[26px]'>
        <div className='flex justify-between'>
          <div className='flex flex-col items-start gap-2'>
            <Link to={`/detail/${workplaceId}`}>
              <div className='flex cursor-pointer items-center gap-1.5 font-medium'>
                {workplaceName}
                <MdArrowForwardIos className='w-3' />
              </div>
            </Link>

            <ul className='flex flex-col gap-1 text-[12px]'>
              <ListStyle
                name='주소'
                value={workplaceAddress}
              />
              <ListStyle
                name='전화번호'
                value={workplacePhoneNumber}
              />
              <ListStyle
                name='룸 수'
                value={numberOfRooms}
              />
              <ListStyle
                name='등록일'
                value={getDateFunction(createdAt)}
              />
            </ul>
          </div>
          <img
            src={imageUrl}
            alt='스터디룸 사진'
            className='ml-3 h-[50px] w-[50px] object-cover'
          />
        </div>

        <div className='self-end'>
          <div className='flex gap-1'>
            <ButtonInCard
              name='삭제'
              onClickFunction={() => setModalOpen(true)}
            />
            <ButtonInCard
              name='수정'
              onClickFunction={() => handleMoveWorkplaceEditPage(workplaceId)}
            />
          </div>
        </div>
      </div>

      {modalOpen && (
        <Modal
          message='사업장을 삭제하시겠습니까?'
          onCancelButtonClick={() => setModalOpen(false)}
          onConfirmButtonClick={handleDeleteBusinessWorkplace}
        />
      )}
    </>
  );
};

export default ManagementPlaceCard;
