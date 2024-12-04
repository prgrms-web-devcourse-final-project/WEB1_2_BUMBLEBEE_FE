import { ChangeEvent, FormEvent, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa6';
import usePostReview from '../hooks/usePostReview';

interface WriteReviewProps {
  reservationIdInfo: number;
  workPlaceNameInfo: string;
}

const WriteReview = ({
  reservationIdInfo,
  workPlaceNameInfo,
}: WriteReviewProps) => {
  const [postData, setPostData] = useState({
    reservationId: reservationIdInfo,
    workPlaceName: workPlaceNameInfo,
    reviewContent: '',
    reviewRating: 0,
  });

  const { mutate: writeReview } = usePostReview();

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

  // textarea 글자 수 세기
  const handleCntTextLength = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    let content = e.target.value;
    if (content.length > 100) {
      content = content.substring(0, 100);
    }

    setPostData((prev) => ({ ...prev, reviewContent: content }));
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(postData);
    writeReview(postData);
  };

  return (
    <div className='flex w-[375px] flex-col items-center pt-[32px]'>
      <p className='w-custom text-center text-base font-normal'>
        평점과 이용 후기를 작성해주세요.
      </p>
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
          작성하기
        </button>
      </form>
    </div>
  );
};

export default WriteReview;
