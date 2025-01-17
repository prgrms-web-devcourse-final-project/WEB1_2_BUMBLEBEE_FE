import { ChangeEvent, FormEvent, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa6';
import { ReviewInfoProps } from '..';
import useEditReview from '../hooks/useEditReview';

const EditReview = ({ data }: { data: ReviewInfoProps }) => {
  const [postData, setPostData] = useState({
    reviewContent: data.reviewContent,
    reviewRating: data.reviewRating,
  });

  const { mutate: editReview } = useEditReview();

  // 별 표시
  const handleStarClick = () => {
    const result = [];
    for (let i: number = 0; i < 5; i += 1) {
      result.push(
        <span
          key={i + 1}
          onClick={() =>
            setPostData((prev) => ({ ...prev, reviewRating: i + 1 }))
          }
          role='button'
          tabIndex={0}
        >
          {i + 1 <= postData.reviewRating ? <FaStar /> : <FaRegStar />}
        </span>,
      );
    }

    return result;
  };

  // textarea 글자 수 세기 및 content 변경
  const handleCntTextLength = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    let newContent = e.target.value;
    if (newContent.length > 100) {
      newContent = newContent.substring(0, 100);
    }

    setPostData((prev) => ({ ...prev, reviewContent: newContent }));
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editReview({
      id: data.reviewId,
      placeName: data.workplaceName,
      newData: {
        reviewContent: postData.reviewContent,
        reviewRating: postData.reviewRating,
      },
    });
  };

  return (
    <div className='flex w-[375px] flex-col items-center pt-[32px]'>
      <div className='flex w-custom flex-col items-center justify-start gap-8 text-center'>
        <div className='flex w-custom justify-between'>
          <div className='flex flex-col items-start'>
            <p className='text-sm'>{`${data.workplaceName}`}</p>
            <p className='text-sm'>{`${data.studyRoomName}`}</p>
          </div>
          <img
            src={data.workplaceImageURL}
            alt='스터디룸 사진'
            className='h-[50px] w-[50px] object-cover'
          />
        </div>
        <hr className='mx-[22.5px] w-custom border-[0.5px] border-dashed' />
        <p className='font-normal'>평점과 이용 후기를 작성해주세요.</p>
      </div>
      <form onSubmit={submitHandler}>
        <div className='my-8 flex justify-center text-2xl text-primary'>
          {handleStarClick()}
        </div>
        <div className='relative h-[158px]'>
          <textarea
            className='main-textarea h-[100%] text-sm'
            placeholder='100자 이내로 이용 후기를 작성해주세요.'
            value={postData.reviewContent}
            onChange={handleCntTextLength}
            maxLength={100}
          />
          <span className='absolute bottom-4 right-3.5 text-sm text-subfont'>
            {postData.reviewContent.length}/100
          </span>
        </div>
        <button
          type='submit'
          className='btn-primary mt-5'
        >
          수정하기
        </button>
      </form>
    </div>
  );
};

export default EditReview;
