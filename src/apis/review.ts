import { authInstance, defaultInstance } from '.';

// 리뷰 작성, 수정
interface PostReviewRequestBody {
  workplaceId: number;
  reviewContent: string;
  reviewRating: number;
}

// 리뷰
interface Review {
  reviewId: number;
  workplaceId: number;
  workplaceName: string;
  reviewRating: string;
  reviewContent: string;
  reviewDate: Date;
}

// 상세페이지 리뷰 전체 목록 조회 - 비로그인
export const getAllReview = async (workplaceId: string): Promise<Review[]> => {
  const response = await defaultInstance.get(
    `/api/vi/review/workplace/${workplaceId}`,
  );
  return response.data;
};

// 내가 작성한 리뷰 조회 - 로그인
export const getMyReview = async (): Promise<Review[]> => {
  const response = await authInstance.get('/api/vi/review/me');
  return response.data;
};

// 리뷰 작성
export const postReview = async (
  data: PostReviewRequestBody,
): Promise<Review> => {
  const response = await authInstance.post('api/v1/review/register', data);
  return response.data;
};

// 리뷰 수정
export const putEditReview = async (
  reviewId: string,
  data: PostReviewRequestBody,
): Promise<Review> => {
  const response = await authInstance.put(
    `/api/v1/review/update/${reviewId}`,
    data,
  );
  return response.data;
};

// 리뷰 삭제
export const deleteReview = async (reviewId: string): Promise<void> => {
  const response = await authInstance.delete(`/api/vi/review/${reviewId}`);
  return response.data;
};
